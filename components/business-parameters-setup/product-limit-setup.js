import React, { useState, useEffect } from 'react'
import { Button, Table, Popconfirm, Row, Col } from 'antd'
import { useStores } from '../../hooks/use-stores'
import { observer } from 'mobx-react'

export default (observer(function ProductLimitSetup() {
  const [dataSource, setDataSource] = useState([])
  const { businessParametersSetupStore } = useStores()

  useEffect(() => {
      setDataSource(mockDataSource)

  }, []);
  const handleDelete = key => {
    // const dataSource = [...this.state.dataSource];
    // setDataSource(dataSource.filter(item => item.key !== key))
    console.log(key)

  };
  console.log(businessParametersSetupStore.pendingApprovals)
  const columns = [
    {
      // title: 'Specific Channel Limit',
      dataIndex: 'operation',
      render: (text, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => businessParametersSetupStore.selectProductToDelete(record)} >
            <a >Delete</a>
          </Popconfirm>
        ) : null,
    },
    {
      title: 'Product_Code',
      dataIndex: 'ProductCode',
      width: '10%',
      editable: true,
    },
    {
      title: 'Product_Description',
      dataIndex: 'ProductDescription',
    },
    {
      title: 'All-Channel Txn Limit',
      dataIndex: 'TxnLimit',
    },
    {
      title: 'All-Channel Daily Limit',
      dataIndex: 'DailyLimit',
    },
    {
      title: 'Specific Channel Limit',
      dataIndex: 'Specific',
    },
  ];
  const mockDataSource = [
    {
      key: '0',
      ProductCode: 'NE',
      ProductDescription: 'Revolving Loan-Non TCG Nano',
      TxnLimit: '100,000.00',
      DailyLimit: '100,000.00'
    },
    {
      key: '1',
      ProductCode: 'NG',
      ProductDescription: 'Revolving Loan-Non TCG Micro',
      TxnLimit: '200,000.00',
      DailyLimit: '200,000.00'
    },
    {
      key: '2',
      ProductCode: 'NH',
      ProductDescription: 'Revolving Loan-TCG Nano',
      TxnLimit: '100,000.00',
      DailyLimit: '100,000.00'
    },
  ]
  return (
    <div>
      <Row>
        <Button
          // onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >Add a row</Button>
      </Row>
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
