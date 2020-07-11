import React, { useState } from 'react'
import { Row, Col, Button, Upload, Input, Modal, Menu, Dropdown, Table, Tag, Space } from 'antd'
import { withTranslation } from '../../i18n'
import TableProductReg from './table-product-reg'
import { DownOutlined } from '@ant-design/icons'

const ProductReg = () => {
  const [visible, setVisible] = useState(false)
  const menu = (
    <Menu>
      <Menu.Item>
        <div style={{ width: 60 }}>NE</div>
      </Menu.Item>
      <Menu.Item>
        <div style={{ width: 60 }}>NJ</div>
      </Menu.Item>
      <Menu.Item>
        <div style={{ width: 60 }}>OB</div>
      </Menu.Item>

    </Menu>
  );
  const handleOk = e => {
    console.log(e);
    setVisible(false)
  };

  const handleCancel = e => {
    console.log(e);
    setVisible(false)
  }
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
      </div>
      <div style={{ marginTop: 20 }}>
        <Button type="primary" onClick={() => setVisible(true)}>Grant Product</Button>
        <Button type="primary" onClick={() => setVisible(true)} style={{ marginLeft: 30 }}>Upload Products</Button>
      </div>
      <TableProductReg />
      <Modal
        title="Select Product"
        visible={visible}
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
      >
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            NE <DownOutlined />
          </a>
        </Dropdown>
      </Modal>
    </div >
  )
}
export default withTranslation('common')(ProductReg)
