import React from 'react'
import { Row, Col, Layout, Tabs } from 'antd'
import PendingApprovals from '../components/business-parameters-setup/pending-approvals'
import { withTranslation } from '../i18n'
import styled from 'styled-components';

export const PageHeader = styled.h1`
  font-size: ${({ theme }) => theme.typography.header}px;
  font-weight: bold;
`
const { TabPane } = Tabs
//import { MainTab } from '../antd-styles/styles'
const PendingApprove = (props) => {

  const { t } = props

  return (
    <div>
      <Row>
        <Col flex={100}>
          {/* <Tabs defaultActiveKey="1" destroyInactiveTabPane={true} > */}
          {/* <TabPane tab={t("pendingApprovals")} key="3" > */}
          <PageHeader>Pending Approve</PageHeader>
          <PendingApprovals />
          {/* </TabPane> */}
          {/* </Tabs> */}
        </Col>
      </Row>
    </div>
  )
}

export default withTranslation('common')(PendingApprove)
