import React from 'react'
import { SearchBar } from '../components/customer-service-enquiry/search-bar'
import { TableResult } from '../components/customer-service-enquiry/table-result'
import { CustomerDetail } from '../components/customer-service-enquiry/customer-detail'
export default function () {

  return (
    <div>
      <SearchBar />
      <CustomerDetail />
      <div style={{ marginTop: 20 }}>
        <TableResult />
      </div>
    </div>
  )
}
