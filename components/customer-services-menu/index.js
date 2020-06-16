import React, { useState, useEffect } from 'react'
import { Input, Row, Col, Layout, Modal, Tabs, Spin } from 'antd'
import OtpUnlocking from './otp-unlocking'
import AccountUnbinding from './account-unbinding'
const { TabPane } = Tabs;
import { withTranslation } from '../../i18n'
import { inject, observer } from 'mobx-react'
import { MainTab } from '../antd-styles/styles'
// import styled from 'styled-components';
// import { palette } from '../../theme/palette'
// const MainTab = styled(Tabs)`
//     .ant-tabs-tab-active{
//       color: ${palette.orange} !important;
//     }
//     .ant-tabs-tab:hover{
//       color: ${palette.orange} !important;
//     }
//     .ant-tabs-ink-bar {
//       background: ${palette.orange} !important;
//     }
//     .ant-btn {
//       background: ${palette.orange} !important;
//       border-color: ${palette.orange} !important;
//     }
// `
// export default function CustomerServicesMenu
const CustomerServicesMenu =
  inject('customerServicesMenuStore')
    (observer((props) => {
      const { customerServicesMenuStore, t } = props

      return (
        <div>
          <Spin spinning={customerServicesMenuStore.apiFetching} size="large" tip="Loading...">
            <Row flex={100}>
              <Col flex={100}>
                <MainTab defaultActiveKey="1" destroyInactiveTabPane={true}>
                  <TabPane tab={t("accountUnbinding")} key="1">
                    <AccountUnbinding />
                  </TabPane>
                  <TabPane tab={t("otpUnlock")} key="2" >
                    <OtpUnlocking />
                  </TabPane>
                </MainTab>
              </Col>
            </Row>
          </Spin>
        </div>
      )
    }))
export default withTranslation('common')(CustomerServicesMenu)
