import React, { useState } from 'react'
import styled from 'styled-components';
import { PageHeader } from '../components/page-header';
import { Row, Col, Button } from 'antd'
import { withTranslation } from '../i18n'
import TablePartner from '../components/partner-onboard/partner-table'
import Addpartner from '../components/partner-onboard/add-partner'
import { inject, observer } from 'mobx-react'
import { Router, withRouter } from 'next/router'

const PartnerManagement = inject('partnerOnboard')(observer((props) => {
  const [addPartner, setAddPartner] = useState(false)
  const { t, partnerOnboard } = props
  const goBackToTable = () => {
    console.log("------------------- Go back to table ------------------")
  }

  return (
    <Row>
      {!partnerOnboard.show_add_new_partner ? <Col>
        <PageHeader>Partner Registration</PageHeader>
        <Button type="primary" onClick={() => partnerOnboard.showAddPartner(true)}>Add new partner</Button>
        <TablePartner />
      </Col>
        : <Col flex={100}>
          <Addpartner onClick={() => { partnerOnboard.showAddPartner(false) }} />
        </Col>}
    </Row>
  )
}))

PartnerManagement.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withTranslation('common')(PartnerManagement)
