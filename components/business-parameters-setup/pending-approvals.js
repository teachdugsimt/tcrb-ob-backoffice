import React, { useState, useEffect } from 'react'
import { Button, Table, Popconfirm, Row, Col } from 'antd'
import { useStores } from '../../hooks/use-stores'
import { observer } from 'mobx-react';
import { toJS } from 'mobx'
export default (observer(function PendingApprovals() {
  const [dataSource, setDataSource] = useState([])
  const { businessParametersSetupStore } = useStores()
  const mockDataSource = []
  // let pendingApprovalsRawData = toJS(businessParametersSetupStore.pendingApprovals)

  useEffect(() => {
    let pendingApprovalsRawData = toJS(businessParametersSetupStore.pendingApprovals)
    if(Object.keys(pendingApprovalsRawData).length === 0){
      //waiting action
    }else{
      console.log(pendingApprovalsRawData)
      // mockDataSource.push(pendingApprovalsRawData)
      setDataSource(pendingApprovalsRawData)
      console.log(mockDataSource)

    }
    // console.log(businessParametersSetupStore.pendingApprovals)
  }, [businessParametersSetupStore.pendingApprovals.length]);
  // console.log(toJS(businessParametersSetupStore.pendingApprovals))

  const handleDelete = key => {
    // const dataSource = [...this.state.dataSource];
    console.log(key)
    // setDataSource(dataSource.filter(item => item.key !== key))

  };
  const columns = [

    {
      title: 'Ticket#',
      dataIndex: 'ticket',
      width: '10%',
      // editable: true,
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
      title: 'Requester ID',
      dataIndex: 'requesterId',
    },
    {
      title: 'Request Date',
      dataIndex: 'requestDate',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) =>
        dataSource.length >= 1 ? (
          <>
          <Popconfirm title="Sure to Approve?" onConfirm={() => handleDelete(record.key)} >
            <a style={{paddingRight: 12}}>Approve</a>
          </Popconfirm>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
          </>
        ) : null,
    }
  ];

  return (
    <div>
      <Row>
        <Col flex={100}>
        <Table
            // components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns}
          />
        </Col>
      </Row>

    </div>
  )
}))
