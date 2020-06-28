import React from 'react'
import { SearchBar } from '../components/customer-service-enquiry/search-bar'
import { TableResult } from '../components/customer-service-enquiry/table-result'
import { CustomerDetail } from '../components/customer-service-enquiry/customer-detail'
import { Row, Col } from 'antd'
export default function () {

  return (
    <Row>
      <Col>
        <SearchBar />
        <CustomerDetail />
      </Col>
      <Row style={{ marginTop: 20 }}>
        <TableResult />
      </Row>
    </Row>
  )
}
