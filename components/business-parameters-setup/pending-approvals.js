import React, { useState, useEffect, useMemo } from 'react'
import { Table, Popconfirm } from 'antd';
import { inject, observer } from 'mobx-react'
import { DownOutlined } from '@ant-design/icons';
import { withTranslation } from '../../i18n'

const PendingApprovals =
  inject('businessParametersSetupStore')
    (observer((props) => {
      const [expandable, setExpandable] = useState(expand)
      const [hasData, setHasData] = useState(true)
      const [top, setTop] = useState('none')
      const [bottom, setBottom] = useState("bottomRight")
      const [pendingApprovalData, setPendingApprovalData] = useState([])
      const { businessParametersSetupStore, t } = props
      const expand = { expandedRowRender: record => <p>{record.description}</p> };
      const columns = [
        {
          title: 'Ticket#',
          dataIndex: 'action',
        },
        {
          title: 'Request Type',
          dataIndex: 'change_type',
        },
        {
          title: 'Request Description',
          dataIndex: 'description',
        },
        {
          title: 'Request ID',
          dataIndex: 'maker_id',
        },
        {
          title: 'Request Date',
          dataIndex: 'requested_date',
        },
        {
          title: 'Action',
          key: 'action',
          render: (record) => (
            <span>
              <Popconfirm title={t("sureAccept")}
                onConfirm={() => processPending("APPROVE", record)}  >
                <a style={{ marginRight: 16 }}>Accept</a>
              </Popconfirm>

              <Popconfirm title={t("sureReject")}
                onConfirm={() => processPending("REJECT", record)}>
                <a style={{ marginRight: 16 }}>Reject</a>
              </Popconfirm>
            </span>
          ),
        },
      ];

      useEffect(() => {
        // call api
        const data = {
          filter: {}
        }
        businessParametersSetupStore.getPendingApprove(data)
      }, [])

      useEffect(() => {
        if (businessParametersSetupStore.pendingApprovals.length > 0) {
          setPendingApprovalData(businessParametersSetupStore.pendingApprovals)
        }
      }, [businessParametersSetupStore.pendingApprovals])

      useMemo(() => {
        // setPendingApprovalData(businessParametersSetupStore.pendingApprovals)
        console.log('render')
      }, [])

      const processPending = (status, record) => {
        let data = {
          allowAction: status,
          data: record,
          id: record.id
        }
        businessParametersSetupStore.setTmpPendingListID(record.id)
        businessParametersSetupStore.processPendingListApprove(data)
      }

      const tableColumns = columns.map(item => ({ ...item }));

      return (
        <Table
          pagination={{ position: [top, bottom] }}
          columns={tableColumns}
          dataSource={businessParametersSetupStore.responseGetPendingApproveList}
        // dataSource={pendingApprovalData}
        // scroll={scroll}
        />
      )
    }))

export default withTranslation('common')(PendingApprovals)

