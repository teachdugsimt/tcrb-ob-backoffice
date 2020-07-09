import React, { useState, useEffect } from 'react'
import { Table, Row, Col, Menu, Card, Input, Select, Form, InputNumber, Divider, Button, Modal, Drawer } from 'antd'
import { TcrbButton, TcrbPopconfirm } from '../../../antd-styles/styles'
import { inject, observer } from 'mobx-react'

import SimpleModal from '../../../simple-modal'
import SimpleInput from '../../../simple-input'

import { checkDefaultStatus } from '../../../data-utility'
let roleName = null
const MenuList = inject('userAccessManagementStore')
  (observer((props) => {
    const { userAccessManagementStore } = props
    const [mockMenuList, setMockMenuList] = useState([])
    const [modalTitle, setModalTitle] = useState("")
    const [textOk, settextOk] = useState("Submit")
    const [textCancel, settextCancel] = useState("Cancel")
    const [modalString, setModalString] = useState("")
    const [modalType, setModalType] = useState('confirm')
    const [visible, setVisible] = useState(false)

    useEffect(() => {
      setMockMenuList(menuList())
    }, [])

    const menuList = () => {
      let newArray = []
      for (let index = 1; index < 6; index++) {
        newArray.push({
          id: index,
          key: index,
          menu_name: "menu_" + index,
          status: '1',
          functions: 2
        })
      }
      return newArray
    }

    const FormAddNewMenu = () => {
      return (
        <div>
          <Row gutter={[16, 16]}>
            <Col span={10} >
              <span>
                Menu Name
            </span>
            </Col>
            <Col span={14}>
              <SimpleInput onChange={(value) => roleName = value} />
            </Col>
          </Row>
          <Row >
            <Col span={10} >
              <span>
                Functions
              </span>
            </Col>
            <Col span={14}>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select Functions"
                onChange={(value) => null}
              >
                {/* {userList.map((item, index) => <Option key={index} value={item.id}>{item.user_name}</Option>)} */}
              </Select>
            </Col>
          </Row>
        </div>

      )
    }

    const openModalAddNewMenu = () => {
      setModalTitle('Add new menu')
      setModalString(<FormAddNewMenu />)
      setVisible(true)
    }

    const addNewMenu = () => {
      //waiting call api
      setVisible(false)
    }
    const columnMenu = [
      {
        title: '',
        dataIndex: 'status',
        width: '5%',
        render: (text, record) => checkDefaultStatus(text)
      },
      {
        title: 'Name',
        dataIndex: 'menu_name',
        // render: (text, record) => (record.partner_code + "/" + record.partner_abbreviation)
      },
      {
        title: 'Functions',
        dataIndex: 'functions',
        // render: (text, record) => (record.partner_code + "/" + record.partner_abbreviation)
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        width: '10%',
        // render: (text, record) => renderActionGroup(record)
      }
    ]
    return (
      <div>
        <Row gutter={[4, 24]}>
          <Col span={2}>
            <TcrbButton className="primary" onClick={() => openModalAddNewMenu()} >Add Menu</TcrbButton>
          </Col>
        </Row>
        <Table
          bordered
          dataSource={mockMenuList}
          columns={columnMenu}
          size="small"
        />
        <SimpleModal
          title={modalTitle}
          type={modalType}
          onOk={() => addNewMenu()}
          onCancel={() => setVisible(false)}
          textCancel={textCancel}
          textOk={textOk}
          width={600}
          modalString={modalString}
          visible={visible}
        />
      </div>
    )
  }))

export default MenuList
