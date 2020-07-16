import React, { useState, useEffect } from 'react'
import { Table, Row, Col, Menu, Card, Input, Select, Form, InputNumber, Divider, Button, Modal, Drawer, Space } from 'antd'
import { DeleteOutlined, EditOutlined, FormOutlined } from '@ant-design/icons';
import { TcrbButton, TcrbPopconfirm } from '../../antd-styles/styles'
import { inject, observer } from 'mobx-react'

import SimpleInput from '../../simple-input'
import SimpleModal from '../../simple-modal'

import { checkDefaultStatus, addKeyToDataSource } from '../../data-utility'
import { toJS } from 'mobx';
import { get } from 'lodash'

const { Option } = Select;
let userSelect = {}
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
    const [modalString, setModalString] = useState("")
    const [modalType, setModalType] = useState('confirm')
    const [visible, setVisible] = useState(false)
    const [userInGroupList, setUserInGroupList] = useState([])
    const [optionUserList, setOptionUserList] = useState([])

    useEffect(() => {
      splitMapUserGroups(userAccessManagementStore.groupSelected.map_user_groups)
      userAccessManagementStore.getDataUserOptionList()
      userAccessManagementStore.getDataRoleOptionList()
    }, [])

    useEffect(() => {
      console.log(toJS(userAccessManagementStore.groupSelected))
      if (Object.keys(userAccessManagementStore.groupSelected).length === 0) {
        null
      } else {
        splitMapUserGroups(userAccessManagementStore.groupSelected.map_user_groups)

      }

    }, [userAccessManagementStore.groupSelected])

    useEffect(() => {
      if (userAccessManagementStore.optionUserList.length >= 0) {
        addKeyToDataSource(userAccessManagementStore.optionUserList).then(result => {
          setOptionUserList(result)
        })
      }
    }, [userAccessManagementStore.optionUserList])

    useEffect(() => {
      if (userAccessManagementStore.optionRoleList.length >= 0) {
        addKeyToDataSource(userAccessManagementStore.optionRoleList).then(result => {
          setRoleList(result)
        })
      }

    }, [userAccessManagementStore.optionRoleList])

    const addKeyToUserInGroup = (userInGroupList) => {
      addKeyToDataSource(userInGroupList).then(result => {
        setUserInGroupList(result)
      })
    }

    const splitMapUserGroups = (dataMapUserGroup) => {
      let newUserObject = []
      for (let index = 0; index < dataMapUserGroup.length; index++) {
        newUserObject.push({
          name: dataMapUserGroup[index].user_profile.name,
          surname: dataMapUserGroup[index].user_profile.surname,
          email: dataMapUserGroup[index].user_profile.email,
          key: index,
          ...dataMapUserGroup[index]
        })
      }
      setUserInGroupList(newUserObject)
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
        dataIndex: 'name',
        // render: (text, record) => (record.partner_code + "/" + record.partner_abbreviation)
      },
      {
        title: 'Last Name',
        dataIndex: 'surname',
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
            style={{ width: '100%' }}
            placeholder="Please select user"
            onChange={(value) => { userSelect = value }}
          // defaultValue="StfDB"
          >
            {optionUserList.map((item, index) => <Option key={index} value={item.id}>{item.name}</Option>)}
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
      setModalString(<AddUserToGroup />)
      setVisible(true)
    }

    const deleteUserSelected = (record) => {
      //waiting call api
      userAccessManagementStore.submitDeleteUserInGroup(record)
    }

    const addUser = () => {
      //waiting call api
      setVisible(false)
      let userObjectSelect = optionUserList.filter(item => item.id == userSelect)
      let request = {
        user_id: userObjectSelect[0].id,
        full_name: userObjectSelect[0].full_name,
        group_id: userAccessManagementStore.groupSelected.id,
        group_name: userAccessManagementStore.groupSelected.name,
      }
      console.log(request)
      userAccessManagementStore.submitAddUserToGroup(request)
      setVisible(false)
    }

    const renderActionGroupUser = (record) => {
      if (record.status == 'ACTIVE') {
        if (record.request_status == 'APPROVE' || record.request_status == 'REJECT') {
          return (
            <div style={{ textAlign: "center" }}>
              <TcrbPopconfirm title="Sure to Deactivate?" onConfirm={() => deleteUserSelected(record)}>
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
    return (
      <div>
        <Row gutter={[4, 24]}>
          <Col span={2}>
            <TcrbButton className="default" onClick={() => goBackGroupList()}>Back</TcrbButton>
          </Col>
        </Row>
        <Row gutter={[4, 24]}>
          <Col span={4} style={{ fontWeight: "bold" }}>Group Name</Col>
          <Col span={6}> {showEditGroup ?
            <SimpleInput defaultValue={userAccessManagementStore.groupSelected.name} onChange={(value) => name = value} /> : get(userAccessManagementStore, 'groupSelected.name', null)
          }
          </Col>
        </Row>
        <Row gutter={[4, 24]}>
          <Col span={4} style={{ fontWeight: "bold" }}>Role</Col>
          <Col span={6}>
            {showEditGroup ?
              <Select
                style={{ width: '100%' }}
                placeholder="Please select Role"
                onChange={(value) => roleSelect = value}
                defaultValue={userAccessManagementStore.groupSelected.role.name}
              >
                {roleList.map((item, index) => <Option key={index} value={item.id}>{item.name}</Option>)}
              </Select> : get(userAccessManagementStore, 'groupSelected.role.name', null)
            }
            {/* <Select
              style={{ width: '100%' }}
              placeholder="Please select Role"
              onChange={(value) => roleSelect = value}
              defaultValue={userAccessManagementStore.groupSelected.role.name}
            >
              {roleList.map((item, index) => <Option key={index} value={item.id}>{item.name}</Option>)}
            </Select> */}
          </Col>
        </Row>

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

export default ManageGroup
