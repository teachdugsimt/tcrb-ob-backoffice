import React, { useState, useEffect } from 'react'
import { Table, Row, Col, Menu, Card, Input, Select, Form, InputNumber, Divider, Button, Modal, Drawer } from 'antd'
import { TcrbButton, TcrbPopconfirm } from '../../antd-styles/styles'
import { inject, observer } from 'mobx-react'
import { orange, green, gold } from '@ant-design/colors';

import SimpleModal from '../../simple-modal'
import SimpleInput from '../../simple-input'

import { checkDefaultStatus, renderAction, addKeyToDataSource } from '../../data-utility'
import UserAccessManagement from '../../../stores/user-access-management-store';
import { toJS } from 'mobx';

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
    const [groupList, setGroupList] = useState([])
    const [roleOptionList, setRoleOptionList] = useState([])
    const [userInGroupList, setUserInGroupList] = useState([])

    useEffect(() => {
      userAccessManagementStore.getDataGroup()
      userAccessManagementStore.getDataRoleOptionList()
    }, [])

    useEffect(() => {
      if (userAccessManagementStore.groupList.length >= 0) {
        addKeyToDataSource(userAccessManagementStore.groupList).then(result => {
          setGroupList(result)
        })
      }
    }, [userAccessManagementStore.groupList])

    useEffect(() => {
      if (userAccessManagementStore.optionRoleList.length >= 0) {
        addKeyToDataSource(userAccessManagementStore.optionRoleList).then(result => {
          setRoleOptionList(result)
        })
      }

    }, [userAccessManagementStore.optionRoleList])

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

    const viewUsers = (record) => {
      let newUserObject = []
      let groupList = record.map_user_groups.length
      for (let index = 0; index < groupList; index++) {
        newUserObject.push({
          name: record.map_user_groups[index].user_profile.name,
          surname: record.map_user_groups[index].user_profile.surname,
          email: record.map_user_groups[index].user_profile.email,
          ...record.map_user_groups[index]
        })
      }
      addKeyToDataSource(newUserObject).then(result => {
        setUserInGroupList(result)
        setmodalString(
          <Table
            dataSource={result}
            columns={columnUser}
            size="small"
          />
        )
      })

      setModalType('')
      setModalTitle('User List')
      setvisible(true)
    }

    const viewManageGroup = (record) => {
      userAccessManagementStore.groupSelected = record
      userAccessManagementStore.nextPageIsManageGroup = true
    }

    const renderUsers = (record) => {
      if (record.map_user_groups <= 0) {
        return <span>0 user</span>
      } else {
        return <div>
          <a onClick={() => viewUsers(record)}>{record.map_user_groups.length} Users</a>
        </div>
      }
    }

    const renderActionGroup = (record) => {
      if (record.status == 'ACTIVE') {
        if (record.request_status == 'APPROVE' || record.request_status == 'REJECT') {
          return (
            <div style={{ textAlign: "center" }}>
              <a style={{ marginRight: 8, color: '#FBA928' }} onClick={() => viewManageGroup(record)}>Edit</a>
              <TcrbPopconfirm title="Sure to Deactivate?" >
                <a style={{ color: '#FBA928' }}>Deactivate</a>
              </TcrbPopconfirm>
            </div>
          )
        } else if (record.request_status == 'PENDING') {
          return null
        }

      } else if (status == 'INACTIVE') {
        if (record.request_status == 'PENDING') {
          return null
        }
      } else {
        return null
      }
    }

    const renderRoleName = (role) => {
      if (role != null) {
        return role.name
      } else {
        return null
      }
    }

    const columnGroup = [
      {
        title: '',
        dataIndex: 'status',
        width: '5%',
        render: (text, record) => checkDefaultStatus(record.status, record.request_status)
      },
      {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Role',
        dataIndex: 'role',
        render: (text, record) => renderRoleName(record.role),
        sorter: (a, b) => a.role.name.localeCompare(b.role.name),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Users',
        dataIndex: 'map_user_groups',
        render: (text, record) => renderUsers(record),
        sorter: (a, b) => a.map_user_groups.length - (b.map_user_groups.length),
        sortDirections: ['descend', 'ascend'],
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
        render: (text, record) => checkDefaultStatus(record.status, record.request_status)
      },
      {
        title: 'Name',
        dataIndex: 'name',
        // render: (text, record) => (record.partner_code + "/" + record.partner_abbreviation)
      },
      {
        title: 'Surname',
        dataIndex: 'surname',
        // render: (text, record) => renderSection(record)
      }
    ]

    const addNewGroup = () => {
      //call api
      setvisible(false)
      let request = {
        name: groupName,
        role_id: roleSelect
      }
      userAccessManagementStore.submitAddNewGroup(request)
      // console.log(groupName, roleSelect)
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
                {roleOptionList.map((item, index) => <Option key={index} value={item.id}>{item.name}</Option>)}
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
                dataSource={userInGroupList}
                columns={columnUser}
                size="small"
                pagination={false}
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
          dataSource={groupList}
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
