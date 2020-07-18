import React, { useState, useEffect } from 'react'
import { Table, Row, Col, Menu, Card, Input, Select, InputNumber, Divider, Button, Modal, Drawer, Form, DatePicker, Space, Spin } from 'antd'
import { TcrbModal, TcrbSpin } from '../../antd-styles/styles';
import { inject, observer } from 'mobx-react'

import SimpleInput from '../../simple-input'
import tableProductReg from '../../partner-onboard/table-product-reg';
import { addKeyToDataSource } from '../../data-utility';
const { Option } = Select;

const FormModalUser = inject('userAccessManagementStore')
  (observer((props) => {
    const [supervisorList, setSupervisorList] = useState([])
    const [sectionList, setSectionList] = useState([])
    // const { userAccessManagementStore } = props
    const [form] = Form.useForm();
    const { visible, onCreate, onCancel, userAccessManagementStore } = props
    const dateFormat = 'YYYY-MM-DD'
    useEffect(() => {
      if (visible === true) {
        setSupervisorList([])
        getOptionSectionList()
      }
    }, [visible])

    useEffect(() => {
      if (userAccessManagementStore.optionSectionList.length >= 0) {
        addKeyToDataSource(userAccessManagementStore.optionSectionList).then(result => {
          setSectionList(result)
        })
      }
    }, [userAccessManagementStore.optionSectionList])

    useEffect(() => {
      if (userAccessManagementStore.supervisorList.length >= 0) {
        addKeyToDataSource(userAccessManagementStore.supervisorList).then(result => {
          setSupervisorList(result)
        })
      }
    }, [userAccessManagementStore.supervisorList])


    const getOptionSectionList = () => {
      userAccessManagementStore.getDataSectionList()
    }
    const testAddSupervisor = (sectionId) => {
      userAccessManagementStore.getDataSupervisor(sectionId)
    }
    return (
      <TcrbModal
        visible={visible}
        title="Add New User"
        okText="Submit"
        cancelText="Cancel"
        destroyOnClose={true}
        forceRender={true}
        onCancel={() => {
          onCancel()
          form.resetFields();
        }}
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
        <TcrbSpin spinning={userAccessManagementStore.apiFetching} size="large" tip="Loading..." >

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
                  name="username"
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
                      message: 'Please input Join date',
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
                      required: false,
                      message: 'Please input Last Working Date',
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
                      // required: true,
                      message: 'Please input Status!',
                    },
                  ]}
                >
                  <Select
                    style={{ width: '100' }}
                    placeholder="Please select"
                    onChange={(value) => (value)}
                  >
                    {/* {children} */}
                    <Option value="INACTIVE">INACTIVE</Option>
                    <Option value="ACTIVE">ACTIVE</Option>
                    <Option value="SUSPEND">SUSPEND</Option>
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
                      required: false,
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
          </Form>
        </TcrbSpin>
      </TcrbModal>
    );
  }
  ))

export default FormModalUser
