import React, { useEffect } from 'react'
import { Table, Tag, Space } from 'antd'
import { withTranslation } from '../../../i18n'
import { productModifyTable } from '../table-product-modify/product-modify-detail'
import { productModifyColumns } from '../table-product-modify/product-modify-column'
import { inject, observer } from 'mobx-react'
import { TcrbSpin } from '../../antd-styles/styles'

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
     <TcrbSpin spinning={partnerOnboard.fetching_onboard} size="large" tip="Loading..." >
        <Table
          columns={productModifyColumns(partnerOnboard)}
          dataSource={partnerOnboard.partnerServiceList ? partnerOnboard.partnerServiceList : []}
          size="small"
        />
      </TcrbSpin>
    </div>
  )
}))
export default withTranslation('common')(TableProductModify)
