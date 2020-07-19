import React, { useEffect } from 'react'
import { Table, Tag, Space } from 'antd'
import { withTranslation } from '../../i18n'
import { partnerTable } from './partner-detail'
import { partnerColumns } from './partner-columns'
import { inject, observer } from 'mobx-react'

const TablePartner = inject('partnerOnboard')(observer((props) => {
  const { t, partnerOnboard } = props

  useEffect(() => {
    partnerOnboard.getPartnerOnboard()
  }, [])

  useEffect(() => {

    const propsOnboard = JSON.parse(JSON.stringify(partnerOnboard.data_partner_onboard))
    console.log("Props on board :: ", propsOnboard)

  }, [partnerOnboard.data_partner_onboard])
  return (
    <div style={{ paddingTop: 20 }}>
      <Table
        // columns={partnerColumns()}
        columns={partnerColumns(partnerOnboard)}
        dataSource={partnerOnboard.data_partner_onboard ? partnerOnboard.data_partner_onboard : []}
        // dataSource={partnerTable()}
        size="small"
      />
    </div>
  )
}))
export default withTranslation('common')(TablePartner)
