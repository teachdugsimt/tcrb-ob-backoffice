import React, { useState } from 'react'
import styled from 'styled-components';
import { PageHeader } from '../components/page-header';
import { Row, Col, Button } from 'antd'
import { withTranslation } from '../i18n'
import ProductModify from '../components/partner-onboard/product-auth-modify'
import { inject, observer } from 'mobx-react'
const ProductOnboarding = inject('partnerOnboard')(observer((props) => {

  const { t, partnerOnboard } = props
  // console.log(addProduct)
  return (

    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      <PageHeader>
        Partner Authorized Service Registration
     </PageHeader>
      <ProductModify />

    </div>

  )
}))

ProductOnboarding.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withTranslation('common')(ProductOnboarding)
