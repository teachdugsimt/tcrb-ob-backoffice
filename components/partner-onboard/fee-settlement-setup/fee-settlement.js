import React, { useState } from 'react'
import { Row, Col, Button, Upload, Input, Modal, Menu, Dropdown, Table, Tag, Space } from 'antd'
import { withTranslation } from '../../../i18n'
import FeeSettlementForm from './fee-settlement-form'
import { DownOutlined } from '@ant-design/icons'
import { inject, observer } from 'mobx-react'

const FeeSettleMentSetup = inject('partnerOnboard', 'loginStore')(observer((props) => {
  const { t, partnerOnboard } = props
  return (
    <div style={{ marginTop: 10 }}>

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

      <FeeSettlementForm />

    </div >
  )
}))

FeeSettleMentSetup.getInitialProps = async () => ({
  namespacesRequired: [],
})
export default withTranslation('common')(FeeSettleMentSetup)
