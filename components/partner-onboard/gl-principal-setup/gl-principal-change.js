import React, { useState } from 'react'
import { Row, Col, Button, Upload, Input, Modal, Menu, Dropdown, Table, Tag, Space } from 'antd'
import { withTranslation } from '../../../i18n'
import { DownOutlined } from '@ant-design/icons'

const GlPrincipalChange = () => {

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
          <div style={{ width: 300 }}>Release Loan</div>
        </div>
      </div>


      {/* //Partner GL for Debit/Credit Principal */}

      <div style={{ height: 180, border: '1px solid Lightgrey', marginTop: 20 }}>
        <div style={{ marginTop: 10, marginLeft: 10, fontWeight: 'bold', fontSize: 18, color: '#C4C4C4' }}>Partner GL for Debit/Credit Principal</div>
        <div style={{ height: 50, marginTop: 15, display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flex: 1, justifyContent: "center" }}>
            <div style={{ width: 200, display: 'flex', alignItems: 'center', paddingLeft: 25 }}>
              <div style={{ fontSize: 16, fontWeight: 'bold' }}>GL Branch</div>
            </div>
            <div style={{
              width: 400,

              padding: 10
            }}>
              <Input placeholder="" style={{ width: 250 }} />
            </div>
          </div>
          <div style={{ display: 'flex', flex: 1, justifyContent: "center" }}>
            <div style={{ width: 200, display: 'flex', alignItems: 'center', paddingLeft: 25 }}>
              <div style={{ fontSize: 16, fontWeight: 'bold' }}>GL Cost center</div>
            </div>
            <div style={{
              width: 400,

              padding: 10
            }}>
              <Input placeholder="" style={{ width: 250 }} />
            </div>
          </div>
        </div>
        <div style={{ height: 50, display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flex: 1, justifyContent: "center" }}>
            <div style={{ width: 200, display: 'flex', alignItems: 'center', paddingLeft: 25 }}>
              <div style={{ fontSize: 16, fontWeight: 'bold' }}>GL Product</div>
            </div>
            <div style={{
              width: 400,

              padding: 10
            }}>
              <Input placeholder="" style={{ width: 250 }} />
            </div>
          </div>
          <div style={{ display: 'flex', flex: 1, justifyContent: "center" }}>
            <div style={{ width: 200, display: 'flex', alignItems: 'center', paddingLeft: 25 }}>
              <div style={{ fontSize: 16, fontWeight: 'bold' }}>GL Account</div>
            </div>
            <div style={{
              width: 400,
              padding: 10
            }}>
              <Input placeholder="" style={{ width: 250 }} />
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20, marginRight: 50 }}>
        <Button type="primary">Submit</Button>
      </div>
    </div >
  )
}
export default withTranslation('common')(GlPrincipalChange)
