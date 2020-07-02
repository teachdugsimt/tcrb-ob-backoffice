import React, { useState, useEffect } from 'react'
import { DeleteOutlined, SettingOutlined, FormOutlined, ApartmentOutlined } from '@ant-design/icons';
import { Table, Row, Col, Menu, Card, Input, Select, Form, InputNumber, Divider } from 'antd'
import { green, gold } from '@ant-design/colors';
import { inject, observer } from 'mobx-react'
import { withTranslation } from '../../../i18n'
import styled from 'styled-components'
import { toJS } from 'mobx'
import { TcrbButton, TcrbPopconfirm } from '../../antd-styles/styles'
import { addKeyToDataSource, addCommaInData } from '../../data-utility'


const ProductList =
  inject('businessParametersSetupStore')
    (observer((props) => {
      const [editingKey, setEditingKey] = useState('')
      const [disabledButtonAddRow, setDisabledButtonAddRow] = useState(false)
      const [dataSource, setDataSource] = useState([])
      const [productList, setProductList] = useState([])

      const { businessParametersSetupStore, t } = props
      const [form] = Form.useForm();
      const isEditing = record => record.key === editingKey;

      useEffect(() => {
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
        if (businessParametersSetupStore.productList.length > 1) {
          setProductList(businessParametersSetupStore.productList)
        }
      }, [businessParametersSetupStore.productList])

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
      }
      const selectProductToViewDetail = (rowSelected) => {
        //call api to get Detail Product
        businessParametersSetupStore.getDataDetailProductLimit(rowSelected.product_code)
        // businessParametersSetupStore.getDataChannelPartnerList()
      }

      const selectProductToSpecificLimit = (record) => {
        businessParametersSetupStore.productSelect = record
        businessParametersSetupStore.nextPageIsAddPartner = true
        // setViewSpecificProduct(true)
      }
      const renderActionAddDeleteHandler = (record, index) => {
        if (record.status === '1') {
          return (
            <div style={{ textAlign: "center" }}>
              <TcrbPopconfirm title="Sure to Delete?" onConfirm={(e) => { submitDeleteProduct(record) }} disabled={editingKey !== ''}>
                <a><DeleteOutlined style={{ fontSize: '18px' }} /></a>
              </TcrbPopconfirm>
              <a onClick={() => selectProductToViewDetail(record)}><FormOutlined style={{ fontSize: '18px', color: '#FBA928' }} /></a>
              {/* <a onClick={() => selectProductToSpecificLimit(record)}><ApartmentOutlined style={{ fontSize: '18px', color: '#FBA928' }} /></a> */}
            </div>)
        } else if (record.status === '2') {
          return null
        } else {
          return (<div>
            <TcrbPopconfirm title={"Confirm to Add !!!"} onConfirm={() => { submitAddnewProduct(record.key) }} >
              <a>Confirm</a>
            </TcrbPopconfirm><br />
            <TcrbPopconfirm title={"Confirm to Cancel !!!"} onConfirm={() => { cancelAddNewProduct(record.key) }} >
              <a>Cancel</a>
            </TcrbPopconfirm>
          </div>)
        }
      }
      const renderStatus = (record) => {
        if (record.status === '1') {
          return <p style={{ color: green[6] }}>Active</p>
        } else if (record.status === '2') {
          return <p style={{ color: gold[6] }}>Pending</p>
        } else {
          return null
        }
      }
      const renderActionSpecificHandler = (record) => {
        return <div style={{ textAlign: "center" }}><a onClick={() => selectProductToSpecificLimit(record)}><ApartmentOutlined style={{ fontSize: '18px', color: '#FBA928' }} /></a></div>
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
          render: (text, record) => addCommaInData(text, false)
        },
        {
          title: 'Product_Description',
          dataIndex: 'product_description',
          editable: true,
          render: (text, record) => addCommaInData(text, false)
        },
        {
          title: 'All-Channel Txn Limit',
          dataIndex: 'transaction_limit',
          editable: true,
          render: (text, record) => addCommaInData(text, true)
        },
        {
          title: 'All-Channel Daily Limit',
          dataIndex: 'daily_limit',
          editable: true,
          render: (text, record) => addCommaInData(text, true)
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
      return (
        <div>
          <Row>
            <TcrbButton
              onClick={() => addRowProductList()}
              style={{
                marginBottom: 16,
              }}
              disabled={disabledButtonAddRow}
              className="primary">Add a Product</TcrbButton>
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
    }))
export default withTranslation('common')(ProductList)
