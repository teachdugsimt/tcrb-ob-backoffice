import React, { useState } from 'react'
import styled from 'styled-components';
import { PageHeader } from '../components/page-header';
import { Row, Col, Button } from 'antd'
import { withTranslation } from '../i18n'
import FeeSettleMentSetup from '../components/partner-onboard/fee-settlement-setup/fee-settlement'
import {withRouter} from 'next/router'
const FeeSettlementContainer = (props) => {

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

FeeSettlementContainer.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withRouter(withTranslation('common')(FeeSettlementContainer))
