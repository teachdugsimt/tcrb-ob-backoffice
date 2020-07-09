import React, { useEffect, useState } from 'react'
import { Table, Row, Col, Menu, Card, Input, Select, Form, InputNumber, Divider, Button, Modal, Drawer, Space } from 'antd'
import { DeleteOutlined, EditOutlined, FormOutlined } from '@ant-design/icons';
import { inject, observer } from 'mobx-react'

import { TcrbButton, TcrbPopconfirm } from '../../antd-styles/styles'
import SimpleInput from '../../simple-input'
import SimpleModal from '../../simple-modal'

const { Option } = Select;

const ManageUser = inject('userAccessManagementStore')
  (observer((props) => {
    const [viewEditUserDetail, setViewEditUserDetail] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [modalType, setModalType] = useState('')
    const [visible, setVisiable] = useState(false)
    const [modalString, setModalString] = useState('')
    const { userAccessManagementStore } = props
    const [form] = Form.useForm();

    const goBackToUserList = () => {
      userAccessManagementStore.nextPageIsManageUser = false
    }

    const columnGroup = [
      {
        title: '',
        dataIndex: 'status',
        width: '5%',
        render: (text, record) => checkDefaultStatus(text)
      },
      {
        title: 'Group name',
        dataIndex: 'group_name',
        // render: (text, record) => (record.partner_code + "/" + record.partner_abbreviation)
      },
      {
        title: 'Role Name',
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
    const FormEditUser = () => {
      return (
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            'title': 'public',
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
                <SimpleInput defaultValue={'s'} />
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
                {/* <DatePicker style={{ width: '100%' }} /> */}

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
                {/* <DatePicker style={{ width: '100%' }} /> */}
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
                onChange={(value) => roleSelect = value}
              >
                {/* {roleList.map((item, index) => <Option key={index} value={item.id}>{item.role_name}</Option>)} */}
              </Select>
            </Col>
          </Row>
        </div>
      )
    }
    const addGroupToUser = () => {
      setModalTitle('Add Group to User')
      setModalType('confirm')
      setModalString(
        <Select
          style={{ width: '100%' }}
          placeholder="Please select"
          onChange={(value) => roleSelect = value}
        >
          {/* {roleList.map((item, index) => <Option key={index} value={item.id}>{item.role_name}</Option>)} */}
        </Select>
      )
      setVisiable(true)
    }

    const addGroup = () => {
      setVisiable(false)
    }

    return (
      <div>
        <Row gutter={[4, 24]}>
          <Col span={2}>
            <TcrbButton className="default" onClick={() => goBackToUserList()} >Back</TcrbButton>
          </Col>
        </Row>
        {viewEditUserDetail ? <FormEditUser /> : <FormShowUser />}
        <Divider />
        <Row gutter={[4, 24]}>
          <Col span={2}>
            <TcrbButton className="primary" onClick={() => addGroupToUser()} >Add Group To User</TcrbButton>
          </Col>
        </Row>
        <Table
          bordered
          dataSource={[]}
          columns={columnGroup}
          size="small"
        />
        <SimpleModal
          title={modalTitle}
          type={modalType}
          onOk={() => addGroup()}
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
