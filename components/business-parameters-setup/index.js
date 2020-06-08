import React from 'react'
import { Row, Col, Layout, Tabs } from 'antd'
import OtpSetup from './otp-setup'
import ProductLimitSetup from './product-limit-setup'
import PendingApprovals from './pending-approvals'

const {TabPane} = Tabs
export default function BusinessParametersSetup() {
  return (
    <div>
      <Row>
        <Col flex={100}>
          <Tabs defaultActiveKey="1" >
            <TabPane tab="OTP Setup" key="1">
              <OtpSetup />
            </TabPane>
            <TabPane tab="Product Limit Setup" key="2">
              <ProductLimitSetup />
            </TabPane>
            <TabPane tab="Pending Approvals" key="3">
              <PendingApprovals />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  )
}
