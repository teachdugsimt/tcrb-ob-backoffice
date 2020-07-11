import React, { useState, useEffect, useMemo, memo } from 'react'
import { Table, Row, Col, Menu, Card, Input, Select, InputNumber, Divider, Button, Modal, Drawer, Form, DatePicker, Space } from 'antd'
import { TcrbButton, TcrbPopconfirm } from '../../antd-styles/styles'
import { inject, observer } from 'mobx-react'
import moment from 'moment';

import { checkDefaultStatus, addKeyToDataSource } from '../../data-utility'
import SimpleInput from '../../simple-input'
import SimpleModal from '../../simple-modal'
import FormModalUser from './form-modal-user';
import { toJS } from 'mobx';

const { Option } = Select;

const UserList = inject('userAccessManagementStore')
  (observer((props) => {
    const [visible, setVisible] = useState(false)
    const [userList, setUserList] = useState([])
    const [testSupervisor, setTestSupervisor] = useState([])
    const [modalTitle, setModalTitle] = useState("")
    const [textCancel, setTextCancel] = useState("Cancel")
    const [modalString, setModalString] = useState("")
    const [modalType, setModalType] = useState('confirm')
    const [modalFromVisible, setModalFromVisible] = useState(false)
    const [form] = Form.useForm();
    const { userAccessManagementStore } = props
    const dateFormat = 'YYYY-MM-DD'

    useEffect(() => {
      userAccessManagementStore.getDataUser()
    }, [])

    useEffect(() => {
      if (userAccessManagementStore.userList.length >= 0) {
        addKeyToDataSource(userAccessManagementStore.userList).then(result => {
          setUserList(result)
        })
      }
    }, [userAccessManagementStore.userList])

    const testAddSupervisor = (id) => {
      setTestSupervisor([
        { id: 0, name: 'sup_1' },
        { id: 1, name: 'sup_2' },
        { id: 2, name: 'sup_3' },
        { id: 3, name: 'sup_4' },
        { id: 4, name: 'sup_5' },

      ])
    }

    // const MemoModalCreateForm = useMemo((visible, onCreate, onCancel, testSupervisor) => CollectionCreateForm)
    const CollectionCreateForm = ({ visible, onCreate, onCancel, testSupervisor }) => {
      return (
        <Modal
          visible={visible}
          title="Add new User"
          okText="Submit"
          cancelText="Cancel"
          onCancel={onCancel}
          width={900}
          onOk={() => {
            form
              .validateFields()
              .then(values => {
                form.resetFields();
                onCreate(values);
              })
              .catch(info => {
                console.log('Validate Failed:', info);
              });
          }}
        >
          <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            initialValues={{
              modifier: 'public',
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
                      message: 'Please input Employee Id!',
                    },
                  ]}
                >
                  <SimpleInput />
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
                      required: true,
                      message: 'Please input Supervisor!',
                    },
                  ]}
                >
                  <Select
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={(value) => null}
                  >
                    {/* {testSupervisor.map((item, index) => <Option key={index} value={item.id}>{item.name}</Option>)} */}
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
                      message: 'Please input Name!',
                    },
                  ]}
                >
                  <SimpleInput />
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
                      message: 'Please input Surname!',
                    },
                  ]}
                >
                  <SimpleInput />
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
                  name="user_name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Username!',
                    },
                  ]}
                >
                  <SimpleInput />
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
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input Email!',
                    },
                  ]}
                >
                  <SimpleInput />
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
                      required: true,
                      message: 'Please input the title of collection!',
                    },
                  ]}
                >
                  <DatePicker style={{ width: '100%' }} format={dateFormat} />

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
                      required: true,
                      message: 'Please input the title of collection!',
                    },
                  ]}
                >
                  <DatePicker style={{ width: '100%' }} format={dateFormat} />
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
                  name="status"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Status!',
                    },
                  ]}
                >
                  <Select
                    style={{ width: '100' }}
                    placeholder="Please select"
                    onChange={(value) => testAddSupervisor(value)}
                  >
                    {/* {children} */}

                  </Select>

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
                    onChange={(value) => testAddSupervisor(value)}
                  >
                    <Option value="1">option1</Option>
                    {/* {children} */}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      );
    }

    const onCreate = values => {
      console.log('Received values of form: ', values);
      let request = {
        ...values,
        join_date: moment(values.join_data).format('YYYY-MM-DD'),
        last_working_date: moment(values.last_working_date).format('YYYY-MM-DD')
      }
      console.log(request)
      userAccessManagementStore.submitAddNewUser(request)
      setVisible(false);
    }

    const viewUserDetail = (record) => {
      userAccessManagementStore.userSelected = record
      userAccessManagementStore.nextPageIsManageUser = true
    }

    const selectGroup = (record) => {
      console.log(toJS(record))
      let newUserObject = []
      let groupList = record.map_user_groups.length
      for (let index = 0; index < groupList; index++) {
        newUserObject.push({
          name: record.map_user_groups[index].group.name,
          ...record.map_user_groups[index]
        })
      }
      setModalType('')
      setModalTitle('Group in User')

      addKeyToDataSource(newUserObject).then(result => {
        setModalString(
          <div>
            <Table
              bordered
              dataSource={result}
              columns={columnGroup}
              size="small"
            />
          </div>
        )
      })
      setVisible(true)
    }

    const renderActionUser = (record) => {
      if (record.request_status == 'APPROVE') {
        return (
          <div style={{ textAlign: "center" }}>
            <a onClick={() => viewUserDetail(record)} style={{ marginRight: 8, color: '#FBA928' }}>
              Edit
          </a>
            <TcrbPopconfirm title="Sure to Deactivate?" >
              <a style={{ color: '#FBA928' }}>Deactivate</a>
            </TcrbPopconfirm>
          </div>
        )
      } else if (record.request_status == 'PENDING') {
        return null
      } else {
        return null
      }
    }

    const renderGroup = (record) => {
      // console.log(toJS(record.map_user_groups.length))
      let lengthGroup = record.map_user_groups.length
      if (record.map_user_groups.length <= 0) {
        return (
          <span>0 Groups</span>
        )
      } else {
        return (
          <div>
            <a onClick={() => selectGroup(record)}>{record.map_user_groups.length} Groups</a>
          </div>
        )
      }
    }

    const columnUser = [
      {
        title: '',
        dataIndex: 'status',
        width: '5%',
        render: (text, record) => checkDefaultStatus(record.status, record.request_status)
      },
      {
        title: 'Username',
        dataIndex: 'username',
        editable: true,
        // render: (text, record) => (record.partner_code + "/" + record.partner_abbreviation)
      },
      {
        title: 'Name',
        dataIndex: 'name',
        // render: (text, record) => renderSection(record)
      },
      {
        title: 'Surname',
        dataIndex: 'surname',
        // render: (text, record) => renderSection(record)
      },
      {
        title: 'Supervisor',
        dataIndex: 'supervisor',
        // render: (text, record) => renderSection(record)
      },
      {
        title: 'Department',
        dataIndex: 'department',
        // render: (text, record) => renderSection(record)
      },
      {
        title: 'Groups',
        dataIndex: 'map_user_groups',
        render: (text, record) => renderGroup(record)
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        width: '10%',
        render: (text, record) => renderActionUser(record)
      }
    ]

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
        render: (text, record) => record.name
      }
    ]


    return (
      <div>
        <Row gutter={[4, 24]}>
          <Col span={2}>
            <TcrbButton className="primary" onClick={() => setModalFromVisible(true)} >Add User</TcrbButton>
          </Col>
        </Row>
        <Table
          bordered
          dataSource={userList}
          columns={columnUser}
          size="small"
        />
        {/* <CollectionCreateForm
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
        /> */}
        <FormModalUser
          visible={modalFromVisible}
          onCreate={onCreate}
          onCancel={() => {
            setModalFromVisible(false);
          }}
        />
        <SimpleModal
          title={modalTitle}
          type={modalType}
          onCancel={() => setVisible(false)}
          textCancel={textCancel}
          width={600}
          modalString={modalString}
          visible={visible}
        />
        {/* <MemoModalCreateForm
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
          testSupervisor={testSupervisor}
        /> */}
      </div>
    )
  }))

export default UserList
