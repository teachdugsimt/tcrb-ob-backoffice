import React from 'react'
import BusinessParametersSetup from '../components/business-parameters-setup'
import { withTranslation } from '../i18n'
const ParametersSetup = () => {
  return (
    <BusinessParametersSetup />
  )
}

ParametersSetup.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withTranslation()(ParametersSetup)
