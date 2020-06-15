import React, { useState, useEffect } from 'react'
import { Input, Row, Col, Layout, Modal, Tabs } from 'antd'
import OtpUnlocking from './otp-unlocking'
import styled from 'styled-components'
import AccountUnbinding from './account-unbinding'
const { Header, Footer, Sider, Content } = Layout;
const { TabPane } = Tabs;
import { withTranslation } from '../../i18n'

const CustomerServicesMenu = (props) => {
  const { t } = props
  return (
    <div>
      <Row flex={100}>
        <Col flex={100}>
          <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
            <TabPane tab={t("accountUnbinding")} key="1" >
              <AccountUnbinding />
            </TabPane>
            <TabPane tab={t("otpUnlock")} key="2" >
              <OtpUnlocking />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  )
}
export default withTranslation('common')(CustomerServicesMenu)
