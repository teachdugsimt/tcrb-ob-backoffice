import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Upload, Input, Modal, Menu, Dropdown, Table, Select, Space } from 'antd'
import { withTranslation } from '../../i18n'
import TableProductModify from './table-product-modify/table-product-modify'
import { DownOutlined } from '@ant-design/icons'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'

const ProductModify = inject('partnerOnboard')(observer((props) => {
  const { t, partnerOnboard } = props
  const [visible, setvisible] = useState(false)
  const [service_select, setServiceSelect] = useState(null)
  const [awakeRender, setawakeRender] = useState(0)
  const [tmpAddPartnerService, settmpAddPartnerService] = useState(null)
  useEffect(() => {
    console.log("PARTNER CODE :: ", JSON.parse(JSON.stringify(partnerOnboard.tmp_partner_id)))
    console.log("PRODUCT CODE :: ", JSON.parse(JSON.stringify(partnerOnboard.tmp_product_code)))
    partnerOnboard.getDataPartnerProductService({
      partner_code: partnerOnboard.tmp_partner_id,
      product_code: partnerOnboard.tmp_product_code,
    })
    partnerOnboard.getProductServicesDropdown(partnerOnboard.tmp_product_code)
  }, [partnerOnboard.tmp_product_code, partnerOnboard.tmp_partner_id])

  useEffect(() => {
    if (partnerOnboard.data_addNewPartnerService && partnerOnboard.data_addNewPartnerService != null) {
      if(partnerOnboard.data_addNewPartnerService != tmpAddPartnerService) {
        settmpAddPartnerService(partnerOnboard.data_addNewPartnerService)
        partnerOnboard.getDataPartnerProductService({
          partner_code: partnerOnboard.tmp_partner_id,
          product_code: partnerOnboard.tmp_product_code,
        })
      }
    }
  }, [partnerOnboard.data_addNewPartnerService, partnerOnboard.tmp_product_code, partnerOnboard.tmp_partner_id])

  useEffect(() => {
    if (partnerOnboard.data_getProductServicesDropdown && partnerOnboard.data_getProductServicesDropdown.length > 0) {
      setawakeRender(1)
    }
  }, [partnerOnboard.data_getProductServicesDropdown])

  const _addNewService = () => {
    if (service_select) {
      partnerOnboard.addNewPartnerService({
        partner_code: partnerOnboard.tmp_partner_id,
        product_code: partnerOnboard.tmp_product_code,
        service_id: service_select
      })
      setvisible(false)
    } else {
      setvisible(false)
    }
  }

  const _onCancel = () => {
    setvisible(false)
  }

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
      <Button type="primary" onClick={() => {
        console.log("************************** ")
        console.log("partnerOnboard.tmp_product_code", partnerOnboard.tmp_product_code)
        // partnerOnboard.getProductServicesDropdown(partnerOnboard.tmp_product_code)
        setvisible(true)
        // show popup
      }}>Add new service</Button>
      <Modal
        title="Add new product service"
        visible={visible && partnerOnboard.fetching_onboard == false}
        onOk={_addNewService}
        onCancel={_onCancel}
      >
        <Select defaultValue="Select" value={service_select} onChange={(val) => setServiceSelect(val)} style={{ width: "100%" }}>
          {awakeRender == 1 && partnerOnboard.data_getProductServicesDropdown && partnerOnboard.data_getProductServicesDropdown.length > 0 && JSON.parse(JSON.stringify(partnerOnboard.data_getProductServicesDropdown)).filter(it => it.service_name)
            .map((e, i) => {
              return <Select.Option key={i + "-service"} value={e.service_id}>{e.service_name}</Select.Option>
            })}
        </Select>

      </Modal>
      <TableProductModify />

    </div >
  )
}))
export default withRouter(withTranslation('common')(ProductModify))
