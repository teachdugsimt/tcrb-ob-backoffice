import React from 'react'
import { Table, Tag, Space } from 'antd'
import { withTranslation } from '../../../i18n'
import { productModifyTable } from '../table-product-modify/product-modify-detail'
import { productModifyColumns } from '../table-product-modify/product-modify-column'

const TableProductModify = () => {
  return (
    <div style={{ paddingTop: 20 }}>
      <Table
        columns={productModifyColumns()}
        dataSource={productModifyTable()}
        size="small"
      />
    </div>
  )
}
export default withTranslation('common')(TableProductModify)
