
import React, { useState, useEffect } from 'react'
import { withTranslation } from '../../../i18n'
import GenerateFormAntd from '../../data-utility/generate-form-antd'
import { inject, observer } from 'mobx-react'
// import GenerateFormAntd from '../components/data-utility/generate-form-antd'
import moment from 'moment'
import {
  Row, Col, Button, Upload, Input, Modal, Form,
  Menu, Dropdown, TimePicker, Table, Tag, Space,
  message, Select, DatePicker
} from 'antd'
import _ from "lodash";
import { openModalError } from '../../../components/data-utility'
import { Cookies } from 'react-cookie';
import { TcrbTabs, TcrbSpin } from '../.././antd-styles/styles'
const cookies = new Cookies();

let feeObject = {
  //sec1
  freeType: null,
  freeValue: 0,
  postingEvery: null,
  //sec2
  debitor: null,
  postingAccountType: null,
  debitAccount: null,
  debitAmount: 0,
  debitBranch: null,
  debitCostCenter: null,
  debitProduct: null,
  //sec3
  creditor1: null,
  postingAccountType1: null,
  creditAccount1: null,
  creditAmount1: 0,
  creditBranch1: null,
  creditCostCenter1: null,
  creditProduct1: null,
  //sec4
  creditor2: null,
  postingAccountType2: null,
  creditAccount2: null,
  creditAmount2: 0,
  creditBranch2: null,
  creditCostCenter2: null,
  creditProduct2: null,
}

let resObject = {

  debitor: null,
  fee_net_amount: null,
  posting_every: null,
  debit_amount: null,
  fee_type: null, // ENUM.PERCENTAGE_PER_TRANSACTION,
  partner_abbreviation: null, //"TMDS",
  transaction_code: null, // ENUM.BINDING,
  partner_code: null, //"TMDS",
  product_type: null, // "NE",
  created_on: null, // new Date(),
  created_by: null, // "system",
  credit_informations: [
    {
      creditor: null,
      posting_account_type: null,
      credit_account: null,
      credit_amount: 0,
      credit_branch: null,
      credit_cost_center: null,
    },
    {
      creditor: null,
      posting_account_type: null,
      credit_account: null,
      credit_amount: 0,
      credit_branch: null,
      credit_cost_center: null,
    },
  ],

  principal: {
    gl_branch: null,
    gl_costcenter: null,
    gl_product: null,
    gl_account: null,
    posting_account_type: null,
    partner_code: null,
    product_type: null,
    gl_type: null
  }
}

let creditorSelect = [
  { key: 1, name: 'TCRB', value: 'tcrb' },
  { key: 2, name: 'Partner', value: 'partner' },
]

