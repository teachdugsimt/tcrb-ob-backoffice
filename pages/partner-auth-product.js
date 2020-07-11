import React, { useState } from 'react'
import styled from 'styled-components';
import { PageHeader } from '../components/page-header';
import { Row, Col, Button } from 'antd'
import { withTranslation } from '../i18n'
import ProductReg from '../components/partner-onboard/product-reg'
const ProductOnboarding = (props) => {

  const { t } = props
  // console.log(addProduct)
  return (

    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      <PageHeader>
        Partner Authorized Product Registration
     </PageHeader>

      <ProductReg />

    </div>

  )
}

ProductOnboarding.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withTranslation('common')(ProductOnboarding)
