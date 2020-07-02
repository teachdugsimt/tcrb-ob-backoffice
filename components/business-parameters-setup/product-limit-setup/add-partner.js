import React, { useState, useEffect } from 'react'
import { withTranslation } from '../../../i18n'
import { inject, observer } from 'mobx-react'
import { Table, Row, Col, Menu, Card, Input, Select, Form, InputNumber, Divider } from 'antd'
import { TcrbButton, TcrbPopconfirm } from '../../antd-styles/styles'

import SimpleModal from '../../simple-modal'
import SimpleInput from '../../simple-input'

const { Option } = Select;

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



      useEffect(() => {
        businessParametersSetupStore.getDataChannelPartnerList()
      }, []);

      useEffect(() => {
        if (businessParametersSetupStore.channelPartnerList.length > 1) {
          setChannelPartnerList(businessParametersSetupStore.channelPartnerList)
        }
      }, [businessParametersSetupStore.channelPartnerList])

      const selectPartnerChanel = (value) => {
        let productSelectObject = channelPartnerList.filter(item => item.partner_code == value)
        setSelectPartnerAndProduct(productSelectObject[0])
        //partner_code, product_code
        setShowLimitPartner(true)
      }

      const goBackToProductList = () => {
        businessParametersSetupStore.goBack = true
      }

      const columnPartnerList = [
        {
          title: 'Partner / Channel',
          dataIndex: 'product_type',
          render: (text, record) => renderOnclickHandler(text, record)
        },
        {
          title: 'Product_Description',
          dataIndex: 'product_description',
          editable: true,
          render: (text, record) => renderOnclickHandler(text, record)
        },
        {
          title: 'Txn Limit',
          dataIndex: 'transaction_limit',
          editable: true,
          render: (text, record) => renderOnclickHandler(text, record)
        },
        {
          title: ' Daily Limit',
          dataIndex: 'daily_limit',
          editable: true,
          render: (text, record) => renderOnclickHandler(text, record)
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
              <TcrbButton shape="round" className="primary" onClick={() => { prepareAllLimitToSubmitAndUpdate() }} disabled={showLimitPartner == false}>Submit</TcrbButton>
            </Col>
          </Row>
          <Divider />
          <Table
            bordered
            dataSource={[]}
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
