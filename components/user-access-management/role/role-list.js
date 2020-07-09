import React, { useState, useEffect } from 'react'
import { Table, Row, Col, Menu, Card, Input, Select, Form, InputNumber, Divider, Button, Modal, Drawer } from 'antd'
import { TcrbButton, TcrbPopconfirm } from '../../antd-styles/styles'
import { inject, observer } from 'mobx-react'

import SimpleModal from '../../simple-modal'
import SimpleInput from '../../simple-input'

import { checkDefaultStatus } from '../../data-utility'
let roleName = null
const RoleList = inject('userAccessManagementStore')
  (observer((props) => {
    const { userAccessManagementStore } = props
    const [mockRoleList, setMockRoleList] = useState([])
    const [modalTitle, setModalTitle] = useState("")
    const [textOk, settextOk] = useState("Submit")
    const [textCancel, settextCancel] = useState("Cancel")
    const [modalString, setmodalString] = useState("")
    const [modalType, setModalType] = useState('confirm')
    const [visible, setvisible] = useState(false)

    useEffect(() => {
      setMockRoleList(roleList())
    }, [])

    const roleList = () => {
      let newArray = []
      for (let index = 1; index < 6; index++) {
        newArray.push({
          id: index,
          key: index,
          role_name: "role_name" + index,
          status: '1'
        })
      }
      return newArray
    }

    const FormAddNewRole = () => {
      return (
        <Row>
          <Col span={10} >
            <span>
              Role Name
            </span>
          </Col>
          <Col span={14}>
            <SimpleInput onChange={(value) => roleName = value} />
          </Col>
        </Row>
      )
    }

    const openModalAddNewRole = () => {
      setModalTitle('Add new role')
      setmodalString(<FormAddNewRole />)
      setvisible(true)
    }

    const addNewRole = () => {
      //waiting call api
      setvisible(false)
    }
    const columnRole = [
      {
        title: '',
        dataIndex: 'status',
        width: '5%',
        render: (text, record) => checkDefaultStatus(text)
      },
      {
        title: 'Name',
        dataIndex: 'role_name',
        // render: (text, record) => (record.partner_code + "/" + record.partner_abbreviation)
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        width: '10%',
        // render: (text, record) => renderActionGroup(record)
      }
    ]
    console.log(columnRole, mockRoleList)
    return (
      <div>
        <Row gutter={[4, 24]}>
          <Col span={2}>
            <TcrbButton className="primary" onClick={() => openModalAddNewRole()} >Add Role</TcrbButton>
          </Col>
        </Row>
        <Table
          bordered
          dataSource={mockRoleList}
          columns={columnRole}
          size="small"
        />
        <SimpleModal
          title={modalTitle}
          type={modalType}
          onOk={() => addNewRole()}
          onCancel={() => setvisible(false)}
          textCancel={textCancel}
          textOk={textOk}
          width={600}
          modalString={modalString}
          visible={visible}
        />
      </div>
    )
  }))

export default RoleList
