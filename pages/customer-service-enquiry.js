import React from 'react'
import { SearchBar } from '../components/customer-service-enquiry/search-bar'
import { TableResult } from '../components/customer-service-enquiry/table-result'
import { CustomerDetail } from '../components/customer-service-enquiry/customer-detail'
import { Row, Col } from 'antd'
export default function () {

  return (
    <Row>
      <Col span={24}>
        <SearchBar />
        <CustomerDetail />
      </Col>
      <Col style={{ marginTop: 20 }}>
        <TableResult />
      </Col>
    </Row>
  )
}
