import React, { useState, useEffect, createRef } from 'react'
import { Button, Table, Popconfirm, Row, Col, Menu, Card, Input, Select } from 'antd'
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
      const { businessParametersSetupStore, t } = props
      var txnLimit, dailyLimit = ''

      useEffect(() => {
        // setDataSource(mockDataSource)
        businessParametersSetupStore.getDataProductLimit()

      }, []);
      useEffect(() => {
        if (businessParametersSetupStore.productLimit.length > 0) {
          addKeyToDataSource(businessParametersSetupStore.productLimit).then((result) => {
            setDataSource(result)
          })
        }
      }, [businessParametersSetupStore.productLimit])
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
        setModalString(
          <div style={{ textAlign: "center" }}>
            <p> Change Product Code {product_code} Limit !!!</p>
          </div>
        )
      }

      const selectPartnerChanel = (value) => {
        //partner_code, product_code
        // businessParametersSetupStore.getPartnerChannel()
        setShowLimitPartner(true)
      }

      const selectProductToViewDetail = (rowSelected) => {
        //call api to get Detail Product
        //input {"product_code": "00006"}
        businessParametersSetupStore.productLimitDetail = {
          id: 7,
          created_on: "2020-06-15T13:09:48.000Z",
          created_by: "system",
          updated_on: null,
          updated_by: null,
          terminated_on: null,
          terminated_by: null,
          transaction_code: "6619",
          partner_code: "",
          transaction_limit: "1000000",
          daily_limit: "1000000",
          status: "1",
          request_status: "0",
          product_code: "00006",
          product_description: "Test Program - High LTV ดอกเบี้ยพิเศษ 9.99%",
          product_type: "NG"
        }
        // Output:
        // {
        //   responseCode:"S0000",
        //   userMessage:"Transaction successful",
        //   developerMessage:"Normal success",
        //   responseDateTime:"2020-06-18 14:43:04",
        // responseData: {
        //   id:7,
        //   created_on:"2020-06-15T13:09:48.000Z",
        //   created_by:"system",
        //   updated_on:null,
        //   updated_by:null,
        //   terminated_on:null,
        //   terminated_by:null,
        //   transaction_code:"6619",
        //   partner_code:"",
        //   transaction_limit:"1000000",
        //   daily_limit:"1000000",
        //   status:"1",
        //   request_status:"0",
        //   product_code:"00006",
        //   product_description:"Test Program - High LTV ดอกเบี้ยพิเศษ 9.99%",
        //   product_type:"NG"
        // }
        // }
        //call api for channel/ partner
        //Input:
        // "filter": {
        //   "attributes": ["partner_code", "partner_abbreviation"]
        // }
        setViewDetailProduct(true)
      }

      const columns = [
        {
          // title: 'Specific Channel Limit',
          dataIndex: 'operation',
          render: (text, record) =>
            dataSource.length >= 1 ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => businessParametersSetupStore.selectProductToDelete(record)} >
                <a>Delete</a>
              </Popconfirm>
            ) : null,
        },
        {
          title: 'Product_Code',
          dataIndex: 'product_code',
          width: '10%',
          editable: true,
        },
        {
          title: 'Product_Description',
          dataIndex: 'product_description',
        },
        {
          title: 'All-Channel Txn Limit',
          dataIndex: 'TxnLimit',
        },
        {
          title: 'All-Channel Daily Limit',
          dataIndex: 'daily_limit',
        },
        {
          title: 'Specific Channel Limit',
          dataIndex: 'Specific',
        },
      ];
      const mockDataSource = [
        {
          key: '0',
          ProductCode: 'NE',
          ProductDescription: 'Revolving Loan-Non TCG Nano',
          TxnLimit: '100,000.00',
          DailyLimit: '100,000.00'
        },
        {
          key: '1',
          ProductCode: 'NG',
          ProductDescription: 'Revolving Loan-Non TCG Micro',
          TxnLimit: '200,000.00',
          DailyLimit: '200,000.00'
        },
        {
          key: '2',
          ProductCode: 'NH',
          ProductDescription: 'Revolving Loan-TCG Nano',
          TxnLimit: '100,000.00',
          DailyLimit: '100,000.00'
        },
      ]

      const detailProduct = () => {
        const testOption = [
          {
            partner_code: "TMDS",
            partner_abbreviation: "Micropay",
            partner_code_group: "TMDS"
          },
          {
            partner_code: "TRUM",
            partner_abbreviation: "TrueWallet",
            partner_code_group: "TRUM"
          },
          {
            partner_code: "TMD1",
            partner_abbreviation: "ThaiMicropay",
            partner_code_group: null
          },
          {
            partner_code: "OBCH",
            partner_abbreviation: "TCRB",
            partner_code_group: null
          }
        ]
        // var optionList = []
        // convertToArrayOptionSelect(testOption).then((result) => {
        //   optionList = result
        // })
        return (
          <div>
            <Card style={{ padding: 8 }}>
              <Row gutter={[4, 24]}>
                <Col span={6}>Product_Code</Col>
                <Col span={6}>{businessParametersSetupStore.productLimitDetail.product_type}</Col>
              </Row>
              <Row gutter={[4, 24]}>
                <Col span={6}>Product_Description</Col>
                <Col span={6}>{businessParametersSetupStore.productLimitDetail.product_description}</Col>
              </Row>
            </Card>
            <Card>
              <Row gutter={[4, 24]}>
                <Col span={6}>All-Channel Txn Limit</Col>
                <Col span={6}>{businessParametersSetupStore.productLimitDetail.transaction_limit}</Col>
              </Row>
              <Row gutter={[4, 24]}>
                <Col span={6}>All-Channel Daily Limit</Col>
                <Col span={6}>{businessParametersSetupStore.productLimitDetail.daily_limit}</Col>
              </Row>
            </Card>
            <Card>
              <Row gutter={[4, 24]}>
                <Col span={6}>Channel/Partner</Col>
                <Col span={6} flex={100}>
                  {/* <SimpleMenu options={optionList} onChange={(e) => { selectPartnerChanel(e) }} /> */}
                  <Select
                    onChange={(value) => selectPartnerChanel(value)}
                    style={{ width: '100%' }}
                  >
                    {testOption.map((item, index) => <Option key={index} value={item.partner_code}>{item.partner_code}/{item.partner_abbreviation}</Option>)}
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
                  <Row gutter={[4, 24]}>
                    <Col>
                      <Button onClick={() => { submitChangeProductLimitSelect() }}>Submit</Button>
                    </Col>
                  </Row>
                </>
              ) : ('')}

            </Card>
            <Row justify="center" style={{ marginTop: 8 }}>
              <Col span={2}>
                <Button>Back</Button>
              </Col>
              <Col span={2}>
                <Button>OK</Button>
              </Col>
            </Row>
            <SimpleModal
              onOk={() => unlockOTP()}
              onCancel={() => closeModal()}
              okText={t("confirm")}
              cancelText={t("cancel")}
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
                // onClick={this.handleAdd}
                type="primary"
                style={{
                  marginBottom: 16,
                }}
              >Add a row</Button>
            </Row>
            <Row>
              <Col flex={100}>
                <Table
                  // components={components}
                  rowClassName={() => 'editable-row'}
                  bordered
                  dataSource={dataSource}
                  columns={columns}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: event => { selectProductToViewDetail(record) }, // click row
                    };
                  }}
                />
              </Col>

            </Row>
          </div>
        )
      }
      return (viewDetailProduct) ? detailProduct() : productList()
    }))
export default withTranslation('common')(ProductLimitSetup)
