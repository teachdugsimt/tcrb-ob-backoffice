import React, { useState } from 'react'
import styled from 'styled-components';
import { PageHeader } from '../components/page-header';
import { Row, Col, Button } from 'antd'
import { withTranslation } from '../i18n'
import FeeSettleMentSetup from '../components/partner-onboard/fee-settlement-setup/fee-settlement'

const ProductOnboarding = (props) => {

  const { t } = props
  // console.log(addProduct)
  return (

    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>

      <PageHeader>
        {"Fee " + "&" + " Settlement Setup"}
      </PageHeader>
      <FeeSettleMentSetup />
    </div>

  )
}

ProductOnboarding.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withTranslation('common')(ProductOnboarding)
