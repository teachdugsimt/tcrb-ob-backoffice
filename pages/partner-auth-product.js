import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { PageHeader } from '../components/page-header';
import { Row, Col, Button } from 'antd'
import { withTranslation } from '../i18n'
import ProductReg from '../components/partner-onboard/product-reg'
import { inject, observer } from 'mobx-react'

const ProductOnboarding = inject('partnerOnboard')(observer((props) => {

  const { t, partnerOnboard } = props

  useEffect(() => {
    // partnerOnboard.getDataPartnerProductList(xx)
    partnerOnboard.getDataPartnerProductList(JSON.parse(JSON.stringify(partnerOnboard.tmp_partner_id)))
    // console.log("Product screen :: ", JSON.parse(JSON.stringify(partnerOnboard.tmp_partner_id)))
  }, [partnerOnboard.tmp_partner_id])
  useEffect(() => {
    // partnerOnboard.getDataPartnerProductList(xx)
    partnerOnboard.getPartnerInformationById({ filter: {} }, JSON.parse(JSON.stringify(partnerOnboard.tmp_partner_real_id)))
    // console.log("Product screen :: ", JSON.parse(JSON.stringify(partnerOnboard.tmp_partner_id)))
  }, [partnerOnboard.tmp_partner_real_id])

  return (

    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      <PageHeader>
        Partner Authorized Product Registration
     </PageHeader>

      <ProductReg />

    </div>

  )
}))

ProductOnboarding.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withTranslation('common')(ProductOnboarding)
