import React, { useState, useEffect, useMemo } from 'react'
import { Table, Popconfirm, Row, Col } from 'antd';
import { inject, observer } from 'mobx-react'
import { DownOutlined } from '@ant-design/icons';
import { withTranslation } from '../../i18n'
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { TcrbSpin } from '../antd-styles/styles'
import SimpleModal from '../simple-modal'
import styled from 'styled-components'
import moment from 'moment'
import { addKeyToDataSource } from '../data-utility'
const HoverIcon = styled(Col)`
    color: green;
    cursor: pointer !important;
`
const HoverIconReject = styled(Col)`
    color: red;
    cursor: pointer !important;
`
const PendingApprovals =
  inject('pendingApprovalStore')
    (observer((props) => {
      const [expandable, setExpandable] = useState(expand)
      const [hasData, setHasData] = useState(true)
      const [top, setTop] = useState('none')
      const [bottom, setBottom] = useState("bottomRight")
      const [pendingApprovalData, setPendingApprovalData] = useState([])
      const [title, settitle] = useState("Action details")
      const [textOk, settextOk] = useState("Ok")
      const [textCancel, settextCancel] = useState("Cancel")
      const [modalString, setmodalString] = useState("initialState")
      const [visible, setvisible] = useState(false)
      const { pendingApprovalStore, t } = props
      const expand = { expandedRowRender: record => <p>{record.description}</p> };
      const columns = [
        {
          title: 'Ticket#',
          dataIndex: 'id',
        },
        {
          title: 'Request Type',
          dataIndex: 'change_type',
        },
        {
          title: 'Request Description',
          key: 'description',
          render: (record) => {
            let data = JSON.parse(JSON.stringify(record))
            let string = JSON.parse(data.data)
            setmodalString(`Action : ${string.ChangedType} \n\n Old Value : ${string.Current.OTP_MAXIMUM_ENTERED ? string.Current.OTP_MAXIMUM_ENTERED : string.Current.OTP_EXPIRE_TIME} \n\n New Vlaue : ${string.New.OTP_MAXIMUM_ENTERED ? string.New.OTP_MAXIMUM_ENTERED : string.Current.OTP_EXPIRE_TIME}`)
            return <Row>
              <span>
                {data.description ? `${data.description} ` : `${data.action}`}
              </span>
              <div onClick={() => setvisible(true)}><span><a> : details</a></span></div>
            </Row>
          }
        },
        {
          title: 'Request ID',
          dataIndex: 'maker_id',
        },
        {
          title: 'Request Date',
          // dataIndex: 'requested_date',
          key: 'requested_date',
          render: (record) => {
            let data = JSON.parse(JSON.stringify(record))
            let date = moment(data.requested_date).format('LLL')
            return <span>
              {date}
            </span>
          }
        },
        {
          title: 'Action',
          key: 'action',
          render: (record) => (
            <Row gutter={16}>
              <HoverIcon onClick={() => processPending("APPROVE", record)} className="gutter-row" span={6}>
                <CheckCircleOutlined height={"1.5em"} width={"1.5em"} />
              </HoverIcon>
              <HoverIconReject onClick={() => processPending("REJECT", record)} className="gutter-row" span={6}>
                <CloseCircleOutlined height={"1.5em"} width={"1.5em"} />
              </HoverIconReject>
            </Row>
          ),
        },
      ];

      useEffect(() => {
        // call api
        const data = {
          filter: {}
        }
        pendingApprovalStore.getPendingApprove(data)
      }, [])

      useEffect(() => {
        if (pendingApprovalStore.responseGetPendingApproveList && pendingApprovalStore.responseGetPendingApproveList.length > 0) {
          addKeyToDataSource(pendingApprovalStore.responseGetPendingApproveList).then((result) => {
            //businessParametersSetupStore.arrayProductLimit = result
            setPendingApprovalData(result)
          })
        }
      }, [pendingApprovalStore.responseGetPendingApproveList])

      const processPending = (status, record) => {
        let data = {
          allowAction: status,
          data: record,
          id: record.id
        }
        pendingApprovalStore.setTmpPendingListID(record.id)
        pendingApprovalStore.processPendingListApprove(data)
      }

      const _onConfirm = () => {
        setvisible(false)
      }
      const _onCancel = () => {
        setvisible(false)
      }

      const tableColumns = columns.map(item => ({ ...item }));

      return (
        <TcrbSpin spinning={pendingApprovalStore.apiLoading} size="large" tip="Loading..." >
          <Row >
            <Col span={24}>
              <Table
                pagination={{ position: [top, bottom] }}
                columns={tableColumns}
                dataSource={pendingApprovalData}
              // scroll={scroll}
              />
              <SimpleModal
                title={title}
                // type={modalType}
                onOk={() => _onConfirm()}
                onCancel={() => _onCancel()}
                textCancel={textCancel}
                textOk={textOk}
                modalString={modalString}
                visible={visible}
              />
            </Col>
          </Row>
        </TcrbSpin>
      )
    }))

export default withTranslation('common')(PendingApprovals)