const FeeSettlementForm = inject('partnerOnboard', 'loginStore')(observer((props) => {
  const { t, partnerOnboard, loginStore } = props
  const [feeObj, setFeeObj] = useState(feeObject)
  const [data, setResultData] = useState(resObject)
  const [awake, setawake] = useState(1)
  const [creditorType, setcreditorType] = useState(creditorSelect)

  useEffect(() => {

    let principal_gl = JSON.parse(JSON.stringify(partnerOnboard.tmp_principal_gl))
    let partner_code = JSON.parse(JSON.stringify(partnerOnboard.tmp_partner_id))
    let product_type = JSON.parse(JSON.stringify(partnerOnboard.tmp_product_type))
    let service_name = JSON.parse(JSON.stringify(partnerOnboard.tmp_service_name))
    let objPartner = JSON.parse(JSON.stringify(partnerOnboard.data_get_partnerinformation_by_id))
    let loginObj = JSON.parse(JSON.stringify(cookies.get("menus")))

    if (principal_gl && principal_gl != null) {
      let obj = data
      obj.principal.gl_branch = principal_gl.glBranch
      obj.principal.gl_costcenter = principal_gl.glCostCenter
      obj.principal.gl_product = principal_gl.glProduct
      obj.principal.gl_account = principal_gl.glAccount
      obj.principal.posting_account_type = principal_gl.postingAccountType
      obj.principal.gl_type = principal_gl.debitCredit

      if (service_name && service_name != null && objPartner) {
        obj.partner_abbreviation = objPartner.partner_abbreviation
        obj.transaction_code = service_name.toLowerCase() == "binding" ? "binding" :
          (service_name.toLowerCase() == "release loan" ? '6931' :
            service_name.toLowerCase() == "repayment" ? '6619' :
              service_name.toLowerCase())
      }

      if (product_type && partner_code) {

        obj.partner_code = partner_code
        obj.product_type = product_type.product_segment

        obj.principal.partner_code = partner_code
        obj.principal.product_type = product_type.product_segment
      }
      console.log("OBJ RESULT 1: ", obj)
      setResultData(obj)
    }

  }, [partnerOnboard.tmp_principal_gl, partnerOnboard.tmp_service_name, partnerOnboard.data_get_partnerinformation_by_id])

  const _checkDisabledDatasourceNow = () => {
    let tmp = datasource
    console.log("CAN GO DATASOURCE :: ", datasource)
    let result
    tmp[1].section.forEach((e, i) => {
      if (e.key == 3 || e.key == 4) {
        if (e.disabled == true) result = "disabled"
        else result = "enable"
      } else if (e.key == 5 || e.key == 6) {
        if (e.disabled == true) result = "disabled"
        else result = "enable"
      }
    })
    return result
  }

  const _setDisableForCustomer = (status) => {
    let tmp = datasource
    tmp[1].section.forEach((e, i) => {
      if (e.key == 3 || e.key == 2) {
        e.disabled = status == "enable" ? false : true
      } else if (e.key == 5 || e.key == 6) {
        e.disabled = status == "enable" ? false : true
      }
    })
    setdatasource(tmp)
  }

  const _setCreditorForNextForm = (e, cell) => {
    let check = cell.keyword == 'creditor2' ? 'creditor1' : 'creditor2'
    let tmp = datasource
    tmp.map((sec, ind) => {
      sec.section.map((item, i) => {
        if (item.name == cell.name && item.keyword == check) {
          let checkSUB
          item.item.map((sub, subIndex) => {
            if (sub.value == e) {
              checkSUB = subIndex
              // sub.splice(subIndex, 1)
            }
          })
          item.item.splice(checkSUB, 1)
        }
      })
    })
    console.log("SPLICE TMP :: ", tmp)
    setdatasource(tmp)
  }

  const handlerChangeDropdown = (e, item) => {
    feeObj[item.keyword] = e
    if (item.keyword == "debitor" && e == "customer") {
      _setDisableForCustomer("disabled")
      _setAwakeRender()
    } else if (item.keyword == "debitor" && e != "customer") {
      let check = _checkDisabledDatasourceNow()
      if (check == "disabled") {
        _setDisableForCustomer("enable")
        _setAwakeRender()
      }
    }

    if (item.keyword == "creditor1" || item.keyword == 'creditor2') {
      _setCreditorForNextForm(e, item)
      _setAwakeRender()
    }
  }

  const _setAwakeRender = () => {
    if (awake == 0) setawake(1)
    else setawake(0)
  }

  let arr = [
    {
      id: 1,
      key: 1,
      section_name: "",
      section:
        [{ // dropdown
          key: 1, id: 1, name: "Free Type", placeholder: '', keyword: "freeType",
          type: 'dropdown', mode: "single", require: true,
          onChange: handlerChangeDropdown,
          item: [
            { key: 1, name: 'Fix per transaction', value: 'FIXED_PER_TRANSACTION' },
            { key: 2, name: 'Percentage per transaction', value: 'PERCENTAGE_PER_TRANSACTION' },
          ]
        },
        { // dropdown
          key: 2, id: 2, name: "Free Value", placeholder: '', keyword: "freeValue",
          type: 'input', require: true,
        },
        { // dropdown
          key: 3, id: 3, name: "Posting Every", placeholder: '', keyword: "postingEvery",
          type: 'dropdown', mode: "single", require: true,
          onChange: handlerChangeDropdown,
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
      key: 2,
      section_name: "Debit Information",
      section:
        [{ // dropdown
          key: 1, id: 1, name: "Debitor", placeholder: '', keyword: "debitor",
          type: 'dropdown', mode: "single", require: true,
          onChange: handlerChangeDropdown,
          item: [
            { key: 1, name: 'Customer', value: 'customer' },
            { key: 2, name: 'TCRB', value: 'tcrb' },
            { key: 3, name: 'Partner', value: 'partner' },
          ]
        },
        { // dropdown
          key: 2, id: 2, name: "Posting Account Type", placeholder: '', keyword: "postingAccountType",
          type: 'dropdown', mode: "single", disabled: false,
          onChange: handlerChangeDropdown,
          item: [
            { key: 1, name: 'CA : Current account', value: 'ca' },
            { key: 2, name: 'SA : Saving account', value: 'sa' },
            { key: 3, name: 'GL entries', value: 'gl' },
          ]
        },
        { // dropdown
          key: 3, id: 3, name: "Debit Account", placeholder: '', keyword: "debitAccount",
          type: 'input', disabled: false,
        },
        { // dropdown
          key: 4, id: 4, name: "Debit Amount", placeholder: '', keyword: "debitAmount",
          type: 'input', disabled: false, require: true
        },
        { // dropdown
          key: 5, id: 5, name: "Debit Branch", placeholder: '', keyword: "debitBranch",
          type: 'input', disabled: false,
        }, { // dropdown
          key: 6, id: 6, name: "Debit Cost Center", placeholder: '', keyword: "debitCostCenter",
          type: 'input', disabled: false,
        }, { // dropdown
          key: 7, id: 7, name: "Debit Product", placeholder: '', keyword: "debitProduct",
          type: 'input', disabled: false,
        }
        ]
    },
    {
      id: 3,
      key: 3,
      section_name: "Credit Information #1",
      section:
        [{ // dropdown
          key: 1, id: 1, name: "Creditor", placeholder: '', keyword: "creditor1",
          type: 'dropdown', mode: "single", require: true,
          onChange: handlerChangeDropdown,
          item: [
            { key: 1, name: 'TCRB', value: 'tcrb' },
            { key: 2, name: 'Partner', value: 'partner' },
          ]
        },
        { // dropdown
          key: 2, id: 2, name: "Posting Account Type", placeholder: '', keyword: "postingAccountType1",
          type: 'dropdown', mode: "single", require: true,
          onChange: handlerChangeDropdown,
          item: [
            { key: 1, name: 'CA : Current account', value: 'ca' },
            { key: 2, name: 'SA : Saving account', value: 'sa' },
            { key: 3, name: 'GL entries', value: 'gl' },
          ]
        },
        { // dropdown
          key: 3, id: 3, name: "Credit Account", placeholder: '', keyword: "creditAccount1",
          type: 'input', require: true, disabled: false,
        },
        { // dropdown
          key: 4, id: 4, name: "Credit Amount", placeholder: '', keyword: "creditAmount1",
          type: 'input', require: true, disabled: false,
        },
        {
          key: 5, id: 5, name: "Credit Branch", placeholder: '', keyword: "creditBranch1",
          type: 'input', require: true, disabled: false,
        }, {
          key: 6, id: 6, name: "Credit Cost Center", placeholder: '', keyword: "creditCostCenter1",
          type: 'input', require: true, disabled: false,
        }, {
          key: 7, id: 7, name: "Credit Product", placeholder: '', keyword: "creditProduct1",
          type: 'input', require: true, disabled: false,
        }
        ]
    },
    {
      id: 4,
      key: 4,
      section_name: "Credit Information #2",
      section:
        [{ // dropdown
          key: 1, id: 1, name: "Creditor", placeholder: '', keyword: "creditor2",
          type: 'dropdown', mode: "single", require: false,
          onChange: handlerChangeDropdown,
          item: [
            { key: 1, name: 'TCRB', value: 'tcrb' },
            { key: 2, name: 'Partner', value: 'partner' },
          ]
        },
        { // dropdown
          key: 2, id: 2, name: "Posting Account Type", placeholder: '', keyword: "postingAccountType2",
          type: 'dropdown', mode: "single", require: false,
          onChange: handlerChangeDropdown,
          item: [
            { key: 1, name: 'CA : Current account', value: 'ca' },
            { key: 2, name: 'SA : Saving account', value: 'sa' },
            { key: 3, name: 'GL entries', value: 'gl' },
          ]
        },
        { // dropdown
          key: 3, id: 3, name: "Credit Account", placeholder: '', keyword: "creditAccount2",
          type: 'input', require: false, disabled: false,
        },
        { // dropdown
          key: 4, id: 4, name: "Credit Amount", placeholder: '', keyword: "creditAmount2",
          type: 'input', require: false, disabled: false,
        },
        { // dropdown
          key: 5, id: 5, name: "Credit Branch", placeholder: '', keyword: "creditBranch2",
          type: 'input', require: false, disabled: false,
        }, { // dropdown
          key: 6, id: 6, name: "Credit Cost Center", placeholder: '', keyword: "creditCostCenter2",
          type: 'input', require: false, disabled: false,
        }, {
          key: 7, id: 7, name: "Credit Product", placeholder: '', keyword: "creditProduct2",
          type: 'input', require: true, disabled: false,
        }]
    }
  ]

  const [datasource, setdatasource] = useState(arr)

  const _verifyAmount = (item) => {
    let result
    let creamt1 = item.creditAmount1 && item.creditAmount1 != '' ? parseInt(item.creditAmount1) : 0
    let creamt2 = item.creditAmount2 && item.creditAmount2 != '' ? parseInt(item.creditAmount2) : 0

    let sum_credit_amount = creamt1 + creamt2
    if (parseInt(item.freeValue) == sum_credit_amount) {
      result = true
    } else {
      result = false
      return result
    }
    if (parseInt(item.debitAmount) == sum_credit_amount) {
      result = true
    } else {
      result = false
      return result
    }
    if (parseInt(item.debitAmount) == parseInt(item.freeValue)) {
      result = true
    } else {
      result = false
      return result
    }
    return result

  }
  const _popupNotify = (title, content) => {
    let errorMessage = {
      title: (title),
      body: (
        <div>
          <p>{content}</p>
        </div>
      )
    }
    openModalError(errorMessage)
  }

  const _onFinishForm = (value) => {
    // let formFeeValue = _.pickBy(value);
    // let valueOfDropdown = _.pickBy(feeObj)
    let formFeeValue = value
    console.log("_onFinishForm -> formFeeValue form : ", formFeeValue)
    let valueOfDropdown = feeObj
    console.log("_onFinishForm -> valueOfDropdown state : ", valueOfDropdown)
    let allFeeObject = { ...valueOfDropdown, ...formFeeValue } // merge object, if duplicate it'll use first object
    console.log("_onFinishForm -> allFeeObject", allFeeObject)

    let verify_amount = _verifyAmount(allFeeObject)
    if (verify_amount) {
      // ********* map to result object **********
      data.debitor = allFeeObject.debitor.toUpperCase()
      data.fee_net_amount = parseInt(allFeeObject.freeValue)
      data.posting_every = allFeeObject.postingEvery
      data.debit_amount = parseInt(allFeeObject.debitAmount)
      data.free_debit_bank = parseInt(allFeeObject.debitAmount)
      data.fee_type = allFeeObject.freeType

      data.credit_informations[0].creditor = allFeeObject.creditor1
      data.credit_informations[0].posting_account_type = allFeeObject.postingAccountType1
      data.credit_informations[0].credit_account = allFeeObject.creditAccount1
      data.credit_informations[0].credit_amount = parseInt(allFeeObject.creditAmount1)
      data.credit_informations[0].free_credit_bank = parseInt(allFeeObject.creditAmount1)
      data.credit_informations[0].credit_branch = allFeeObject.creditBranch1
      data.credit_informations[0].credit_cost_center = allFeeObject.creditCostCenter1

      data.credit_informations[1].creditor = allFeeObject.creditor2
      data.credit_informations[1].posting_account_type = allFeeObject.postingAccountType2
      data.credit_informations[1].credit_account = allFeeObject.creditAccount2
      data.credit_informations[1].credit_amount = parseInt(allFeeObject.creditAmount2)
      data.credit_informations[1].free_credit_bank = parseInt(allFeeObject.creditAmount2)
      data.credit_informations[1].credit_branch = allFeeObject.creditBranch2
      data.credit_informations[1].credit_cost_center = allFeeObject.creditCostCenter2
    } else {
      _popupNotify("Some value was invalid ", "Credit amount should be equal free value & debit amount")
    }
    console.log("Final Object :: ", data)
    partnerOnboard.addNewPrincipalFee(data)
  }
  const _onFailureForm = (value) => {

  }

  return <Row style={{ width: '100%' }}>
    {/* <Col>{t("partnerRegistration")}</Col> */}
    <TcrbSpin spinning={partnerOnboard.fetching_onboard} size="large" tip="Loading..." >
      <Row justify={'center'} style={{ width: '100%' }}>
        {awake == 1 ? <GenerateFormAntd
          initialValues={feeObj}
          onFinish={_onFinishForm}
          onFinishFailed={_onFailureForm}
          datasource={datasource}
        /> : <GenerateFormAntd
            initialValues={feeObj}
            onFinish={_onFinishForm}
            onFinishFailed={_onFailureForm}
            datasource={datasource}
          />}
      </Row>
    </TcrbSpin>
  </Row>

}))

export default withTranslation('common')(FeeSettlementForm)
