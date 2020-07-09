import React from 'react'
import { Table, Tag, Space } from 'antd'
import { withTranslation } from '../../i18n'
import { productRegTable } from './table-product-detail'
import { productRegColumns } from './table-product-columns'

const TablePtoductReg = () => {
  return (
    <div style={{ paddingTop: 20 }}>
      <Table
        columns={productRegColumns()}
        dataSource={productRegTable()}
        size="small"
      />
    </div>
  )
}
export default withTranslation('common')(TablePtoductReg)
