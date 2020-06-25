import React, { useState, useEffect, useMemo } from 'react'
import { Table, Popconfirm } from 'antd';
import { inject, observer } from 'mobx-react'
import { DownOutlined } from '@ant-design/icons';
import { withTranslation } from '../../i18n'
import { toJS } from 'mobx';



const PendingApprovals =
  inject('businessParametersSetupStore')
    (observer((props) => {


      const data = [{
        id: 1, key: 1, ticket: "PAR0000001", requestType: "OTP Max Retrying", requestDescription: "Change from 3 to 5", requestId: "T630213",
        requestDate: "21-May-2020", action: null
      }];

      const expand = { expandedRowRender: record => <p>{record.description}</p> };
      const titleTable = () => 'Here is title';
      const showHead = true;
      const foot = () => 'Here is footer';
      const page = { position: 'bottom' };
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
              <Popconfirm title="Sure to Accept?"
                onConfirm={() => {
                  let data = {
                    allowActions: "APPROVE",
                    data: record,
                    id: record.id
                  }
                  businessParametersSetupStore.processPendingListApprove(data)
                  console.log("Record Accept: ", toJS(record))
                }}
              >
                <a style={{ marginRight: 16 }}>Accept</a>
              </Popconfirm>

              <Popconfirm title="Sure to Reject?"
                onConfirm={() => {
                  let data = {
                    allowActions: "REJECT",
                    data: record,
                    id: record.id
                  }
                  businessParametersSetupStore.processPendingListApprove(data)
                  console.log("Record Reject: ", toJS(record))
                }}
              >
                <a style={{ marginRight: 16 }}>Reject</a>
              </Popconfirm>
            </span>
          ),
        },
      ];



      const [expandable, setExpandable] = useState(expand)
      const [hasData, setHasData] = useState(true)
      const [top, setTop] = useState('none')
      const [bottom, setBottom] = useState("bottomRight")
      const [pendingApprovalData, setPendingApprovalData] = useState([])
      const { businessParametersSetupStore } = props
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
      const handleTableLayoutChange = e => {
        setTableLayout(e.target.value)
      };

      const handleExpandChange = enable => {
        setExpandable(enable ? expandable : undefined)
      };

      const handleDataChange = hasData => {
        setHasData(hasData)
      };

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

