import { Table, Tag, Space } from 'antd'

export const productColumns = () => {
  return [
    {
      title: 'Product Code',
      dataIndex: 'partnerCode',
      key: 'partnerCode'
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
      title: 'Product Segment',
      dataIndex: 'productSegment',
      key: 'productSegment',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Account Type',
      dataIndex: 'accountType',
      key: 'accountType',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a style={{ color: 'orange' }}>Delete</a>
        </Space>
      ),
    },
  ];
}
