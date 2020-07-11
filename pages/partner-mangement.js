import React, { useState } from 'react'
import styled from 'styled-components';
import { PageHeader } from '../components/page-header';
import { Row, Col, Button } from 'antd'
import { withTranslation } from '../i18n'
import TablePartner from '../components/partner-onboard/partner-table'
import Addpartner from '../components/partner-onboard/add-partner'
const PartnerManagement = (props) => {
  const [addPartner, setAddPartner] = useState(false)
  const { t } = props
  return (
    <Row>
      {!addPartner ? <Col>
        <PageHeader>Partner Registration</PageHeader>
        <Button type="primary" onClick={() => setAddPartner(true)}>Add new partner</Button>
        <TablePartner />
      </Col>
        : <div style={{ display: 'flex', flex: 1 }}>
          <Addpartner />
        </div>}
    </Row>
  )
}

PartnerManagement.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withTranslation('common')(PartnerManagement)
