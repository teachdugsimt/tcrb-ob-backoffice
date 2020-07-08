import React from 'react'
import { Table, Tag, Space } from 'antd'
import { withTranslation } from '../../i18n'
import { partnerTable } from './partner-detail'
import { partnerColumns } from './partner-columns'

const TablePartner = () => {
  return (
    <div style={{ paddingTop: 20 }}>
      <Table
        columns={partnerColumns()}
        dataSource={partnerTable()}
        size="small"
      />
    </div>
  )
}
export default withTranslation('common')(TablePartner)
