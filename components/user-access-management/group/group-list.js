import React, { useState, useEffect } from 'react'
import { Table, Row, Col, Menu, Card, Input, Select, Form, InputNumber, Divider, Button, Modal, Drawer } from 'antd'
import { TcrbButton, TcrbPopconfirm } from '../../antd-styles/styles'
import { inject, observer } from 'mobx-react'
import { orange, green, gold } from '@ant-design/colors';

import SimpleModal from '../../simple-modal'
import SimpleInput from '../../simple-input'

import { checkDefaultStatus, renderAction } from '../../data-utility'
import UserAccessManagement from '../../../stores/user-access-management-store';

const { Option } = Select;
let groupName = null
let roleSelect = null
const GroupList = inject('userAccessManagementStore')
  (observer((props) => {
    const { userAccessManagementStore } = props
    const [modalTitle, setModalTitle] = useState("")
    const [textOk, settextOk] = useState("Submit")
    const [textCancel, settextCancel] = useState("Cancel")
    const [modalString, setmodalString] = useState("")
    const [modalType, setModalType] = useState('confirm')
    const [visible, setvisible] = useState(false)
    const [roleList, setRoleList] = useState([])
    useEffect(() => {
      setRoleList(mockRoleList)
    }, [])
    const mockRoleList = [
      {
        id: 1,
        key: 1,
        role_name: "role_1"
      },
      {
        id: 2,
        key: 2,
        role_name: "role_2",
      },
      {
        id: 3,
        key: 3,
        role_name: "role_3",
      },
      {
        id: 4,
        key: 4,
        role_name: "role_4",
      },
      {
        id: 5,
        key: 5,
        role_name: "role_5",
      }
    ]

    const mockGroupList = [
      {
        id: 1,
        key: 1,
        group_name: "group_1",
        role_name: "role_1",
        user: 5,
        status: '1'
      },
      {
        id: 2,
        key: 2,
        group_name: "group_2",
        role_name: "role_2",
        user: 5,
        status: '1'
      },
      {
        id: 3,
        key: 3,
        group_name: "group_3",
        role_name: "role_3",
        user: 5,
        status: '1'
      },
      {
        id: 4,
        key: 4,
        group_name: "group_4",
        role_name: "role_4",
        user: 5,
        status: '2'
      },
      {
        id: 5,
        key: 5,
        group_name: "group_5",
        role_name: "role_5",
        user: 0,
        status: '1'
      }
    ]

    const mockUserList = [
      {
        id: 1,
        key: 1,
        user_name: "name_1",
        status: '1'
      },
      {
        id: 2,
        key: 2,
        user_name: "name_2",
        status: '1'
      },
      {
        id: 3,
        key: 3,
        user_name: "name_3",
        status: '1'
      },
      {
        id: 4,
        key: 4,
        user_name: "name_4",
        status: '1'
      },
      {
        id: 5,
        key: 5,
        user_name: "name_5",
        status: '1'
      }
    ]

    const viewUsers = () => {
      setmodalString(<UserList />)
      setModalType('')
      setModalTitle('User List')
      setvisible(true)
    }

    const viewManageGroup = (record) => {
      userAccessManagementStore.groupSelected = record
      userAccessManagementStore.nextPageIsManageGroup = true
    }

    const renderUsers = (record) => {
      if (record.user <= 0) {
        return <span>0 user</span>
      } else {
        return <div>
          <a onClick={() => viewUsers(record)}>{record.user} Users</a>
        </div>
      }
    }

    const renderActionGroup = (record) => {
      if (record.status === '1') {
        return (
          <div style={{ textAlign: "center" }}>
            <TcrbPopconfirm title="Sure to Edit?" onConfirm={() => viewManageGroup(record)}>
              <a style={{ marginRight: 8 }}>Edit</a>

            </TcrbPopconfirm>
            <TcrbPopconfirm title="Sure to Deactivate?" >
              <a style={{ color: '#FBA928' }}>Deactivate</a>
            </TcrbPopconfirm>
          </div>
        )

      } else if (record.status === '2') {
        return null
      } else {
        return null
      }
    }

    const columnGroup = [
      {
        title: '',
        dataIndex: 'status',
        width: '5%',
        render: (text, record) => checkDefaultStatus(text)
      },
      {
        title: 'Name',
        dataIndex: 'group_name',
        // render: (text, record) => (record.partner_code + "/" + record.partner_abbreviation)
      },
      {
        title: 'Role',
        dataIndex: 'role_name',
        // render: (text, record) => renderSection(record)
      },
      {
        title: 'Users',
        dataIndex: 'user',
        render: (text, record) => renderUsers(record)
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        width: '10%',
        render: (text, record) => renderActionGroup(record)
        // render:(text,record) => renderAction(record, viewManageGroup)
      }
    ]

    const columnUser = [
      {
        title: '',
        dataIndex: 'status',
        width: '5%',
        render: (text, record) => checkDefaultStatus(text)
      },
      {
        title: 'Name',
        dataIndex: 'user_name',
        // render: (text, record) => (record.partner_code + "/" + record.partner_abbreviation)
      },
      {
        title: 'Last Name',
        dataIndex: 'role_name',
        // render: (text, record) => renderSection(record)
      }
    ]

    const addNewGroup = () => {
      //call api
      setvisible(false)
      console.log(groupName, roleSelect)
    }

    const FormAddNewGroup = () => {
      return (
        <div>
          <Row>
            <Col span={10} style={{ padding: 4 }}>
              <p>
                Group Name
            </p>
            </Col>
            <Col span={14}>
              <SimpleInput onChange={(value) => groupName = value} />
            </Col>
          </Row>
          <Row>
            <Col span={10} style={{ padding: 4 }}>
              <p>Role</p>
            </Col>
            <Col span={14}>
              <Select
                style={{ width: '100%' }}
                placeholder="Please select"
                onChange={(value) => roleSelect = value}
              >
                {roleList.map((item, index) => <Option key={index} value={item.id}>{item.role_name}</Option>)}
              </Select>
            </Col>
          </Row>
        </div>
      )
    }

    const UserList = () => {
      return (
        <div>
          <Row>
            <Col flex={100}>
              <Table
                dataSource={mockUserList}
                columns={columnUser}
                size="small"
              />
            </Col>
          </Row>
        </div>
      )
    }

    const openModalAddGroup = () => {
      setModalTitle('Add New Group')
      setModalType('confirm')
      setmodalString(<FormAddNewGroup />)
      setvisible(true)
    }

    return (
      <div>
        <Row gutter={[4, 24]}>
          <Col span={2}>
            <TcrbButton className="primary" onClick={() => openModalAddGroup()} >Add Group</TcrbButton>
          </Col>
        </Row>
        <Table
          bordered
          dataSource={mockGroupList}
          columns={columnGroup}
          size="small"
        />
        <SimpleModal
          title={modalTitle}
          type={modalType}
          onOk={() => addNewGroup()}
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

export default GroupList
