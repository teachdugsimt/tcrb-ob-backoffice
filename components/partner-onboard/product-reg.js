import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Upload, Input, Modal, Menu, Dropdown, Table, Select, Tag, Space } from 'antd'
import { withTranslation } from '../../i18n'
import TableProductReg from './table-product-reg'
import { DownOutlined } from '@ant-design/icons'
import { inject, observer } from 'mobx-react'
import _ from "lodash";
const { Option } = Select;

const ProductReg = inject('partnerOnboard')(observer((props) => {
  const [visible, setVisible] = useState(false)
  const [valueProduct, setValueProduct] = useState(null)
  const [awakeDropdown, setawakeDropdown] = useState(0)
  const { t, partnerOnboard } = props
  useEffect(() => {
  }, [partnerOnboard.data_get_partnerinformation_by_id])

  useEffect(() => {
    if (partnerOnboard.data_partner_product_code_dropdown && partnerOnboard.data_partner_product_code_dropdown.length > 0) {
      setawakeDropdown(1)
      console.log(JSON.parse(JSON.stringify(partnerOnboard.data_partner_product_code_dropdown)))
    }
  }, [partnerOnboard.data_partner_product_code_dropdown])

  const handleOk = e => {
    console.log(e);
    partnerOnboard.submitAddNewPartnerProduct({
      partner_code: partnerOnboard.tmp_partner_id,
      product_code: valueProduct,
    })
    setVisible(false)
  };

  const handleCancel = e => {
    console.log(e);
    setVisible(false)
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
      </div>}
      <div style={{ marginTop: 20 }}>
        <Button type="primary" onClick={() => {
          // unique here
          let unique_array = _.uniqBy(partnerOnboard.partnerProductList, 'product_code')
          let result = unique_array.map(a => a.product_code)
          partnerOnboard.getDataPartnerProductDropdown(result)
          setVisible(true)
        }}>Grant Product</Button>
        <Button type="primary" onClick={() => setVisible(true)} style={{ marginLeft: 30 }}>Upload Products</Button>
      </div>
      <TableProductReg />
      <Modal
        title="Select Product"
        visible={visible && partnerOnboard.fetching_onboard == false}
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
      >
        <Select defaultValue="Select" value={valueProduct ? valueProduct : t("pleaseSelect")} onChange={(value) => {
          console.log("Value :: ", value)
          setValueProduct((value).toString())
        }} style={{ width: "100%" }}>
          {awakeDropdown == 1 && partnerOnboard.data_partner_product_code_dropdown && partnerOnboard.data_partner_product_code_dropdown.length > 0 && JSON.parse(JSON.stringify(partnerOnboard.data_partner_product_code_dropdown)).filter(item => item.product_type)
            .map((e, i) => {
              return <Select.Option value={e.product_code}>{e.product_type}</Select.Option>
            })}
        </Select>

      </Modal>
    </div >
  )
}))
export default withTranslation('common')(ProductReg)



