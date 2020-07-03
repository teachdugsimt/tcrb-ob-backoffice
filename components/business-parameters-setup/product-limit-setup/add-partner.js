import React, { useState, useEffect } from 'react'
import { withTranslation } from '../../../i18n'
import { inject, observer } from 'mobx-react'
import { Table, Row, Col, Menu, Card, Input, Select, Form, InputNumber, Divider } from 'antd'
import { TcrbButton, TcrbPopconfirm } from '../../antd-styles/styles'
import { green, gold } from '@ant-design/colors';
import { addKeyToDataSource, addCommaInData } from '../../data-utility'
import { toJS } from 'mobx';
import SimpleModal from '../../simple-modal'
import SimpleInput from '../../simple-input'

const { Option } = Select;
let txnLimit = null
let dailyLimit = null

const AddPartner =
  inject('businessParametersSetupStore')
    (observer((props) => {
      const { businessParametersSetupStore, t } = props
      const [channelPartnerList, setChannelPartnerList] = useState([])
      const [showLimitPartner, setShowLimitPartner] = useState(false)
      const [visible, setVisble] = useState(false)
      const [modalString, setModalString] = useState('')
      const [titleModal, setTitleModal] = useState('')
      const [modalType, setModalType] = useState('')
      const [selectPartnerAndProduct, setSelectPartnerAndProduct] = useState({})
      const [dataSource, setDataSource] = useState([])



      useEffect(() => {
        console.log(toJS(businessParametersSetupStore.productSelect))
        businessParametersSetupStore.getDataPartnerUnbindList(businessParametersSetupStore.productSelect)
        businessParametersSetupStore.getDataPartnerBindingList(businessParametersSetupStore.productSelect)
      }, []);

      useEffect(() => {
        if (businessParametersSetupStore.responsePartnerUnbindList.length >= 1) {
          setChannelPartnerList(businessParametersSetupStore.responsePartnerUnbindList)
        }
      }, [businessParametersSetupStore.responsePartnerUnbindList])

      useEffect(() => {
        if (businessParametersSetupStore.responsePartnerBindingList.length >= 1) {
          addKeyToDataSource(businessParametersSetupStore.responsePartnerBindingList).then(result => {
            console.log(toJS(result))
            setDataSource(result)
          })
        }
      }, [businessParametersSetupStore.responsePartnerBindingList])

      useEffect(() => {
        if (businessParametersSetupStore.responseAddPartnerStatus) {
          businessParametersSetupStore.getDataPartnerBindingList(businessParametersSetupStore.productSelect)
        }
      })


      const selectPartnerChanel = (value) => {
        let productSelectObject = channelPartnerList.filter(item => item.partner_code == value)
        setSelectPartnerAndProduct(productSelectObject[0])
        //partner_code, product_code
        setShowLimitPartner(true)
      }

      const goBackToProductList = () => {
        businessParametersSetupStore.goBack = true
      }

      const submitAddSpecificLimit = () => {
        let request = {
          partner_code: selectPartnerAndProduct.partner_code,
          product_code: businessParametersSetupStore.productSelect.product_code,
          transaction_code: '6931',
          transaction_limit: txnLimit,
          daily_limit: dailyLimit
        }
        businessParametersSetupStore.addSpecificLimit(request)
        setVisble(false)

      }

      const prepareAllLimitToSubmitAndUpdate = () => {
        setModalString(
          <div style={{ textAlign: "center" }}>
            <p> Add Partner {selectPartnerAndProduct.partner_code}/{selectPartnerAndProduct.partner_abbreviation} To {businessParametersSetupStore.productSelect.product_type}</p>
            <div>
              <Row justify="center" gutter={[4, 4]}>
                <Col>Txn Limit is </Col>
                <Col>{addCommaInData(txnLimit, true)} </Col>
                <Col>THB</Col>
              </Row>
              <Row justify="center" gutter={[4, 14]}>
                <Col>Daily Limit is </Col>
                <Col>{addCommaInData(dailyLimit, true)} </Col>
                <Col>THB</Col>
              </Row>
            </div>
            {/* Daily Limit is {addCommaInData(dailyLimit, true)} */}
            {/* <p>Txn Limit is {addCommaInData(txnLimit, true)}</p> */}
          </div>
        )
        setVisble(true)
        setTitleModal('Confirm')
        setModalType("confirm")
      }
      //1,2 active, 3 pending
      const checkStatus = (record) => {
        if (record.status === '1' || record.status === '2') {
          return <p style={{ color: green[6] }}>Active</p>
        } else if (record.status === '3') {
          return <p style={{ color: gold[6] }}>Pending</p>
        } else {
          return null
        }
      }

      const columnPartnerList = [
        {
          title: '',
          dataIndex: 'status',
          width: '5%',
          render: (text, record) => checkStatus(record)
        },
        {
          title: 'Partner / Channel',
          dataIndex: 'partner_code',
          render: (text, record) => (record.partner_code + "/" + record.partner_abbreviation)
        },
        {
          title: 'Txn Limit',
          dataIndex: 'transaction_limit',
          editable: true,
          render: (text, record) => addCommaInData(text, true)
        },
        {
          title: ' Daily Limit',
          dataIndex: 'daily_limit',
          editable: true,
          render: (text, record) => addCommaInData(text, true)
        }
      ]
      return (
        <div>
          <Row gutter={[4, 24]}>
            <Col span={2}>
              <TcrbButton className="default" onClick={() => goBackToProductList()} shape="round">Back</TcrbButton>
            </Col>
          </Row>
          <Row gutter={[4, 24]}>
            <Col span={6}>Channel/Partner</Col>
            <Col span={6} flex={100}>
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
                <Col span={6} offset={6}>
                  <SimpleInput readOnly={false} defaultValue={null} prefix={'Txn Limit'} onChange={(e) => { txnLimit = e }} />
                </Col>
                <Col span={2}>
                  <p style={{ paddingTop: 4 }}>THB</p>
                </Col>
              </Row>
              <Row>
                <Col span={6} offset={6}>
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
              <TcrbButton shape="round" className="primary" onClick={() => { prepareAllLimitToSubmitAndUpdate() }} disabled={showLimitPartner == false}>Submit</TcrbButton>
            </Col>
          </Row>
          <Divider />
          <Table
            bordered
            dataSource={dataSource}
            columns={columnPartnerList}
            size="small"
          />
          <SimpleModal
            title={titleModal}
            type={modalType}
            onOk={() => { submitAddSpecificLimit() }}
            onCancel={() => setVisble(false)}
            textOk={t("confirm")}
            textCancel={t("cancel")}
            modalString={modalString}
            visible={visible}
          />
        </div>
      )
    }
    ))
export default withTranslation('common')(AddPartner)
