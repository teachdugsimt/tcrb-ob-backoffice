import React, { useState, useEffect, createRef } from 'react'
import { Button, Table, Popconfirm, Row, Col, Menu, Card, Input, Select, Form, InputNumber } from 'antd'
import { inject, observer } from 'mobx-react'
import { withTranslation } from '../../i18n'
import styled from 'styled-components'
import { toJS } from 'mobx'
import SimpleMenu from '../simple-menu'
import SimpleInput from '../simple-input'
import SimpleModal from '../simple-modal'

const { Option } = Select;

const ProductLimitSetup =
  inject('businessParametersSetupStore')
    (observer((props) => {
      const [dataSource, setDataSource] = useState([])
      const [viewDetailProduct, setViewDetailProduct] = useState(false)
      const [visible, setVisble] = useState(false)
      const [modalString, setModalString] = useState('')
      const [showLimitPartner, setShowLimitPartner] = useState(false)
      const [editingKey, setEditingKey] = useState('')
      const [titleModal, setTitleModal] = useState('')
      const [modalType, setModalType] = useState('')
      const [selectPartnerAndProduct, setSelectPartnerAndProduct] = useState({})
      const [channelPartnerList, setChannelPartnerList] = useState([])
      const { businessParametersSetupStore, t } = props
      const [form] = Form.useForm();
      var txnLimit, dailyLimit = ''
      // var selectPartnerAndProduct = {}


      const isEditing = record => record.key === editingKey;
      const edit = record => {
        form.setFieldsValue({
          name: '',
          age: '',
          address: '',
          ...record,
        });
        setEditingKey(record.key);
      };

      const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
      }) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
        return (
          <td {...restProps}>
            {editing ? (

              <Form.Item
                name={dataIndex}
                style={{
                  margin: 0,
                }}
              >
                {dataIndex == 'product_type' ? (
                  <Select
                    style={{ width: '100%' }}
                  >
                    {channelPartnerList.map((item, index) => <Option key={index} value={item.product_type}>{item.partner_code}</Option>)}
                  </Select>) : (
                    <>
                      {inputNode}
                    </>
                  )}
              </Form.Item>
            ) : (
                children
              )}
          </td>
        );
      };
      useEffect(() => {
        // setDataSource(mockDataSource)
        businessParametersSetupStore.getDataProductLimit()

      }, []);

      useEffect(() => {
        if (businessParametersSetupStore.productLimit.length > 0) {
          addKeyToDataSource(businessParametersSetupStore.productLimit).then((result) => {
            businessParametersSetupStore.arrayProductLimit = result
            setDataSource(result)
          })
        }
      }, [businessParametersSetupStore.productLimit])

      useEffect(() => {
        //if(businessParametersSetupStore.productLimitDetail)
        console.log(toJS(businessParametersSetupStore.productLimitDetail))
        if (businessParametersSetupStore.productLimitDetail != null) {
          setViewDetailProduct(true)
        }
      }, [businessParametersSetupStore.productLimitDetail])

      useEffect(() => {
        if (businessParametersSetupStore.channelPartnerList.length > 1) {
          setChannelPartnerList(businessParametersSetupStore.channelPartnerList)
        }
      }, [businessParametersSetupStore.channelPartnerList])


      const handleDelete = key => {
        // const dataSource = [...this.state.dataSource];
        // setDataSource(dataSource.filter(item => item.key !== key))
        console.log(key)

      };

      const addKeyToDataSource = (arrayDataSource) => {
        let newDataSource = arrayDataSource
        for (let index = 0; index < newDataSource.length; index++) {
          newDataSource[index].key = index + 1;
        }
        return new Promise((resolve) => {
          resolve(newDataSource)
        })
      }

      const convertToArrayOptionSelect = (arrayObject) => {
        let result = arrayObject.map(partnerList => [partnerList.partner_code, partnerList.partner_code + '/' + partnerList.partner_abbreviation]);
        return new Promise((resolve) => resolve(result))
      }

      const submitChangeLimit = () => {
        // txnLimit, dailyLimit
        // call api
      }

      const submitChangeProductLimitSelect = () => {
        //call api
        setVisble(true)
        setTitleModal('Confirm')
        setModalType("confirm")
        setModalString(
          <div style={{ textAlign: "center" }}>
            <p> Change Product Code {selectPartnerAndProduct.partner_code} Limit </p>
            <p>for {selectPartnerAndProduct.partner_code}/{selectPartnerAndProduct.partner_abbreviation} Channel/Partner !!!</p>
          </div>
        )
      }

      const selectPartnerChanel = (value) => {
        let productSelectObject = channelPartnerList.filter(item => item.partner_code == value)
        setSelectPartnerAndProduct(productSelectObject[0])
        //partner_code, product_code
        setShowLimitPartner(true)
      }

      const selectProductToViewDetail = (rowSelected) => {
        //call api to get Detail Product

        businessParametersSetupStore.getDataDetailProductLimit(rowSelected.product_code)
        businessParametersSetupStore.getDataChannelPartnerList()
        // setViewDetailProduct(true)
      }

      const addRowProductList = () => {
        // console.log(toJS(businessParametersSetupStore.arrayProductLimit))
        let newProduct = {
          created_by: "system",
          created_on: "2020-06-15T13:09:48.000Z",
          daily_limit: "1000000",
          id: 7,
          partner_code: "",
          product_code: "00006" + dataSource.length,
          product_description: "Test Program - High LTV ดอกเบี้ยพิเศษ 9.99%",
          product_type: "NG",
          request_status: "0",
          status: "1",
          terminated_by: null,
          terminated_on: null,
          transaction_code: "6619",
          transaction_limit: "1000000",
          updated_by: null,
          updated_on: null,
          key: dataSource.length + 1
        }
        setDataSource([...dataSource, newProduct])
        edit(newProduct)
        businessParametersSetupStore.arrayProductLimit = dataSource
      }
      const goBackProductList = () => {
        setViewDetailProduct(false)
      }
      const submitAddnewProduct = (record) => {
        // Call api to update record status
        console.log(record)
        dataSource.map(detailDataSource => {
          if (detailDataSource.key === record.key) {
            record.status = 2
          }
        })
        setEditingKey('')
      }

      const submitDeleteProduct = (record) => {
        //call api to update record status
        dataSource.map(detailDataSource => {
          if (detailDataSource.key === record.key) {
            record.status = 2
          }
        })
        businessParametersSetupStore.deleteProductLimit(record)
        //setDataSource() //<<waiting result api and  add key index
      }
      const renderOnclickHandler = (text, record) => {
        return <p onClick={() => selectProductToViewDetail(record)}>{text}</p>
      }
      const renderActionAddDeleteHandler = (record, index) => {
        if (index + 1 <= businessParametersSetupStore.arrayProductLimit.length) {
          return <Popconfirm title="Sure to delete?" onConfirm={(e) => { submitDeleteProduct(record) }} >
            <a>Delete</a>
          </Popconfirm>
        } else if (record.status === 2) {
          return null
        } else {
          return <Popconfirm title={"Confirm to add " + record.product_type + record.product_description + "!!!"} onConfirm={() => { submitAddnewProduct(record) }} >
            <a>confirm</a>
          </Popconfirm>
        }
      }
      const columns = [
        {
          dataIndex: 'operation',
          render: (text, record, index) =>
            renderActionAddDeleteHandler(record, index)
        },
        {
          title: 'Product_Code',
          dataIndex: 'product_type',
          width: '10%',
          editable: true,
        },
        {
          title: 'Product_Description',
          dataIndex: 'product_description',
          editable: true,
          render: (text, record) => renderOnclickHandler(text, record)
        },
        {
          title: 'All-Channel Txn Limit',
          dataIndex: 'TxnLimit',
          editable: true,
          render: (text, record) => renderOnclickHandler(text, record)
        },
        {
          title: 'All-Channel Daily Limit',
          dataIndex: 'daily_limit',
          editable: true,
          render: (text, record) => renderOnclickHandler(text, record)
        },
        {
          title: 'Specific Channel Limit',
          dataIndex: 'Specific',
          editable: true,
          render: (text, record) => renderOnclickHandler(text, record)

        },
      ];

      const mergedColumns = columns.map(col => {
        if (!col.editable) {
          return col;
        }

        return {
          ...col,
          onCell: record => ({
            record,
            inputType: col.dataIndex === 'product_description' ? 'text' : 'number',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
          }),
        };
      });


      const detailProduct = () => {
        return (
          <div>
            <Card style={{ padding: 8 }}>
              <Row gutter={[4, 24]}>
                <Col span={6}>Product_Code</Col>
                <Col span={12}>{businessParametersSetupStore.productLimitDetail.product_type}</Col>
              </Row>
              <Row gutter={[4, 24]}>
                <Col span={6}>Product_Description</Col>
                <Col span={12}>{businessParametersSetupStore.productLimitDetail.product_description}</Col>
              </Row>
            </Card>
            <Card>
              <Row gutter={[4, 24]}>
                <Col span={6}>All-Channel Txn Limit</Col>
                <Col span={12}>{businessParametersSetupStore.productLimitDetail.transaction_limit}</Col>
              </Row>
              <Row gutter={[4, 24]}>
                <Col span={6}>All-Channel Daily Limit</Col>
                <Col span={12}>{businessParametersSetupStore.productLimitDetail.daily_limit}</Col>
              </Row>
            </Card>
            <Card>
              <Row gutter={[4, 24]}>
                <Col span={6}>Channel/Partner</Col>
                <Col span={12} flex={100}>
                  {/* <SimpleMenu options={optionList} onChange={(e) => { selectPartnerChanel(e) }} /> */}
                  <Select
                    onChange={(value) => selectPartnerChanel(value)}
                    style={{ width: '100%' }}
                  >
                    {channelPartnerList.map((item, index) => <Option key={index} value={item.partner_code}>{item.partner_code}/{item.partner_abbreviation}</Option>)}
                  </Select>
                </Col>
              </Row>
              {(showLimitPartner) ? (
                <>
                  <Row>
                    <Col span={6}>
                      <SimpleInput readOnly={false} defaultValue={null} prefix={'Txn Limit'} onChange={(e) => { txnLimit = e }} />
                    </Col>
                    <Col span={2}>
                      <p style={{ paddingTop: 4 }}>THB</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6}>
                      <SimpleInput readOnly={false} defaultValue={null} prefix={'Daily Limit'} onChange={(e) => { dailyLimit = e }} />
                    </Col>
                    <Col span={2}>
                      <p style={{ paddingTop: 4 }}>THB</p>
                    </Col>
                  </Row>

                </>
              ) : ('')}

            </Card>
            <Row justify="center" style={{ marginTop: 8 }}>
              <Col span={2}>
                <Button onClick={() => goBackProductList()} shape="round">Back</Button>
              </Col>
              <Col span={2}>
                <Button shape="round" type="primary" onClick={() => { submitChangeProductLimitSelect() }}>Submit</Button>
              </Col>
            </Row>
            <SimpleModal
              title={titleModal}
              type={modalType}
              onOk={() => unlockOTP()}
              onCancel={() => setVisble(false)}
              textOk={t("confirm")}
              textCancel={t("cancel")}
              modalString={modalString}
              visible={visible}
            />
          </div>
        )
      }

      const productList = () => {
        return (
          <div>
            <Row>
              <Button
                onClick={() => addRowProductList()}
                type="primary"
                style={{
                  marginBottom: 16,
                }}
              >Add a row</Button>
            </Row>
            <Row>
              <Col flex={100}>
                <Form form={form} component={false}>

                  <Table
                    components={{
                      body: {
                        cell: EditableCell,
                      },
                    }}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={mergedColumns}
                  />
                </Form>
              </Col>

            </Row>
          </div>
        )
      }
      return (viewDetailProduct) ? detailProduct() : productList()
    }))
export default withTranslation('common')(ProductLimitSetup)
