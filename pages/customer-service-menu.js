import React from 'react'
import CustomerServicesMenu from '../components/customer-services-menu'
import { withTranslation } from '../i18n'

const CustomerServiceList = () => {
  return (
    <CustomerServicesMenu />
  )
}

CustomerServiceList.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withTranslation()(CustomerServiceList)
