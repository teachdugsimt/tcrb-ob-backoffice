import React from 'react'
import { Row, Col, Layout, Tabs } from 'antd'
import PendingApprovals from '../components/business-parameters-setup/pending-approvals'
import { withTranslation } from '../i18n'

const { TabPane } = Tabs
//import { MainTab } from '../antd-styles/styles'
const PendingApprove = (props) => {

  const { t } = props

  return (
    <div>
      <Row>
        <Col flex={100}>
          <Tabs defaultActiveKey="1" destroyInactiveTabPane={true} >
            <TabPane tab={t("pendingApprovals")} key="3" >
              <PendingApprovals />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  )
}

export default withTranslation('common')(PendingApprove)
