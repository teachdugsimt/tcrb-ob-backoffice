import { Table, Tag, Space } from 'antd'
import Link from 'next/link'

export const productRegColumns = () => {
  return [
    {
      title: 'Product Code',
      dataIndex: 'productCode',
      key: 'productCode'
      // render: text => <a>{text}</a>,
    },
    {
      title: 'Product Name(TH)',
      dataIndex: 'productName_TH',
      key: 'productName_TH',
    },
    {
      title: 'Product Name(EN)',
      dataIndex: 'productName_EN',
      key: 'productName_EN',
    },
    {
      title: 'Product Section',
      dataIndex: 'productSection',
      key: 'productSection',
    },

    {
      title: 'Account Type',
      dataIndex: 'accountType',
      key: 'accountType',
    },
    {
      title: 'Authorized Services',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Link href="/partner-auth-product-modify">
            <a style={{ color: 'orange' }}>Modify</a>
          </Link>
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a style={{ color: 'orange' }}>Delete</a>
        </Space>
      ),
    },
  ];
}
