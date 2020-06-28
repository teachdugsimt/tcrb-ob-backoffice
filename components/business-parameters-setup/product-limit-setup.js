import React, { useState, useEffect, createRef } from 'react'
import { Table, Row, Col, Menu, Card, Input, Select, Form, InputNumber } from 'antd'
import { inject, observer } from 'mobx-react'
import { withTranslation } from '../../i18n'
import styled from 'styled-components'
import { toJS } from 'mobx'
import SimpleMenu from '../simple-menu'
import SimpleInput from '../simple-input'
import SimpleModal from '../simple-modal'
import { TcrbButton, TcrbPopconfirm } from '../antd-styles/styles'

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
      const [productList, setProductList] = useState([])
      const [viewSpecificProduct, setViewSpecificProduct] = useState(false)
      const { businessParametersSetupStore, t } = props
      const [form] = Form.useForm();
      var txnLimit, dailyLimit = ''
      // var selectPartnerAndProduct = {}


      const isEditing = record => record.key === editingKey;
      const edit = record => {
        form.setFieldsValue({
          product_type: '',
          product_description: '',
          transaction_limit: '',
          daily_limit: '',
          Specific: '',
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
                name={dataIndex == 'product_type' ? 'product_code' : dataIndex}
                style={{
                  margin: 0,
                }}
                rules={[
                  {
                    required: (inputType === 'number') ? true : false,
                    message: `Please Input ${title}!`,
                  },
                ]}
              >
                {/* {inputNode} */}
                {dataIndex == 'product_type' ? (
                  <Select
                    style={{ width: '100%' }}
                  >
                    {productList.map((item, index) => <Option key={index} value={item.product_code}>{item.product_type}</Option>)}
                  </Select>) : (
                    <div>
                      {inputNode}
                    </div>
                  )}
              </Form.Item>
            ) : (
                children
              )
            }
          </td>
        );
      };

      useEffect(() => {
        // setDataSource(mockDataSource)
        businessParametersSetupStore.getDataProductLimit()
        businessParametersSetupStore.getDataChannelPartnerList()
        businessParametersSetupStore.getDataProductList()
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

      useEffect(() => {
        if (businessParametersSetupStore.productList.length > 1) {
          setProductList(businessParametersSetupStore.productList)
        }
      }, [businessParametersSetupStore.productList])

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
        // businessParametersSetupStore.getDataChannelPartnerList()
      }

      const selectProductToSpecificLimit = () => {
        setViewSpecificProduct(true)
      }

      const addRowProductList = () => {
        let newProduct = {
          key: dataSource.length + 1,
          product_code: '',
          product_description: '',
          transaction_limit: '',
          daily_limit: '',
          Specific: '',
        }
        setDataSource([...dataSource, newProduct])
        edit(newProduct)
        businessParametersSetupStore.arrayProductLimit = dataSource
      }
      const goBackProductList = () => {
        setViewDetailProduct(false)
        businessParametersSetupStore.productLimitDetail = null
      }
      const submitAddnewProduct = async (key) => {
        // Call api to update record status
        const row = await form.validateFields();
        row.status = 2
        row.transaction_code = "6931"
        let indexProduct = productList.findIndex(item => row.product_code === item.product_code)
        row.product_type = productList[indexProduct].product_type
        const newData = [...dataSource];
        const index = newData.findIndex(item => key === item.key);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, { ...item, ...row });
          setDataSource(newData);
          setEditingKey('');
        } else {
          newData.push(row);
          setDataSource(newData);
          setEditingKey('');
        }
        businessParametersSetupStore.addNewProductLimit(row)
      }

      const submitDeleteProduct = (record) => {
        //call api to update record status
        businessParametersSetupStore.deleteProductLimit(record)
        setDataSource(dataSource) //<<waiting result api and  add key index
      }
      const renderOnclickHandler = (text, record) => {
        return <p onClick={() => selectProductToViewDetail(record)}>{text}</p>
      }
      const renderActionAddDeleteHandler = (record, index) => {
        if (index + 1 <= businessParametersSetupStore.arrayProductLimit.length) {
          return <TcrbPopconfirm title="Sure to delete?" onConfirm={(e) => { submitDeleteProduct(record) }} disabled={editingKey !== ''}>
            <a>Delete</a>
          </TcrbPopconfirm>
        } else if (record.status === 2) {
          return null
        } else {
          return <TcrbPopconfirm title={"Confirm to add !!!"} onConfirm={() => { submitAddnewProduct(record.key) }} >
            <a>confirm</a>
          </TcrbPopconfirm>
        }
      }
      const renderActionSpecificHandler = (record) => {
        return <p onClick={() => selectProductToSpecificLimit(record)} >.....</p>
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
          dataIndex: 'transaction_limit',
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
          // editable: true,
          render: (text, record) => renderActionSpecificHandler(text, record)

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
              {/* <AddAndChangeLimitPartner /> */}
              {addAndChangeLimitPartner()}
            </Card>
            <Row justify="center" style={{ marginTop: 8 }}>
              <Col span={2}>
                <TcrbButton onClick={() => goBackProductList()} shape="round" className="default">Back</TcrbButton>
              </Col>
              <Col span={2}>
                <TcrbButton shape="round" onClick={() => { submitChangeProductLimitSelect() }} className="primary">Submit</TcrbButton>
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

      const productLimitList = () => {
        return (
          <div>
            <Row>
              <TcrbButton
                onClick={() => addRowProductList()}
                style={{
                  marginBottom: 16,
                }}
                className="primary"
              >Add a row</TcrbButton>
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

      const addAndChangeLimitPartner = () => {
        return (
          <div>
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
              <div>
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

              </div>
            ) : ('')}
          </div>
        )
      }
      return (viewDetailProduct) ? detailProduct() : (viewSpecificProduct ? addAndChangeLimitPartner() : productLimitList())
    }))
export default withTranslation('common')(ProductLimitSetup)
