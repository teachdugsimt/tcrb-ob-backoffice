import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Upload, Input, Modal, Menu, Dropdown, Table, Tag, Space } from 'antd'
import { withTranslation } from '../../i18n'
import TableProductModify from './table-product-modify/table-product-modify'
import { DownOutlined } from '@ant-design/icons'
import { inject, observer } from 'mobx-react'

const ProductModify = inject('partnerOnboard')(observer((props) => {
  const { t, partnerOnboard } = props
  useEffect(() => {
    console.log("PARTNER CODE :: ", JSON.parse(JSON.stringify(partnerOnboard.tmp_partner_id)))
    console.log("PRODUCT CODE :: ", JSON.parse(JSON.stringify(partnerOnboard.tmp_product_code)))
    partnerOnboard.getDataPartnerProductService({
      partner_code: partnerOnboard.tmp_partner_id,
      product_code: partnerOnboard.tmp_product_code,
    })
  }, [partnerOnboard.tmp_product_code, partnerOnboard.tmp_partner_id])

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
        <div style={{ display: 'flex' }} >
          <div style={{ width: 180, fontWeight: 'bold' }}>Product Name</div>
          <div style={{ width: 300 }}>{partnerOnboard.tmp_product_type.product_segment ? partnerOnboard.tmp_product_type.product_segment : ""}</div>
        </div>
      </div>}

      <TableProductModify />

    </div >
  )
}))
export default withTranslation('common')(ProductModify)
