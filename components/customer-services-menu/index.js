import React, { useState, useEffect } from 'react'
import { Input, Row, Col, Layout, Modal, Tabs } from 'antd'
import OtpUnlocking from './otp-unlocking'
import AccountUnbinding from './account-unbinding'
const { Header, Footer, Sider, Content } = Layout;
const { TabPane } = Tabs;
import { i18n, withNamespaces } from '../../i18n'



export default function CustomerServicesMenu() {

  return (
    <div>
      <Row flex={100}>
        <Col flex={100}>
          <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
            <TabPane tab={i18n.t("accountUnbinding")} key="1" >
              <AccountUnbinding />
            </TabPane>
            <TabPane tab={i18n.t("otpUnlock")} key="2" >
              <OtpUnlocking />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  )
}
