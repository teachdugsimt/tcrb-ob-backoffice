import React, { useEffect } from 'react'
import { Table, Tag, Space } from 'antd'
import { withTranslation } from '../../../i18n'
import { productModifyTable } from '../table-product-modify/product-modify-detail'
import { productModifyColumns } from '../table-product-modify/product-modify-column'
import { inject, observer } from 'mobx-react'

const TableProductModify = inject('partnerOnboard')(observer((props) => {
  const { t, partnerOnboard } = props
  useEffect(() => {
    partnerOnboard.getListServiceInformationById({
      product_code: partnerOnboard.tmp_product_code,
    })
  }, [])
  useEffect(() => {
    console.log("List partner services :: ", JSON.parse(JSON.stringify(partnerOnboard.partnerServiceList)))
    console.log("Service Information :: ", JSON.parse(JSON.stringify(partnerOnboard.data_getPartnerServiceInformationById)))
  }, [partnerOnboard.partnerServiceList, partnerOnboard.data_getPartnerServiceInformationById])

  return (
    <div style={{ paddingTop: 20 }}>
      <Table
        columns={productModifyColumns()}
        dataSource={partnerOnboard.partnerServiceList ? partnerOnboard.partnerServiceList : []}
        size="small"
      />
    </div>
  )
}))
export default withTranslation('common')(TableProductModify)
