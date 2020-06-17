import React from 'react'
import { SearchBar } from '../components/customer-service-enquiry/search-bar'
import { TableResult } from '../components/customer-service-enquiry/table-result'
import { useTheme } from 'styled-components'
// import CustomerServicesMenu from '../components/customer-services-menu'
export default function () {

  return (
    <div>
      <SearchBar />
      <div style={{ marginTop: 20 }}>
        <TableResult />
      </div>
    </div>
  )
}
