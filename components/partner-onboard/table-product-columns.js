import { Table, Tag, Space } from 'antd'
import Link from 'next/link'

export const productRegColumns = (partnerOnboard) => {
  return [
    {
      title: 'Product Code',
      dataIndex: 'product_code',
      key: 'product_code'
      // render: text => <a>{text}</a>,
    },
    {
      title: 'Product Name(TH)',
      dataIndex: 'product_name_thai',
      key: 'product_name_thai',
    },
    {
      title: 'Product Name(EN)',
      dataIndex: 'product_name_english',
      key: 'product_name_english',
    },
    {
      title: 'Product Section',
      dataIndex: 'product_segment',
      key: 'product_segment',
    },

    {
      title: 'Account Type',
      dataIndex: 'product_account_type',
      key: 'product_account_type',
    },
    {
      title: 'Authorized Services',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Link href="/partner-auth-product-modify">
            <a style={{ color: 'orange' }} onClick={() => {
              partnerOnboard.setProductCode(record.product_code)
              partnerOnboard.setProductType(record)
            }}>Modify</a>
          </Link>
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a style={{ color: 'orange' }} onClick={() => partnerOnboard.deletePartnerProduct({ id: record.id })}>Delete</a>
        </Space>
      ),
    },
  ];
}
