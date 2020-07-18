import React, { useState } from 'react'
import styled from 'styled-components';
import { PageHeader } from '../components/page-header';
import { Row, Col, Button } from 'antd'
import { withTranslation } from '../i18n'
import GlPrincipalChange from '../components/partner-onboard/gl-principal-setup/gl-principal-change'

const GlPrincipalSetup = (props) => {

  const { t } = props
  // console.log(addProduct)
  return (

    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>

      <PageHeader>
        {"GL " + "Principal" + " Setup"}
      </PageHeader>
      <GlPrincipalChange />
    </div>

  )
}

GlPrincipalSetup.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withTranslation('common')(GlPrincipalSetup)
