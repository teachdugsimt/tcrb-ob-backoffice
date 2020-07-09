import React, { useState } from 'react'
import { Row, Col, Button, Upload, Input, Modal, Menu, Dropdown, Table, Tag, Space } from 'antd'
import { withTranslation } from '../../../i18n'
import FeeSettlementForm from './fee-settlement-form'
import { DownOutlined } from '@ant-design/icons'

const FeeSettleMentSetup = () => {

  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ display: 'flex', height: 30, flexDirection: 'row' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }} >
          <div style={{ width: 180, fontWeight: 'bold' }}>Parent Assign Name</div>
          <div style={{ width: 300 }}>TMDS</div>
        </div>
        <div style={{ display: 'flex' }} >
          <div style={{ width: 180, fontWeight: 'bold' }}>Assign Name</div>
          <div style={{ width: 300 }}>TMDS</div>
        </div>
      </div>
      <div style={{ display: 'flex', height: 30, flexDirection: 'row' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }} >
          <div style={{ width: 180, fontWeight: 'bold' }}>Registered App Name</div>
          <div style={{ width: 300 }}>MicroPay</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }} >
          <div style={{ width: 180, fontWeight: 'bold' }}>Product Name</div>
          <div style={{ width: 300 }}>NE</div>
        </div>
      </div>
      <div style={{ display: 'flex', height: 30, flexDirection: 'row' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }} >
          <div style={{ width: 180, fontWeight: 'bold' }}>Service Name</div>
          <div style={{ width: 300 }}>Binding</div>
        </div>
      </div>

      <FeeSettlementForm />

    </div >
  )
}
export default withTranslation('common')(FeeSettleMentSetup)
