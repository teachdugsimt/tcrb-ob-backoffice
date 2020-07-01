import React from 'react'
import { Row, Col, Layout, Tabs, Spin } from 'antd'
import OtpSetup from './otp-setup'
import ProductLimitSetup from './product-limit-setup'
import { withTranslation } from '../../i18n'
import { TcrbTabs, TcrbSpin } from '../antd-styles/styles'
import { inject, observer } from 'mobx-react'
const { TabPane } = Tabs


const BusinessParametersSetup =
  inject('businessParametersSetupStore')
    (observer((props) => {
      const { businessParametersSetupStore, t } = props
      return (
        <div>
          <TcrbSpin spinning={businessParametersSetupStore.apiLoading} size="large" tip="Loading..." >
            <Row>
              <Col flex={100}>
                <TcrbTabs defaultActiveKey="1" destroyInactiveTabPane={true} >
                  <TabPane tab={t("otpSetup")} key="1">
                    <OtpSetup />
                  </TabPane>
                  <TabPane tab={t("productLimitSetup")} key="2">
                    <ProductLimitSetup />
                  </TabPane>
                </TcrbTabs>
              </Col>
            </Row>
          </TcrbSpin>
        </div>
      )
    }))

export default withTranslation('common')(BusinessParametersSetup)
