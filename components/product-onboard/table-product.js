import React from 'react'
import { Table, Tag, Space } from 'antd'
import { withTranslation } from '../../i18n'
import { productTable } from './table-detail'
import { productColumns } from './table-column'

const TableProduct = () => {
  return (
    <div style={{ paddingTop: 20 }}>
      <Table
        columns={productColumns()}
        dataSource={productTable()}
        size="small"
      />
    </div>
  )
}
export default withTranslation('common')(TableProduct)
