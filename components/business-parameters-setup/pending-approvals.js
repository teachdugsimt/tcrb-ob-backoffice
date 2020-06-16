import React, { useState, useEffect } from 'react'
import { Table, Popconfirm } from 'antd';
import { inject, observer } from 'mobx-react'
import { DownOutlined } from '@ant-design/icons';
import { withTranslation } from '../../i18n'

const columns = [
  {
    title: 'Ticket#',
    dataIndex: 'ticket',
  },
  {
    title: 'Request Type',
    dataIndex: 'requestType',
  },
  {
    title: 'Request Description',
    dataIndex: 'requestDescription',
  },
  {
    title: 'Request ID',
    dataIndex: 'requestId',
  },
  {
    title: 'Request Date',
    dataIndex: 'requestDate',
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <span>
        <Popconfirm title="Sure to Accept?" onConfirm={() => businessParametersSetupStore.selectProductToDelete(record)} >
          <a style={{ marginRight: 16 }}>Accept</a>
        </Popconfirm>
        {/* <a style={{ marginRight: 16 }}>Accept</a> */}
        <Popconfirm title="Sure to Reject?" onConfirm={() => businessParametersSetupStore.selectProductToDelete(record)} >
          <a style={{ marginRight: 16 }}>Reject</a>
        </Popconfirm>
        {/* <a className="ant-dropdown-link">
          Reject
        </a> */}
      </span>
    ),
  },
];

const data = [{
  id: 1, key: 1, ticket: "PAR0000001", requestType: "OTP Max Retrying", requestDescription: "Change from 3 to 5", requestId: "T630213",
  requestDate: "21-May-2020", action: null
}];

const expand = { expandedRowRender: record => <p>{record.description}</p> };
const titleTable = () => 'Here is title';
const showHead = true;
const foot = () => 'Here is footer';
const page = { position: 'bottom' };

const PendingApprovals =
  inject('businessParametersSetupStore')
    (observer((props) => {
      const [expandable, setExpandable] = useState(expand)
      const [hasData, setHasData] = useState(true)
      const [top, setTop] = useState('none')
      const [bottom, setBottom] = useState("bottomRight")
      const [pendingApprovalData, setPendingApprovalData] = useState([])
      const { businessParametersSetupStore } = props
      useEffect(() => {
        // console.log
      }, [])
      useEffect(() => {
        if (businessParametersSetupStore.pendingApprovals.length > 0) {
          setPendingApprovalData(businessParametersSetupStore.pendingApprovals)
        }
      }, [businessParametersSetupStore.pendingApprovals])
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
          dataSource={pendingApprovalData}
        // scroll={scroll}
        />
      )
    }))

export default withTranslation('common')(PendingApprovals)

