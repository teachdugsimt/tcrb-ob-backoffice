import React, { useState, useEffect } from 'react'
import { Table, Row, Col, Menu, Card, Input, Select, InputNumber, Divider, Button, Modal, Drawer, Form, DatePicker, Space } from 'antd'
import { TcrbButton, TcrbPopconfirm } from '../../antd-styles/styles'
import { inject, observer } from 'mobx-react'

import { checkDefaultStatus } from '../../data-utility'
import SimpleInput from '../../simple-input'

const { Option } = Select;

const UserList = inject('userAccessManagementStore')
  (observer((props) => {
    const [visible, setVisible] = useState(false)
    const [mockDataUser, setMockDataUser] = useState([])
    const [form] = Form.useForm();
    const { userAccessManagementStore } = props

    useEffect(() => {
      setMockDataUser(testAddUser())
    }, [])
    const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
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
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: 'Please input the title of collection!',
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
                  name="supervisor"
                  rules={[
                    {
                      required: true,
                      message: 'Please input the title of collection!',
                    },
                  ]}
                >
                  <Select
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={(value) => null}
                  >
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
                      message: 'Please input the title of collection!',
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
                  name="Username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input the title of collection!',
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
                      message: 'Please input the title of collection!',
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
                  name="jonDate"
                  rules={[
                    {
                      required: true,
                      message: 'Please input the title of collection!',
                    },
                  ]}
                >
                  <DatePicker style={{ width: '100%' }} />

                </Form.Item>
              </Col>
              <Col span={4} style={{ paddingLeft: 16 }}>
                <span>
                  Last working date
              </span>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="lastWorkingDate"
                  rules={[
                    {
                      required: true,
                      message: 'Please input the title of collection!',
                    },
                  ]}
                >
                  <DatePicker style={{ width: '100%' }} />
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
                  Section
              </span>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="section"
                  rules={[
                    {
                      required: true,
                      message: 'Please input the title of collection!',
                    },
                  ]}
                >
                  <Select
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={(value) => null}
                  >
                    {/* {children} */}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      );
    }

    const testAddUser = () => {
      let newUser = []
      for (let index = 1; index < 6; index++) {
        newUser.push(
          {
            id: index,
            key: index,
            username: "Username_" + index,
            name: 'name' + index,
            surname: 'Surname' + index,
            supervisor: 'Supervisor' + index,
            department: 'Department' + index,
            groups: 3,
            request_status: 'APPROVE'
          }
        )
      }
      return newUser
    }
    const onCreate = values => {
      console.log('Received values of form: ', values);
      setVisible(false);
    }

    const viewUserDetail = (record) => {
      userAccessManagementStore.userSelected = record
      userAccessManagementStore.nextPageIsManageUser = true
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

    const columnUser = [
      {
        title: '',
        dataIndex: 'status',
        width: '5%',
        render: (text, record) => checkDefaultStatus(record.request_status)
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
        dataIndex: 'groups',
        // render: (text, record) => renderSection(record)
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        width: '10%',
        render: (text, record) => renderActionUser(record)
      }
    ]


    return (
      <div>
        <Row gutter={[4, 24]}>
          <Col span={2}>
            <TcrbButton className="primary" onClick={() => setVisible(true)} >Add User</TcrbButton>
          </Col>
        </Row>
        <Table
          bordered
          dataSource={mockDataUser}
          columns={columnUser}
          size="small"
        />
        <CollectionCreateForm
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
        />
      </div>
    )
  }))

export default UserList
