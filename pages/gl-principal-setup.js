import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { PageHeader } from '../components/page-header';
import { Row, Col, Button } from 'antd'
import { withTranslation } from '../i18n'
import GlPrincipalChange from '../components/partner-onboard/gl-principal-setup/gl-principal-change'
import GenerateFormAntd from '../components/data-utility/generate-form-antd'
import { inject, observer } from 'mobx-react'
import partnerOnboardApi from '../services/partner-onboard-api';
import Router, { withRouter } from 'next/router'
import { openModalError } from '../components/data-utility'

let object = {
  debitCredit: '',
  glBranch: '',
  glCostCenter: '',
  glProduct: '',
  glAccount: '',
  postingAccountType: '',
}

const GlPrincipalSetup = inject('partnerOnboard')(observer((props) => {

  const { t, partnerOnboard } = props
  const [postingAccountType, setpostingAccountType] = useState('')
  const [debitCredit, setdebitCredit] = useState('')

  useEffect(() => {
    console.log("debitCredit :: ", debitCredit)
    console.log("postingAccountType :: ", postingAccountType)
  }, [postingAccountType, debitCredit])

  const setPosting = (e) => {
    setpostingAccountType(e)
  }
  const setCredit = (e, keyword) => {
    // console.log("E :: ", e)
    // console.log("TEST PARAMS :: ", keyword)
    setdebitCredit(e)
  }
  let arr = [
    {
      id: 1,
      section_name: "Partner GL for Debit/Credit Principal",
      section:
        [
          { // dropdown
            key: 1, id: 1, name: "Debitor/Creditor", placeholder: '', keyword: "debitCredit",
            type: 'dropdown', mode: "single", require: true,
            onChange: setCredit,
            item: [
              { key: 1, name: 'Debitor', value: 'debitor' },
              { key: 2, name: 'Creditor', value: 'creditor' },
            ]
          },
          { // input
            key: 2, id: 2, name: "GL Branch", placeholder: '', keyword: "glBranch",
            type: 'input', require: true,
            // value: freeValue, onChange: () => { },
          },
          { // dropdown
            key: 3, id: 3, name: "GL Cost Center", placeholder: '', keyword: "glCostCenter",
            type: 'input', require: true,
            // value: freeValue, onChange: () => { },
          },
          { // dropdown
            key: 4, id: 4, name: "GL Product", placeholder: '', keyword: "glProduct",
            type: 'input', require: true,
            // value: freeValue, onChange: () => { },
          },
          { // dropdown
            key: 5, id: 5, name: "GL Account", placeholder: '', keyword: "glAccount",
            type: 'input', require: true,
            // value: freeValue, onChange: () => { },
          },
          { // dropdown
            key: 1, id: 1, name: "Posting Account Type", placeholder: '', keyword: "postingAccountType",
            type: 'dropdown', mode: "single", require: true,
            onChange: setPosting,
            item: [
              { key: 1, name: 'CA : Current account', value: 'ca' },
              { key: 2, name: 'SA : Saving account', value: 'sa' },
              { key: 3, name: 'GL entries', value: 'gl' },
            ]
          },
        ]
    }]
  const [datasource, setdatasource] = useState(arr)
  const [data, setdata] = useState(object)

  const _handleFinish = (e) => {
    let tmp = JSON.parse(JSON.stringify(e))
    if (debitCredit && postingAccountType) {
      tmp.debitCredit = debitCredit
      tmp.postingAccountType = postingAccountType
    } else {
      let errorMessage = {
        title: (
          'Some data was empty key '
        ),
        body: (
          <div>
            <p>{"Please input dropdown"}</p>
          </div>
        )
      }
      openModalError(errorMessage)
    }
    console.log("--- Success ---", tmp)
    partnerOnboard.setTmpForm(tmp, 'principal')
    Router.push('/fee-settlement-setup')
  }

  const _handleFailure = (e) => {
    partnerOnboard.setTmpForm(null, 'principal')
    let errorMessage = {
      title: (
        'Some data was empty key '
      ),
      body: (
        <div>
          <p>{"Please input dropdown"}</p>
        </div>
      )
    }
    openModalError(errorMessage)
  }

  // console.log(addProduct)
  return (

    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>

      <PageHeader>
        {"GL " + "Principal" + " Setup"}
      </PageHeader>

      <Row>
        {partnerOnboard.data_get_partnerinformation_by_id && <div style={{ display: 'flex', height: 30, flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }} >
            <div style={{ width: 180, fontWeight: 'bold' }}>Parent Assign Name</div>
            <div style={{ width: 300 }}>{partnerOnboard.data_get_partnerinformation_by_id.partner_code_parent ? partnerOnboard.data_get_partnerinformation_by_id.partner_code_parent : ""}</div>
          </div>
          <div style={{ display: 'flex' }} >
            <div style={{ width: 180, fontWeight: 'bold' }}>Assign Name</div>
            <div style={{ width: 300 }}>{partnerOnboard.data_get_partnerinformation_by_id.partner_code ? partnerOnboard.data_get_partnerinformation_by_id.partner_code : ""}</div>
          </div>
        </div>}
        {partnerOnboard.data_get_partnerinformation_by_id && <div style={{ display: 'flex', height: 30, flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }} >
            <div style={{ width: 180, fontWeight: 'bold' }}>Registered App Name</div>
            <div style={{ width: 300 }}>{partnerOnboard.data_get_partnerinformation_by_id.partner_abbreviation ? partnerOnboard.data_get_partnerinformation_by_id.partner_abbreviation : ""}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }} >
            <div style={{ width: 180, fontWeight: 'bold' }}>Product Name</div>
            <div style={{ width: 300 }}>{partnerOnboard.tmp_product_type.product_segment ? partnerOnboard.tmp_product_type.product_segment : ""}</div>
          </div>
        </div>}
        <div style={{ display: 'flex', height: 30, flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }} >
            <div style={{ width: 180, fontWeight: 'bold' }}>Service Name</div>
            <div style={{ width: 300 }}>{partnerOnboard.tmp_service_name ? partnerOnboard.tmp_service_name : ''}</div>
          </div>
        </div>
      </Row>

      <Row justify={'center'} style={{ width: '100%' }}>
        <GenerateFormAntd
          initialValues={data}
          onFinish={(e) => _handleFinish(e)}
          onFinishFailed={(e) => _handleFailure(e)}
          datasource={datasource}
          submitName={'next'}
        />
      </Row>
      {/* <GlPrincipalChange /> */}
    </div>

  )
}))

GlPrincipalSetup.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withRouter(withTranslation('common')(GlPrincipalSetup))
