import React, { useState, useEffect, createRef } from 'react'
import { Button, Table, Popconfirm, Row, Col, Menu, Card, Input, Select, Form, InputNumber } from 'antd'
import { DeleteOutlined, SettingOutlined, FormOutlined } from '@ant-design/icons';
import { inject, observer } from 'mobx-react'
import { withTranslation } from '../../i18n'
import styled from 'styled-components'
import { toJS } from 'mobx'
import SimpleMenu from '../simple-menu'
import SimpleInput from '../simple-input'
import SimpleModal from '../simple-modal'

const { Option } = Select;
let txnLimit = null
let dailyLimit = null

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
      const [disabledButtonAddRow, setDisabledButtonAddRow] = useState(false)
      const [form] = Form.useForm();
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

      useEffect(() => {
        txnLimit, dailyLimit = ''
      }, [showLimitPartner])

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

      const prepareAllLimitToSubmitAndUpdate = () => {
        if (viewSpecificProduct) {
          // submitAddSpecificLimit()
          setModalString(
            <div style={{ textAlign: "center" }}>
              <p> Add Partner {selectPartnerAndProduct.type} </p>
              {/* <p>for {selectPartnerAndProduct.partner_code}/{selectPartnerAndProduct.partner_abbreviation} Channel/Partner !!!</p> */}
            </div>
          )
        } else {
          // submitChangeProductLimitSelect()

          setModalString(
            //waiting for confirm task
            <div style={{ textAlign: "center" }}>
              <p> Change Product Code {selectPartnerAndProduct.partner_code} Limit </p>
              <p>for {selectPartnerAndProduct.partner_code}/{selectPartnerAndProduct.partner_abbreviation} Channel/Partner !!!</p>
            </div>
          )
        }
        setVisble(true)
        setTitleModal('Confirm')
        setModalType("confirm")
      }
      const submitChangeLimit = () => {
        // txnLimit, dailyLimit
        // call api
      }

      const submitAddSpecificLimit = () => {
        businessParametersSetupStore.addSpecificLimit()
        let data = {
          newData: {
            partner_code: selectPartnerAndProduct.partner_code,
            product_code: selectPartnerAndProduct.product_code,
            transaction_code: '6931',
            transaction_limit: txnLimit,
            daily_limit: dailyLimit
          }
        }
      }

      const submitChangeProductLimitSelect = () => {
        //call api
        console.log(toJS(selectPartnerAndProduct))
        let request = {
          partner_code: selectPartnerAndProduct.partner_code,
          product_code: businessParametersSetupStore.productLimitDetail.product_code,
          transaction_code: '6931',
          transaction_limit: txnLimit,
          daily_limit: dailyLimit
        }
        console.log(request)
        //businessParametersSetupStore.changeProductLimit(request)

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

      const selectProductToSpecificLimit = (record) => {
        businessParametersSetupStore.productSelect = record
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
        setDisabledButtonAddRow(true)
        businessParametersSetupStore.arrayProductLimit = dataSource
      }
      const goBackProductList = () => {
        if (viewSpecificProduct) {
          setViewSpecificProduct(false)
        } else {
          setViewDetailProduct(false)
          businessParametersSetupStore.productLimitDetail = null
        }
        setShowLimitPartner(false)

      }
      const submitAddnewProduct = async (key) => {
        // Call api to update record status
        const row = await form.validateFields();
        row.status = '2'
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
        setDisabledButtonAddRow(false)
        businessParametersSetupStore.addNewProductLimit(row)
      }

      const cancelAddNewProduct = async (key) => {
        setDisabledButtonAddRow(false)
        let indexProduct = dataSource.findIndex(item => key === item.key)
        const newData = [...dataSource]
        newData.splice(indexProduct, 1)
        setDataSource(newData);
        setEditingKey('');
      }

      const submitDeleteProduct = (record) => {
        //call api to update record status
        console.log(toJS(record))
        let indexRecordDelete = dataSource.findIndex(item => record.key === item.key)
        const newData = [...dataSource];
        newData[indexRecordDelete].status = '2'
        businessParametersSetupStore.deleteProductLimit(record)
        setDataSource(newData) //waiting useEffect to check api success
      }
      const renderOnclickHandler = (text, record) => {
        let stringToNumber = new Number(text)
        if (isNaN(stringToNumber)) {
          return <p>{text}</p>
        } else {
          let customText = stringToNumber.toLocaleString()
          return <p style={{ textAlign: "right" }}>{customText}</p>
        }
        //return <p onClick={() => selectProductToViewDetail(record)}>{customText}</p>
      }
      const renderActionAddDeleteHandler = (record, index) => {
        if (record.status === '1') {
          return (
            <div>
              <Popconfirm title="Sure to Delete?" onConfirm={(e) => { submitDeleteProduct(record) }} disabled={editingKey !== ''}>
                <a><DeleteOutlined style={{ fontSize: '18px' }} /></a>
              </Popconfirm>
              <a onClick={() => selectProductToViewDetail(record)}><SettingOutlined style={{ fontSize: '18px' }} /></a>
              <a onClick={() => selectProductToSpecificLimit(record)}><FormOutlined style={{ fontSize: '18px' }} /></a>
            </div>)
        } else if (record.status === '2') {
          return null
        } else {
          return (<div>
            <Popconfirm title={"Confirm to Add !!!"} onConfirm={() => { submitAddnewProduct(record.key) }} >
              <a>Confirm</a>
            </Popconfirm><br />
            <Popconfirm title={"Confirm to Cancel !!!"} onConfirm={() => { cancelAddNewProduct(record.key) }} >
              <a>Cancel</a>
            </Popconfirm>
          </div>)
        }
      }
      const renderStatus = (record) => {
        if (record.status === '1') {
          return <p>Active</p>
        } else if (record.status === '2') {
          return <p>Pending</p>
        } else {
          return null
        }
      }
      const renderActionSpecificHandler = (record) => {
        return <p onClick={() => selectProductToSpecificLimit(record)} >.....</p>
      }
      const columns = [
        {
          dataIndex: 'operation',
          render: (text, record, index) =>
            renderStatus(record, index)
        },
        {
          title: 'Product_Code',
          dataIndex: 'product_type',
          width: '5%',
          editable: true,
          render: (text, record) => renderOnclickHandler(text, record)
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
        {
          title: 'Action',
          dataIndex: 'operation',
          render: (text, record, index) =>
            renderActionAddDeleteHandler(record, index)
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
          </div>
        )
      }

      const productLimitList = () => {
        return (
          <div>
            <Row>
              <Button
                onClick={() => addRowProductList()}
                type="primary"
                style={{
                  marginBottom: 16,
                }}
                disabled={disabledButtonAddRow}
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
                    bordered
                    dataSource={dataSource}
                    columns={mergedColumns}
                    size="small"
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
            <Row justify="center" style={{ marginTop: 8 }}>
              <Col span={2}>
                <Button onClick={() => goBackProductList()} shape="round">Back</Button>
              </Col>
              <Col span={2}>
                <Button shape="round" type="primary" onClick={() => { prepareAllLimitToSubmitAndUpdate() }} disabled={showLimitPartner == false}>Submit</Button>
              </Col>
            </Row>
            <SimpleModal
              title={titleModal}
              type={modalType}
              onOk={() => { viewSpecificProduct ? submitAddSpecificLimit() : submitChangeProductLimitSelect() }}
              onCancel={() => setVisble(false)}
              textOk={t("confirm")}
              textCancel={t("cancel")}
              modalString={modalString}
              visible={visible}
            />
          </div>
        )
      }
      return (viewDetailProduct) ? detailProduct() : (viewSpecificProduct ? addAndChangeLimitPartner() : productLimitList())
    }))
export default withTranslation('common')(ProductLimitSetup)
