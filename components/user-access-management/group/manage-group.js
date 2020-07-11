import React, { useState, useEffect } from 'react'
import { Table, Row, Col, Menu, Card, Input, Select, Form, InputNumber, Divider, Button, Modal, Drawer, Space } from 'antd'
import { DeleteOutlined, EditOutlined, FormOutlined } from '@ant-design/icons';
import { TcrbButton, TcrbPopconfirm } from '../../antd-styles/styles'
import { inject, observer } from 'mobx-react'

import SimpleInput from '../../simple-input'
import SimpleModal from '../../simple-modal'

import { checkDefaultStatus, addKeyToDataSource } from '../../data-utility'

const { Option } = Select;
let listUserSelect = []
let name = null
let role_id = null
const ManageGroup = inject('userAccessManagementStore')
  (observer((props) => {
    const { userAccessManagementStore, t } = props
    const [showEditGroup, setShowEditGroup] = useState(false)
    const [roleList, setRoleList] = useState([])
    const [modalTitle, setModalTitle] = useState("")
    const [textOk, settextOk] = useState("Submit")
    const [textCancel, settextCancel] = useState("Cancel")
    const [modalString, setmodalString] = useState("")
    const [modalType, setModalType] = useState('confirm')
    const [visible, setvisible] = useState(false)
    const [userInGroupList, setUserInGroupList] = useState([])

    useEffect(() => {
      setRoleList([])
      addKeyToUserInGroup(userAccessManagementStore.groupSelected.map_user_groups)
    }, [])

    const addKeyToUserInGroup = (userInGroupList) => {
      addKeyToDataSource(userInGroupList).then(result => {
        setUserInGroupList(result)
      })
    }



    const columnUser = [
      {
        title: '',
        dataIndex: 'status',
        width: '5%',
        render: (text, record) => checkDefaultStatus(record.status, record.request_status)
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
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        width: '10%',
        render: (text, record) => renderActionGroupUser(record)
      }
    ]

    const AddUserToGroup = () => {
      return (
        <div>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select user"
            onChange={(value) => { listUserSelect = value }}
          >
            {userList.map((item, index) => <Option key={index} value={item.id}>{item.user_name}</Option>)}
          </Select>
        </div>
      )
    }

    const goBackGroupList = () => {
      userAccessManagementStore.nextPageIsManageGroup = false
    }

    const cancelEditGroup = () => {
      setShowEditGroup(false)
    }

    const submitEditGroup = () => {
      //waiting for call api
      setShowEditGroup(false)
    }

    const openModalAddUser = () => {
      setModalTitle('Add user to ' + userAccessManagementStore.groupSelected.group_name)
      setmodalString(<AddUserToGroup />)
      setvisible(true)
    }

    const deleteUserSelected = (record) => {
      //waiting call api
    }

    const addUser = () => {
      //waiting call api
      setvisible(false)
    }

    const renderActionGroupUser = (record) => {
      if (record.status === '1') {
        return (
          <TcrbPopconfirm title="Sure to Delete?" onConfirm={() => deleteUserSelected(record)}>
            <a><DeleteOutlined style={{ fontSize: '18px', paddingRight: 8 }} /></a>
          </TcrbPopconfirm>
        )
      } else {
        return null
      }
    }
    return (
      <div>
        <Row gutter={[4, 24]}>
          <Col span={2}>
            <TcrbButton className="default" onClick={() => goBackGroupList()}>Back</TcrbButton>
          </Col>
        </Row>
        <Row gutter={[4, 24]}>
          <Col span={4}>Group Name</Col>
          <Col span={6}> {showEditGroup ?
            <SimpleInput defaultValue={userAccessManagementStore.groupSelected.name} onChange={(value) => name = value} /> : userAccessManagementStore.groupSelected.name
          }
          </Col>
        </Row>
        {showEditGroup ? <Row gutter={[4, 24]}>
          <Col span={4}>Role</Col>
          <Col span={6}>
            <Select
              style={{ width: '100%' }}
              placeholder="Please select"
              onChange={(value) => roleSelect = value}
              defaultValue={1} //waiting value from store
            >
              {roleList.map((item, index) => <Option key={index} value={item.id}>{item.role_name}</Option>)}
            </Select>
          </Col>
        </Row> :
          null
        }

        <Row justify="center" style={{ marginTop: 8 }}>
          <Col span={4}>
            {showEditGroup ?
              <Space size={8}>
                <TcrbButton className="default" onClick={() => { cancelEditGroup() }} >Cancel</TcrbButton>
                <TcrbButton className="primary" onClick={() => { submitEditGroup() }} >Submit</TcrbButton>
              </Space>
              :
              <TcrbButton className="primary" onClick={() => { setShowEditGroup(true) }} >Edit</TcrbButton>}
          </Col>
        </Row>
        <Divider />
        <Row gutter={[4, 24]}>
          <Col span={2}>
            <TcrbButton className="primary" onClick={() => openModalAddUser()} >Add User</TcrbButton>
          </Col>
        </Row>
        <Table
          bordered
          dataSource={userInGroupList}
          columns={columnUser}
          size="small"
        />
        <SimpleModal
          title={modalTitle}
          type={modalType}
          onOk={() => addUser()}
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

export default ManageGroup
