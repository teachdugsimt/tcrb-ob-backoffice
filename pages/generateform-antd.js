
import React, { useState, useEffect } from 'react'
import { withTranslation } from '../i18n'
import GenerateFormAntd from '../components/data-utility/generate-form-antd'
import { inject, observer } from 'mobx-react'
import moment from 'moment'
import {
  Row, Col, Button, Upload, Input, Modal, Form,
  Menu, Dropdown, TimePicker, Table, Tag, Space,
  message, Select, DatePicker
} from 'antd'


let resObject = {
  //sec1
  freeType: '',
  freeValue: '',
  postingEvery: '',
  //sec2
  debitor: '',
  postingAccountType: '',
  debitAccount: '',
  debitAmount: '',
  debitBranch: '',
  debitCostCenter: '',
  //sec3
  creditor1: '',
  postingAccountType1: '',
  creditAccount1: '',
  creditAmount1: '',
  creditBranch1: '',
  creditCostCenter1: '',
  //sec4
  creditor2: '',
  postingAccountType2: '',
  creditAccount2: '',
  creditAmount2: '',
  creditBranch2: '',
  creditCostCenter2: '',
}

const GenerateformAntd = inject('partnerOnboard', 'loginStore')(observer((props) => {
  let arr = [
    {
      id: 1,
      section_name: "",
      section:
        [{ // dropdown
          key: 1, id: 1, name: "Free Type", placeholder: '', keyword: "freeType",
          type: 'dropdown', mode: "single", require: true,
          // value: freeType, onChange: () => { },
          item: [
            { key: 1, name: 'Fix per transaction', value: 'fixPerTransaction' },
            { key: 2, name: 'Percentage per transaction', value: 'percentage' },
          ]
        },
        { // dropdown
          key: 2, id: 2, name: "Free Value", placeholder: '', keyword: "freeValue",
          type: 'input', require: true,
          // value: freeValue, onChange: () => { },
        },
        { // dropdown
          key: 3, id: 3, name: "Posting Every", placeholder: '', keyword: "postingEvery",
          type: 'dropdown', mode: "single", require: true,
          // value: postingEvery, onChange: () => { },
          item: [
            { key: 1, name: 'transaction', value: 'transaction' },
            { key: 2, name: 'daily', value: 'daily' },
            { key: 3, name: 'weekly', value: 'weekly' },
            { key: 4, name: 'monthly', value: 'monthly' },
            { key: 5, name: 'yearly', value: 'yearly' },
          ]
        }]
    },
    {
      id: 2,
      section_name: "Debit Information",
      section:
        [{ // dropdown
          key: 1, id: 1, name: "Debitor", placeholder: '', keyword: "debitor",
          type: 'dropdown', mode: "single", require: true,
          // value: debitor, onChange: () => { },
          item: [
            { key: 1, name: 'Customer', value: 'customer' },
            { key: 2, name: 'TCRB', value: 'tcrb' },
            { key: 3, name: 'Partner', value: 'partner' },
          ]
        },
        { // dropdown
          key: 2, id: 2, name: "Posting Account Type", placeholder: '', keyword: "postingAccountType",
          type: 'dropdown', mode: "single", require: true,
          // value: postingAccountType, onChange: () => { },
          item: [
            { key: 1, name: 'CA : Current account', value: 'ca' },
            { key: 2, name: 'SA : Saving account', value: 'sa' },
            { key: 3, name: 'GL entries', value: 'gl' },
          ]
        },
        { // dropdown
          key: 3, id: 3, name: "Debit Account", placeholder: '', keyword: "debitAccount",
          type: 'input', require: true, disabled: false,
        },
        { // dropdown
          key: 4, id: 4, name: "Debit Amount", placeholder: '', keyword: "debitAmount",
          type: 'input', require: true, disabled: false,
        },
        { // dropdown
          key: 5, id: 5, name: "Debit Branch", placeholder: '', keyword: "debitBranch",
          type: 'input', require: true, disabled: false,
        }, { // dropdown
          key: 6, id: 6, name: "Debit Cost Center", placeholder: '', keyword: "debitCostCenter",
          type: 'input', require: true, disabled: false,
        }]
    },
    {
      id: 3,
      section_name: "Credit Information #1",
      section:
        [{ // dropdown
          key: 1, id: 1, name: "Creditor", placeholder: '', keyword: "creditor",
          type: 'dropdown', mode: "single", require: true,
          // value: creditor, onChange: () => { },
          item: [
            { key: 1, name: 'TCRB', value: 'tcrb' },
            { key: 2, name: 'Partner', value: 'partner' },
          ]
        },
        { // dropdown
          key: 2, id: 2, name: "Posting AccountType", placeholder: '', keyword: "postingAccountType",
          type: 'dropdown', mode: "single", require: true,
          // value: postingAccountType, onChange: () => { },
          item: [
            { key: 1, name: 'CA : Current account', value: 'ca' },
            { key: 2, name: 'SA : Saving account', value: 'sa' },
            { key: 3, name: 'GL entries', value: 'gl' },
          ]
        },
        { // dropdown
          key: 3, id: 3, name: "Credit Account", placeholder: '', keyword: "creditAccount",
          type: 'input', require: true, disabled: false,
        },
        { // dropdown
          key: 4, id: 4, name: "Credit Amount", placeholder: '', keyword: "creditAmount",
          type: 'input', require: true, disabled: false,
        },
        { // dropdown
          key: 5, id: 5, name: "Credit Branch", placeholder: '', keyword: "creditBranch",
          type: 'input', require: true, disabled: false,
        }, { // dropdown
          key: 6, id: 6, name: "Credit Cost Center", placeholder: '', keyword: "creditCostCenter",
          type: 'input', require: true, disabled: false,
        }]
    },
    {
      id: 4,
      section_name: "Credit Information #2",
      section:
        [{ // dropdown
          key: 1, id: 1, name: "Creditor", placeholder: '', keyword: "creditor",
          type: 'dropdown', mode: "single", require: true,
          // value: creditor, onChange: () => { },
          item: [
            { key: 1, name: 'TCRB', value: 'tcrb' },
            { key: 2, name: 'Partner', value: 'partner' },
          ]
        },
        { // dropdown
          key: 2, id: 2, name: "Posting AccountType", placeholder: '', keyword: "postingAccountType",
          type: 'dropdown', mode: "single", require: true,
          // value: postingAccountType, onChange: () => { },
          item: [
            { key: 1, name: 'CA : Current account', value: 'ca' },
            { key: 2, name: 'SA : Saving account', value: 'sa' },
            { key: 3, name: 'GL entries', value: 'gl' },
          ]
        },
        { // dropdown
          key: 3, id: 3, name: "Credit Account", placeholder: '', keyword: "creditAccount",
          type: 'input', require: true, disabled: false,
        },
        { // dropdown
          key: 4, id: 4, name: "Credit Amount", placeholder: '', keyword: "creditAmount",
          type: 'input', require: true, disabled: false,
        },
        { // dropdown
          key: 5, id: 5, name: "Credit Branch", placeholder: '', keyword: "creditBranch",
          type: 'input', require: true, disabled: false,
        }, { // dropdown
          key: 6, id: 6, name: "Credit Cost Center", placeholder: '', keyword: "creditCostCenter",
          type: 'input', require: true, disabled: false,
        }]
    }
  ]
  const [datasource, setdatasource] = useState(arr)
  const [data, setdata] = useState(resObject)
  const { t } = props

  return <Row style={{width: '100%'}}>
    <Col>{t("partnerRegistration")}</Col>
    <Row justify={'center'} style={{ width: '100%'}}>
      <GenerateFormAntd
        initialValues={data}
        onFinish={(e) => console.log("--- Success ---", e)}
        onFinishFailed={(e) => console.log("--- Submit Failure ---", e)}
        datasource={datasource}
      />
    </Row>
  </Row>

}))

export default withTranslation('common')(GenerateformAntd)
