import React, { useState, useEffect } from 'react'
import { Table, Row, Col, Menu, Card, Input, Select, InputNumber, Divider, Button, Modal, Drawer, Form } from 'antd'
import { TcrbModal, TcrbSpin } from '../antd-styles/styles';
import { inject, observer } from 'mobx-react'

import SimpleInput from '../simple-input'
import { addKeyToDataSource } from '../data-utility';
const { Option } = Select;
const { TextArea } = Input

const FormModalProductOnboard = inject('productOnboardStore')
  (observer((props) => {
    const [accountOptionList, setAccountOptionList] = useState([])
    const [form] = Form.useForm();
    const { visible, onCreate, onCancel, productOnboardStore } = props
    useEffect(() => {
      if (visible === true) {

      }
    }, [visible])

    return (
      <TcrbModal
        visible={visible}
        title="Add New Product"
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
        <TcrbSpin spinning={productOnboardStore.apiFetching} size="large" tip="Loading..." >
          <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
          >
            <Row >
              <Col span={4} style={{ padding: 4 }}>
                <span>
                  Product Code
                </span>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="product_code"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Product Code!',
                    },
                    { max: 5, message: 'Product Code must be maximum 5 characters.' },
                  ]}
                >
                  <SimpleInput />
                </Form.Item>
              </Col>
            </Row>
            <Row >
              <Col span={4} style={{ padding: 4 }}>
                <span>
                  Product Name (TH)
                </span>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="product_name_thai"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Product Name(TH)!',
                    },
                  ]}
                >
                  <SimpleInput />
                </Form.Item>
              </Col>
              <Col span={4} style={{ paddingLeft: 16 }}>
                <span>
                  Product Name (EN)
                </span>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="product_name_english"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Product Name(EN)!',
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
                  Account Type
                </span>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="account_type"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Account Type!',
                    },
                  ]}
                >
                  <Select >
                    <Option value="L">L</Option>
                    <Option value="D">D</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={4} style={{ paddingLeft: 16 }}>
                <span>
                  Product Segment
                </span>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="product_segment"
                  rules={[
                    {
                      required: false,
                      message: 'Please input Product Segment!',
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
                  Description
                </span>
              </Col>
              <Col span={20}>
                <Form.Item
                  name="product_description"
                  rules={[
                    {
                      required: false,
                      message: 'Please input Join date',
                    },
                  ]}
                >
                  <TextArea style={{ width: '100%' }} />

                </Form.Item>
              </Col>
            </Row>
          </Form>
        </TcrbSpin>
      </TcrbModal>
    );
  }
  ))

export default FormModalProductOnboard
