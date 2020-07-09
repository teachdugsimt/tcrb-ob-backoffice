import React, { useState, useEffect } from 'react'
import { Input, Row, Col, Layout, Modal, Tabs, Spin } from 'antd'
const { TabPane } = Tabs;
import { withTranslation } from '../../i18n'
import { inject, observer } from 'mobx-react'
import { TcrbTabs, TcrbSpin } from '../antd-styles/styles'

import Department from './department'
import Group from './group'
import Role from './role'
import User from './user'
import MenuAndFunction from './menu-and-function';
import RoleBasedMatrix from './role-based-matrix';
const UseAccessManagement =
  inject('userAccessManagementStore')
    (observer((props) => {
      const { userAccessManagementStore, t } = props

      const setDefaultPage = (keyTab) => {
        switch (keyTab) {
          case "1":
            userAccessManagementStore.nextPageIsManageDepartment = false
            break;
          case "2":
            userAccessManagementStore.nextPageIsManageGroup = false
            break;
          case "3":
            userAccessManagementStore.nextPageIsManageUser = false
            break;
        }
      }
      return (
        <div style={{ height: "100%" }}>
          <TcrbSpin spinning={userAccessManagementStore.apiFetching} size="large" tip="Loading..." >
            <Row flex={100}>
              <Col flex={100}>
                <TcrbTabs defaultActiveKey="1" destroyInactiveTabPane={true} onChange={(key) => setDefaultPage(key)}>
                  <TabPane tab={t("Department")} key="1">
                    <Department />
                  </TabPane>
                  <TabPane tab={t("Group")} key="2" >
                    <Group />
                  </TabPane>
                  <TabPane tab={t("User")} key="3" >
                    <User />
                  </TabPane>
                  <TabPane tab={t("Menu and Function")} key="4" >
                    <MenuAndFunction />
                  </TabPane>
                  <TabPane tab={t("Role")} key="5" >
                    <Role />
                  </TabPane>
                  <TabPane tab={t("Role based matrix")} key="6" >
                    <RoleBasedMatrix />
                  </TabPane>
                </TcrbTabs>
              </Col>
            </Row>
          </TcrbSpin>
        </div>
      )
    }))
export default withTranslation('common')(UseAccessManagement)
