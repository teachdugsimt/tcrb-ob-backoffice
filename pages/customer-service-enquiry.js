import React from 'react'
import { SearchBar } from '../components/customer-service-enquiry/search-bar'
import TableResult from '../components/customer-service-enquiry/table-result'
import CustomerDetail from '../components/customer-service-enquiry/customer-detail'
import { Row, Col } from 'antd'
import { withTranslation } from '../i18n'
const CustomerServiceEnquiry = () => {

  return (
    <Row>
      <Col span={24}>
        <SearchBar />
        <CustomerDetail />
      </Col>
      <Col>
        <TableResult />
      </Col>
    </Row>
  )
}

CustomerServiceEnquiry.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withTranslation()(CustomerServiceEnquiry)
