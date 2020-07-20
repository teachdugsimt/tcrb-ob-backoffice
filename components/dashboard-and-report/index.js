import React, { useState } from 'react'
import { Input, Row, Col, Layout, Modal, Tabs, Menu, Dropdown } from 'antd'
import { TcrbSpin, TcrbTabs } from '../antd-styles/styles'
import { withTranslation } from '../../i18n'
import EligibleReport from './account-list/eligible-report'
const { TabPane } = Tabs;
const { SubMenu } = Menu;

const index = (props) => {
  const { t } = props
  const [currentMenu, setCurrentMenu] = useState('dashboard')

  const selectMenu = value => {
    console.log(value)
    setCurrentMenu(value.key)
    // componentSwitchMenu(value.key)
  }

  const ComponentSwitchMenu = (key) => {
    switch (key) {
      case 'eligibleAccountList':
        return <EligibleReport />

      default:
        break;
    }
  }

  return (
    <div>
      <TcrbSpin spinning={false} size="large" tip="Loading..." >
        <Row flex={100}>
          <Col flex={100}>
            {/* <Dropdown overlay={menu}>
          </Dropdown> */}
            <Menu mode="horizontal" onClick={selectMenu} selectedKeys={[currentMenu]}>
              <Menu.Item key="dashboard" >
                Dashboard
              </Menu.Item>
              <SubMenu title="Account List">
                <Menu.Item key="eligibleAccountList">Eligible Account List</Menu.Item>
                <Menu.Item key="bindingAccountList">Binding Account List</Menu.Item>
                <Menu.Item key="purgeAccountList">Purge Account List</Menu.Item>
              </SubMenu>
              <SubMenu title="Transaction">
                <Menu.Item key="outgoingTransaction">Outgoing Transaction</Menu.Item>
                <Menu.Item key="incomingTransaction">Incoming Transaction</Menu.Item>
              </SubMenu>
              <Menu.Item key="errorCorrection" >
                Error Correction
            </Menu.Item>
              <Menu.Item key="forcePostRepayment" >
                Force Post Repayment
            </Menu.Item>
              <SubMenu title="Unmatched">
                <Menu.Item key="unmatchedOutgoing">Unmatched Outgoing</Menu.Item>
                <Menu.Item key="unmatchedIncoming">Unmatched Incoming</Menu.Item>
              </SubMenu>
              <SubMenu title="GL Information">
                <Menu.Item key="glSummary">GL Summary</Menu.Item>
                <Menu.Item key="glTransactionDetail">GL Transaction Detail</Menu.Item>
              </SubMenu>
            </Menu>
          </Col>
        </Row>
        <div>
          {ComponentSwitchMenu(currentMenu)}
        </div>
      </TcrbSpin>
    </div>
  )
}
export default withTranslation('common')(index)

// export default index
