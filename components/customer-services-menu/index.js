import React, { useState, useEffect } from 'react'
import { Input, Row, Col, Layout, Modal, Tabs, Spin } from 'antd'
import OtpUnlocking from './otp-unlocking'
import AccountUnbinding from './account-unbinding'
const { TabPane } = Tabs;
import { withTranslation } from '../../i18n'
import { inject, observer } from 'mobx-react'
import { TcrbTabs, TcrbSpin } from '../antd-styles/styles'

// export default function CustomerServicesMenu
const CustomerServicesMenu =
  inject('customerServicesMenuStore')
    (observer((props) => {
      const { customerServicesMenuStore, t } = props

      return (
        <div style={{ height: "100%" }}>
          <TcrbSpin spinning={customerServicesMenuStore.apiFetching} size="large" tip="Loading..." >
            <Row flex={100}>
              <Col flex={100}>
                <TcrbTabs defaultActiveKey="1" destroyInactiveTabPane={true}>
                  <TabPane tab={t("accountUnbinding")} key="1">
                    <AccountUnbinding />
                  </TabPane>
                  <TabPane tab={t("otpUnlock")} key="2" >
                    <OtpUnlocking />
                  </TabPane>
                </TcrbTabs>
              </Col>
            </Row>
          </TcrbSpin>
        </div>
      )
    }))
export default withTranslation('common')(CustomerServicesMenu)
