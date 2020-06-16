import React, { useState } from 'react'
import { Table, Switch, Radio, Form } from 'antd';
import { DownOutlined } from '@ant-design/icons';

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
        <a style={{ marginRight: 16 }}>Accept</a>
        <a className="ant-dropdown-link">
          Reject
        </a>
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

export default function PendingApprovals() {

  const [expandable, setExpandable] = useState(expand)
  const [hasData, setHasData] = useState(true)
  const [top, setTop] = useState('none')
  const [bottom, setBottom] = useState("bottomRight")

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
      dataSource={hasData ? data : null}
    // scroll={scroll}
    />
  )
}
