import React from 'react'
import { Row, Col, Layout, Tabs } from 'antd'
import OtpSetup from './otp-setup'
import ProductLimitSetup from './product-limit-setup'
import PendingApprovals from './pending-approvals'
import { withTranslation } from '../../i18n'
import { TcrbTab } from '../antd-styles/styles'
const { TabPane } = Tabs
//import { MainTab } from '../antd-styles/styles'
const BusinessParametersSetup = (props) => {

  const { t } = props

  return (
    <div>
      <Row>
        <Col flex={100}>
          <TcrbTab defaultActiveKey="1" destroyInactiveTabPane={true} >
            <TabPane tab={t("otpSetup")} key="1">
              <OtpSetup />
            </TabPane>
            <TabPane tab={t("productLimitSetup")} key="2">
              <ProductLimitSetup />
            </TabPane>
          </TcrbTab>
        </Col>
      </Row>
    </div>
  )
}

export default withTranslation('common')(BusinessParametersSetup)
