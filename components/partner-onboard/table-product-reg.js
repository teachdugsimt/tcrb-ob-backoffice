import React from 'react'
import { Table, Tag, Space } from 'antd'
import { withTranslation } from '../../i18n'
import { productRegTable } from './table-product-detail'
import { productRegColumns } from './table-product-columns'
import { inject, observer } from 'mobx-react'

const TablePtoductReg = inject('partnerOnboard')(observer((props) => {
  const { partnerOnboard } = props

  return (
    <div style={{ paddingTop: 20 }}>
      <Table
        columns={productRegColumns(partnerOnboard)}
        dataSource={partnerOnboard.partnerProductList ? JSON.parse(JSON.stringify(partnerOnboard.partnerProductList)) : []}
        size="small"
      />
    </div>
  )
}))
export default withTranslation('common')(TablePtoductReg)
