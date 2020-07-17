import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import { orange, green, gold } from '@ant-design/colors';

import { get } from 'lodash'
import { Button, Row, Col, PageHeader, Table, Select, Form, Input, Space } from 'antd'
import { TcrbButton } from '../antd-styles/styles'
import SimpleModal from '../simple-modal'
import { addKeyToDataSource } from '../data-utility'
import { productServiceColumn } from './table-column'
import { toJS } from 'mobx'
import SimpleInput from '../simple-input'

const { Option } = Select
const { TextArea } = Input
let serviceSelect = null
let dataEditProduct = null
const ManageProduct =
  inject('productOnboardStore')
    (observer((props) => {
      const [isEditProduct, setIsEditProduct] = useState(false)
      const [modalTitle, setModalTitle] = useState('')
      const [modalType, setModalType] = useState('')
      const [visible, setVisible] = useState(false)
      const [modalString, setModalString] = useState('')
      const [optionServiceList, setOptionServiceList] = useState([])
      const [dataSourceProductServiceList, setDataSourceProductServiceList] = useState([])
      const [form] = Form.useForm();

      const { productOnboardStore } = props

      useEffect(() => {
        productOnboardStore.getDataOptionServiceList()
        productOnboardStore.getDataProductServiceList(productOnboardStore.productDetailSelected.product_code)
      }, [])

      useEffect(() => {
        if (productOnboardStore.optionServiceList.length >= 0) {
          addKeyToDataSource(productOnboardStore.optionServiceList).then(result => {
            setOptionServiceList(result)
          })
        }
      }, [productOnboardStore.optionServiceList])

      useEffect(() => {
        if (productOnboardStore.productServiceList.length >= 0) {
          addKeyToDataSource(productOnboardStore.productServiceList).then(result => {
            setDataSourceProductServiceList(result)
          })
        }
      }, [productOnboardStore.productServiceList])

      const goBackToProductList = () => {
        productOnboardStore.nextPageIsManageProductOnBoard = false
      }

      const FormSelectOptionService = () => {
        return (
          <div>
            <Select
              style={{ width: '100%' }}
              placeholder="Please select user"
              onChange={(value) => { serviceSelect = value }}
            // defaultValue="StfDB"
            >
              {optionServiceList.map((item, index) => <Option key={index} value={item.id}>{item.name}</Option>)}
            </Select>
          </div>
        )
      }

      const FormViewDetailProductOnBoard = () => {
        return (
          <div>
            <Row>
              <Col span={6} style={{ fontWeight: "bold" }}>Product Code</Col>
              <Col span={6}><p>{get(productOnboardStore.productDetailSelected, 'product_code', null)}</p></Col>
            </Row>
            <Row>
              <Col span={6} style={{ fontWeight: "bold" }}>Product Name(TH)</Col>
              <Col span={6}><p>{get(productOnboardStore.productDetailSelected, 'product_name_thai', null)}</p></Col>
              <Col span={6} style={{ fontWeight: "bold" }}>Product Name(EN)</Col>
              <Col span={6}><p>{get(productOnboardStore.productDetailSelected, 'product_name_english', null)}</p></Col>
            </Row>
            <Row>
              <Col span={6} style={{ fontWeight: "bold" }}>Account Type</Col>
              <Col span={6}><p>{get(productOnboardStore.productDetailSelected, 'account_type', null)}</p></Col>
              <Col span={6} style={{ fontWeight: "bold" }}>Product Segment</Col>
              <Col span={6}><p>{get(productOnboardStore.productDetailSelected, 'product_segment', null)}</p></Col>
            </Row>
            <Row>
              <Col span={6} style={{ fontWeight: "bold" }}>Description</Col>
              <Col span={18}><p>{get(productOnboardStore.productDetailSelected, 'product_description', null)}</p></Col>
            </Row>
            <Row gutter={[4, 24]} justify="end">
              <Col span={2}>
                <TcrbButton className="primary" onClick={() => setIsEditProduct(true)} >Edit</TcrbButton>
              </Col>
            </Row>
          </div>
        )
      }

      const FormEditProductOnBoard = ({ onSubmitEditProduct }) => {
        return (
          <Form
            form={form}
            layout="vertical"
            name="form_edit_product"
            initialValues={{
              'product_code': productOnboardStore.productDetailSelected.product_code,
              'product_name_thai': productOnboardStore.productDetailSelected.product_name_thai,
              'product_name_english': productOnboardStore.productDetailSelected.product_name_english,
              'account_type': productOnboardStore.productDetailSelected.account_type,
              'product_segment': productOnboardStore.productDetailSelected.product_segment,
              'product_description': productOnboardStore.productDetailSelected.product_description,
            }}
            onFinish={(values) => {
              onSubmitEditProduct(values)
              form.resetFields()
            }}

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
                  <SimpleInput defaultValue={productOnboardStore.productDetailSelected.product_code} />
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
                  <SimpleInput defaultValue={productOnboardStore.productDetailSelected.product_name_thai} />
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
                  <SimpleInput defaultValue={productOnboardStore.productDetailSelected.product_name_english} />
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
                  <SimpleInput defaultValue={productOnboardStore.productDetailSelected.product_segment} />
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
            <Row justify="end" style={{ marginTop: 8 }}>

              <Col span={4}>
                <Form.Item>
                  <Space size={8}>

                    <TcrbButton className="default" onClick={() => { setIsEditProduct(false) }} >Cancel</TcrbButton>
                    <TcrbButton type="primary" htmlType="submit">
                      Submit
                </TcrbButton>
                  </Space>
                </Form.Item>
              </Col>
            </Row>

          </Form>)
      }

      const openModalSubmitEditProductOnBoard = (values) => {
        dataEditProduct = values
        setModalTitle('Confirm')
        setModalType('confirm')
        setModalString(
          <div style={{ textAlign: "center" }}>
            <p>Confirm to Change Product.</p>
            <p style={{ color: orange[6] }}>Your changes will take effect after being approved.</p>
          </div>
        )
        setVisible(true)
      }

      const submitEditProduct = () => {
        setVisible(false)
        setIsEditProduct(false)
        let request = {
          currentData: productOnboardStore.productDetailSelected,
          newData: {
            ...dataEditProduct,
            id: productOnboardStore.productDetailSelected.id
          }
        }
        console.log(request)
        productOnboardStore.submitUpdateProductDetail(request)
      }

      const submitGrantService = () => {
        let newObjectProductServiceSelected = optionServiceList.filter(item => item.id == serviceSelect)
        let request = {
          product_code: productOnboardStore.productDetailSelected.product_code,
          product_name: productOnboardStore.productDetailSelected.product_name_thai,
          service_id: newObjectProductServiceSelected[0].id,
          service_name: newObjectProductServiceSelected[0].name
        }
        productOnboardStore.submitGrantService(request)
        setVisible(false)
      }

      const openModalGrantService = () => {
        setModalTitle('Select Service')
        setModalType('confirm')
        setModalString(<FormSelectOptionService />)
        setVisible(true)
      }

      const deactivateServiceSelected = (record) => {
        let request = {
          id: record.id,
          service_id: record.service_id,
          service_name: record.service_name,
          product_code: productOnboardStore.productDetailSelected.product_code,
          product_name_thai: productOnboardStore.productDetailSelected.product_name_thai
        }
        productOnboardStore.submitDeactivateService(request)
        //console.log(request)
      }
      return (
        <div>
          <Row>
            <Col>
              <PageHeader title="Manage Product Onboarding" />
            </Col>
          </Row>
          <Row gutter={[4, 24]}>
            <Col span={2}>
              <TcrbButton className="default" onClick={() => goBackToProductList()} >Back</TcrbButton>
            </Col>
          </Row>
          {isEditProduct ? <FormEditProductOnBoard onSubmitEditProduct={openModalSubmitEditProductOnBoard} /> : <FormViewDetailProductOnBoard />}
          <Row>
            <Col>
              <PageHeader title="Grant Services" />
            </Col>
          </Row>
          <Row gutter={[4, 24]}>
            <Col span={2}>
              <TcrbButton className="primary" onClick={() => openModalGrantService()} >Add</TcrbButton>
            </Col>
          </Row>
          <Row>
            <Col flex={100}>
              <Table
                columns={productServiceColumn(deactivateServiceSelected)}
                dataSource={dataSourceProductServiceList}
                size="small"
              />
            </Col>
          </Row>
          <SimpleModal
            title={modalTitle}
            type={modalType}
            onOk={() => {
              isEditProduct ? submitEditProduct() : submitGrantService()
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
    }
    ))

export default ManageProduct
