import React, { useState, useEffect } from 'react'
import { Input, Row, Col, Layout, Modal, Tabs } from 'antd'
import OtpUnlocking from './otp-unlocking'
import AccountUnbinding from './account-unbinding'
const { Header, Footer, Sider, Content } = Layout;
const { TabPane } = Tabs;



export default function CustomerServicesMenu() {

  return (
    <div style={{ width: 100 + 'vh' }}>
      <Row>
        <Col flex={100}>
          <Tabs defaultActiveKey="1" >
            <TabPane tab="Account Unbinding" key="1">
              <AccountUnbinding/>
            </TabPane>
            <TabPane tab="OTP-Unlocking" key="2">
              <OtpUnlocking/>
            </TabPane>
          </Tabs>
        </Col>
      </Row>


    </div>
  )
}
