import React, { useState, useEffect } from 'react'
import { Input, Row, Col, Layout, Modal, Tabs, Spin } from 'antd'
const { TabPane } = Tabs;
import { withTranslation } from '../../i18n'
import { inject, observer } from 'mobx-react'
import { TcrbTabs } from '../antd-styles/styles'

import Department from './department'
const UseAccessManagement =
  inject('UserAccessManagementStore')
    (observer((props) => {
      const { UserAccessManagementStore, t } = props

      return (
        <div style={{ height: "100%" }}>
          <Spin spinning={UserAccessManagementStore.apiFetching} size="large" tip="Loading..." >
            <Row flex={100}>
              <Col flex={100}>
                <TcrbTabs defaultActiveKey="1" destroyInactiveTabPane={true}>
                  <TabPane tab={t("Department")} key="1">
                    <Department />
                  </TabPane>
                  <TabPane tab={t("Group")} key="2" >
                  </TabPane>
                  <TabPane tab={t("User")} key="3" >
                  </TabPane>
                  <TabPane tab={t("Menu and Function")} key="4" >
                  </TabPane>
                  <TabPane tab={t("Role")} key="5" >
                  </TabPane>
                  <TabPane tab={t("Role based matrix")} key="6" >
                  </TabPane>
                </TcrbTabs>
              </Col>
            </Row>
          </Spin>
        </div>
      )
    }))
export default withTranslation('common')(UseAccessManagement)
