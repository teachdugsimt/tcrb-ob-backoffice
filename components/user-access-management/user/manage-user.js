import React, { useEffect, useState } from 'react'
import { Table, Row, Col, Menu, Card, Input, Select, Form, InputNumber, Divider, Button, Modal, Drawer, Space, DatePicker } from 'antd'
import { DeleteOutlined, EditOutlined, FormOutlined } from '@ant-design/icons';
import { inject, observer } from 'mobx-react'
import { orange, green, gold } from '@ant-design/colors';

import { TcrbButton, TcrbPopconfirm } from '../../antd-styles/styles'
import SimpleInput from '../../simple-input'
import SimpleModal from '../../simple-modal'
import { addKeyToDataSource, checkDefaultStatus } from '../../data-utility';
import userAccessManagement from '..';
import moment from 'moment';
import { toJS } from 'mobx';

const { Option } = Select;
let groupSelect = null
let dataEditUserProfile = null
const ManageUser = inject('userAccessManagementStore')
  (observer((props) => {
    const [viewEditUserDetail, setViewEditUserDetail] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [modalType, setModalType] = useState('')
    const [visible, setVisible] = useState(false)
    const [modalString, setModalString] = useState('')
    const [optionGroupList, setOptionGroupList] = useState([])
    const [supervisorList, setSupervisorList] = useState([])
    const [sectionList, setSectionList] = useState([])
    const [groupListInUser, setGroupListInUser] = useState([])
    const dateFormat = 'YYYY-MM-DD'

    const { userAccessManagementStore } = props
    const [form] = Form.useForm();

    useEffect(() => {
      userAccessManagementStore.getDataGroupOptionList()
      userAccessManagementStore.getDataSectionList()
      // console.log(toJS(userAccessManagementStore.userSelected))
      // mapKeyToGroupList(userAccessManagementStore.userSelected.map_user_groups)
    }, [])

    useEffect(() => {
      if (userAccessManagementStore.optionGroupList.length >= 0) {
        addKeyToDataSource(userAccessManagementStore.optionGroupList).then(result => {
          setOptionGroupList(result)
        })
      }
    }, [userAccessManagementStore.optionGroupList])

    useEffect(() => {
      if (userAccessManagementStore.supervisorList.length >= 0) {
        addKeyToDataSource(userAccessManagementStore.supervisorList).then(result => {
          setSupervisorList(result)
        })
      }
    }, [userAccessManagementStore.supervisorList])

    useEffect(() => {
      console.log(toJS(userAccessManagementStore.userSelected))
      if (Object.keys(userAccessManagementStore.userSelected).length === 0) {
        null
      } else {
        splitMapUserGroups(userAccessManagementStore.userSelected.map_user_groups)

      }
    }, [userAccessManagementStore.userSelected])

    const goBackToUserList = () => {
      userAccessManagementStore.nextPageIsManageUser = false
    }

    const getSupervisorList = (sectionId) => {
      userAccessManagementStore.getDataSupervisor(sectionId)
    }

    const splitMapUserGroups = (dataMapUserGroup) => {
      console.log(toJS(dataMapUserGroup))
      let newUserObject = []
      for (let index = 0; index < dataMapUserGroup.length; index++) {
        newUserObject.push({
          ...dataMapUserGroup[index],
          name: dataMapUserGroup[index].group.name,
          key: index
        })
      }
      setGroupListInUser(newUserObject)
      console.log(newUserObject)
    }

    const deactivateGroupSelect = (record) => {
      let request = {
        user_id: userAccessManagementStore.userSelected.id,
        group_id: record.id
      }
      userAccessManagementStore.submitDeleteGroupInUser(record)
    }
    const renderActionGroupInUser = (record) => {
      if (record.status == 'ACTIVE') {
        if (record.request_status == 'APPROVE' || record.request_status == 'REJECT') {
          return (
            <div style={{ textAlign: "center" }}>
              <TcrbPopconfirm title="Sure to Deactivate?" onConfirm={() => deactivateGroupSelect(record)}>
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
    const columnGroup = [
      {
        title: '',
        dataIndex: 'status',
        width: '5%',
        render: (text, record) => checkDefaultStatus(record.status, record.request_status)
      },
      {
        title: 'Group name',
        dataIndex: 'name',
        // render: (text, record) => (record.partner_code + "/" + record.partner_abbreviation)
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        width: '10%',
        render: (text, record) => renderActionGroupInUser(record)
      }
    ]

    const openModalSubmitEditUserProfile = (values) => {
      dataEditUserProfile = values
      setModalTitle('Confirm')
      setModalType('confirm')
      setModalString(
        <div style={{ textAlign: "center" }}>
          <p>Confirm to Change UserProfile.</p>
          <p style={{ color: orange[6] }}>Your changes will take effect after being approved.</p>
        </div>
      )
      setVisible(true)
    }

    const submitEditUser = () => {
      console.log(dataEditUserProfile)
      let request = {
        currentData: userAccessManagementStore.userSelected,
        newData: {
          ...dataEditUserProfile,
          join_date: moment(dataEditUserProfile.join_data).format('YYYY-MM-DD'),
          last_working_date: moment(dataEditUserProfile.last_working_date).format('YYYY-MM-DD')
        }
      }
      userAccessManagementStore.updateUser(request)
    }

    const FormEditUser = ({ onSubmitEditUser }) => {
      return (
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            'employee_code': userAccessManagementStore.userSelected.employee_code,
            'section_id': userAccessManagementStore.userSelected.section_id,
            'name': userAccessManagementStore.userSelected.name,
            'surname': userAccessManagementStore.userSelected.surname,
            'username': userAccessManagementStore.userSelected.name,
            'email': userAccessManagementStore.userSelected.name,
            'join_date': moment(userAccessManagementStore.userSelected.join_date),
            'last_working_date': moment(userAccessManagementStore.userSelected.last_working_date)
          }}
          onFinish={(values) => {
            onSubmitEditUser(values)
            form.resetFields()
          }}

        >

          <Row >
            <Col span={4} style={{ padding: 4 }}>
              <span>
                Employee ID
              </span>
            </Col>
            <Col span={8}>
              <Form.Item
                name="employee_code"
                rules={[
                  {
                    required: true,
                    message: 'Please input the title of collection!',
                  },
                ]}
              >
                <SimpleInput defaultValue={userAccessManagementStore.userSelected.employee_code} />
              </Form.Item>
            </Col>
            <Col span={4} style={{ paddingLeft: 16 }}>
              <span>
                Section
                </span>
            </Col>
            <Col span={8}>
              <Form.Item
                name="section_id"
                rules={[
                  {
                    required: true,
                    message: 'Please input Section!',
                  },
                ]}
              >
                <Select
                  style={{ width: '100%' }}
                  placeholder="Please select"
                  onChange={(value) => getSupervisorList(value)}
                  defaultValue={userAccessManagementStore.userSelected.section_id}
                >
                  {sectionList.map((item, index) => <Option key={index} value={item.id}>{item.name}</Option>)}
                  {/* {children} */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row >
            <Col span={4} style={{ padding: 4 }}>
              <span>
                Name
              </span>
            </Col>
            <Col span={8}>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input the title of collection!',
                  },
                ]}
              >
                <SimpleInput defaultValue={userAccessManagementStore.userSelected.name} />
              </Form.Item>
            </Col>
            <Col span={4} style={{ paddingLeft: 16 }}>
              <span>
                Surname
              </span>
            </Col>
            <Col span={8}>
              <Form.Item
                name="surname"
                rules={[
                  {
                    required: true,
                    message: 'Please input the title of collection!',
                  },
                ]}
              >
                <SimpleInput defaultValue={userAccessManagementStore.userSelected.surname} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={4} style={{ padding: 4 }}>
              <span>
                Username
              </span>
            </Col>
            <Col span={8}>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input the title of collection!',
                  },
                ]}
              >
                <SimpleInput defaultValue={userAccessManagementStore.userSelected.username} />
              </Form.Item>
            </Col>
            <Col span={4} style={{ paddingLeft: 16 }}>
              <span>
                Email
              </span>
            </Col>
            <Col span={8}>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input the title of collection!',
                  },
                ]}
              >
                <SimpleInput defaultValue={userAccessManagementStore.userSelected.email} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={4} style={{ padding: 4 }}>
              <span>
                Join Date
              </span>
            </Col>
            <Col span={8}>
              <Form.Item
                name="join_date"
                rules={[
                  {
                    required: false,
                    message: 'Please input the title of collection!',
                  },
                ]}
              >
                <DatePicker style={{ width: '100%' }} format={dateFormat} defaultValue={moment(userAccessManagementStore.userSelected.join_date, dateFormat)} />
              </Form.Item>
            </Col>
            <Col span={4} style={{ paddingLeft: 16 }}>
              <span>
                Last working date
              </span>
            </Col>
            <Col span={8}>
              <Form.Item
                name="last_working_date"
                rules={[
                  {
                    required: false,
                    message: 'Please input the title of collection!',
                  },
                ]}
              >
                <DatePicker style={{ width: '100%' }} format={dateFormat} defaultValue={moment(userAccessManagementStore.userSelected.last_working_date, dateFormat)} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={4} style={{ padding: 4 }}>
              <span>
                Status
              </span>
            </Col>
            <Col span={8}>
              <Form.Item
                name="user_status"
                rules={[
                  {
                    // required: true,
                    message: 'Please input the title of collection!',
                  },
                ]}
              >
                <Select
                  style={{ width: '100' }}
                  placeholder="Please select"
                  onChange={(value) => null}
                >
                  {/* {children} */}
                </Select>

              </Form.Item>
            </Col>
            <Col span={4} style={{ paddingLeft: 16 }}>
              <span>
                Supervisor
                </span>
            </Col>
            <Col span={8}>
              <Form.Item
                name="supervisor_id"
                rules={[
                  {
                    // required: true,
                    message: 'Please input Supervisor!',
                  },
                ]}
              >
                <Select
                  style={{ width: '100%' }}
                  placeholder="Please select"
                  onChange={(value) => null}
                >
                  {supervisorList.map((item, index) => <Option key={index} value={item.id}>{item.name}</Option>)}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end" style={{ marginTop: 8 }}>

            <Col span={4}>
              <Form.Item>
                <Space size={8}>

                  <TcrbButton className="default" onClick={() => { setViewEditUserDetail(false) }} >Cancel</TcrbButton>
                  <TcrbButton type="primary" htmlType="submit">
                    Submit
                </TcrbButton>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )
    }

    const FormShowUser = () => {
      return (
        <div>
          <Row gutter={[4, 24]}>
            <Col span={4}>Employee ID</Col>
            <Col span={6}> {userAccessManagementStore.userSelected.employee_id}</Col>
            <Col span={4}>Supervisor</Col>
            <Col span={6}> {userAccessManagementStore.userSelected.supervisor}</Col>
          </Row>
          <Row gutter={[4, 24]}>
            <Col span={4}>Name</Col>
            <Col span={6}> {userAccessManagementStore.userSelected.name}</Col>
            <Col span={4}>Surname</Col>
            <Col span={6}> {userAccessManagementStore.userSelected.surname}</Col>
          </Row>
          <Row gutter={[4, 24]}>
            <Col span={4}>Username</Col>
            <Col span={6}> {userAccessManagementStore.userSelected.username}</Col>
            <Col span={4}>E-mail</Col>
            <Col span={6}> {userAccessManagementStore.userSelected.email}</Col>
          </Row>
          <Row gutter={[4, 24]}>
            <Col span={4}>Status</Col>
            <Col span={6}> {userAccessManagementStore.userSelected.status}</Col>
            <Col span={4}>Section</Col>
            <Col span={6}> {userAccessManagementStore.userSelected.section}</Col>
          </Row>
          <Row justify="end" style={{ marginTop: 8 }}>
            <Col span={4}>
              <TcrbButton className="primary" onClick={() => { setViewEditUserDetail(true) }} >Edit</TcrbButton>
            </Col>
          </Row>
        </div>
      )
    }
    const FormAddGroup = () => {
      return (
        <div>
          <Row>
            <Col span={10} style={{ padding: 4 }}>
              <p>Group</p>
            </Col>
            <Col span={14}>
              <Select
                style={{ width: '100%' }}
                placeholder="Please select"
                onChange={(value) => group = value}
              >
                {optionGroupList.map((item, index) => <Option key={index} value={item.id}>{item.name}</Option>)}
              </Select>
            </Col>
          </Row>
        </div>
      )
    }
    const addGroupToUser = () => {
      groupSelect = null
      setModalTitle('Add Group to User')
      setModalType('confirm')
      setModalString(
        <Select
          style={{ width: '100%' }}
          placeholder="Please select"
          onChange={(value) => groupSelect = value}
        >
          {optionGroupList.map((item, index) => <Option key={index} value={item.id}>{item.name}</Option>)}
        </Select>
      )
      setVisible(true)
    }

    const addGroup = () => {
      console.log(groupSelect)
      let request = {
        user_id: userAccessManagementStore.userSelected.id,
        group_id: groupSelect
      }
      userAccessManagementStore.submitAddGroupToUser(request)
      setVisible(false)
    }


    return (
      <div>
        <Row gutter={[4, 24]}>
          <Col span={2}>
            <TcrbButton className="default" onClick={() => goBackToUserList()} >Back</TcrbButton>
          </Col>
        </Row>
        {viewEditUserDetail ? <FormEditUser onSubmitEditUser={openModalSubmitEditUserProfile} /> : <FormShowUser />}
        <Divider />
        <Row gutter={[4, 24]}>
          <Col span={2}>
            <TcrbButton className="primary" onClick={() => addGroupToUser()} >Add Group To User</TcrbButton>
          </Col>
        </Row>
        <Table
          bordered
          dataSource={groupListInUser}
          columns={columnGroup}
          size="small"
        />
        <SimpleModal
          title={modalTitle}
          type={modalType}
          onOk={() => {
            viewEditUserDetail ? submitEditUser() : addGroup()
          }}
          onCancel={() => setVisible(false)}
          textCancel={'Cancel'}
          textOk={'Submit'}
          width={600}
          modalString={modalString}
          visible={visible}
        />

      </div>
    )
  }))

export default ManageUser
