import React, { useState } from 'react'
import { PageHeader } from '../page-header';
import { Row, Col, Button, Input, Modal, Menu, Dropdown, Table, Tag, Space } from 'antd'
import { withTranslation } from '../../i18n'
import { useFormik, Formik } from 'formik'
import { DownOutlined } from '@ant-design/icons'

const AddNewProduct = (props) => {
  const [visible, setVisible] = useState(false)
  const { t } = props
  const { TextArea } = Input
  const data = []
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Transaction Code',
      dataIndex: 'transactionCode',
      key: 'transactionCode'
    }
  ]

  const menu = (
    <Menu>
      <Menu.Item>
        <div>Service 1</div>
      </Menu.Item>
      <Menu.Item>
        <div>Service 2</div>
      </Menu.Item>
      <Menu.Item>
        <div>Service 3</div>
      </Menu.Item>
      <Menu.Item danger>  <div>Service 4</div></Menu.Item>
    </Menu>
  );

  const formik = useFormik({
    initialValues: {
      productCode: '',
      productName_th: '',
      productName_en: '',
      productSegment: '',
      description: '',
      accountType: '',
      status: ''
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleOk = e => {
    console.log(e);
    setVisible(false)
  };

  const handleCancel = e => {
    console.log(e);
    setVisible(false)
  }

  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      <PageHeader>Add new product</PageHeader>
      <div style={{ height: 255, borderBottom: '1px  solid Lightgrey' }}>
        <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
            <div style={{ width: 150 }}>
              <label htmlFor="productCode">Product Code</label>
            </div>
            <div style={{ display: 'flex', width: 300 }}>
              <Input placeholder="Product Code" />
            </div>
          </div>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'row', marginTop: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div style={{ width: 150 }}>
                <label htmlFor="productName_th">Product Name(TH)</label>
              </div>
              <div style={{ display: 'flex', width: 300 }}>
                <Input placeholder="Product Name(TH)" />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 50 }}>
              <div style={{ width: 150 }}>
                <label htmlFor="productName_en">Product Name(EN)</label>
              </div>
              <div style={{ display: 'flex', width: 300 }}>
                <Input placeholder="Product Name(EN)" />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'row', marginTop: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div style={{ width: 150 }}>
                <label htmlFor="accountType">Account Type</label>
              </div>
              <div style={{ display: 'flex', width: 300 }}>
                <Input placeholder="Account Type" />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 50 }}>
              <div style={{ width: 150 }}>
                <label htmlFor="productSegment">Product Segment</label>
              </div>
              <div style={{ display: 'flex', width: 300 }}>
                <Input placeholder="Product Segment" />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
            <div style={{ width: 150 }}>
              <label htmlFor="descriptiom">Desscription</label>
            </div>
            <div style={{ display: 'flex', width: 800 }}>
              <TextArea placeholder="Desscription" />
            </div>
          </div>
        </form>
      </div>
      <div style={{ marginTop: 20 }}>
        <PageHeader>Grant Service</PageHeader>
        <Button type="primary" onClick={() => setVisible(true)}>Add</Button>
        <Table
          style={{ marginTop: 20 }}
          columns={columns}
          dataSource={data}
          size="small"
        />
      </div>
      <div style={{ height: 40, marginTop: 20, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Button type="primary">Submit</Button>
      </div>
      <Modal
        title="Select Service"
        visible={visible}
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
      >
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            Service 1 <DownOutlined />
          </a>
        </Dropdown>
      </Modal>
    </div >
  )
}

export default withTranslation('common')(AddNewProduct)
