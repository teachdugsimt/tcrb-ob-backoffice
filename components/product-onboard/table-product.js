import React from 'react'
import { Table, Tag, Space } from 'antd'
import { withTranslation } from '../../i18n'

const data = [
  {
    key: '1',
    partnerCode: 'abc',
    productName_TH: 'abc',
    productName_EN: 'abc',
    productSegment: 'Unkonw',
    description: 'product detail for test',
    accountType: '01',
    status: 'ok'
  },
  {
    key: '2',
    partnerCode: 'abc',
    productName_TH: 'abc',
    productName_EN: 'abc',
    productSegment: 'Unkonw',
    description: 'product detail for test',
    accountType: '01',
    status: 'ok'
  },
  {
    key: '3',
    partnerCode: 'abc',
    productName_TH: 'abc',
    productName_EN: 'abc',
    productSegment: 'Unkonw',
    description: 'product detail for test',
    accountType: '01',
    status: 'ok'
  },
  // {
  //   key: '2',
  //   name: 'Jim Green',
  //   age: 42,
  //   address: 'London No. 1 Lake Park',
  //   tags: ['loser'],
  // },
  // {
  //   key: '3',
  //   name: 'Joe Black',
  //   age: 32,
  //   address: 'Sidney No. 1 Lake Park',
  //   tags: ['cool', 'teacher'],
  // },
];

const columns = [
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
  // {
  //   title: 'Tags',
  //   key: 'tags',
  //   dataIndex: 'tags',
  //   render: tags => (
  //     <>
  //       {tags.map(tag => {
  //         let color = tag.length > 5 ? 'geekblue' : 'green';
  //         if (tag === 'loser') {
  //           color = 'volcano';
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </>
  //   ),
  // },
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

const TableProduct = () => {
  return (
    <div style={{ paddingTop: 20 }}>

      <Table
        columns={columns}
        dataSource={data}
        size="small"
      />

    </div>
  )
}
export default withTranslation('common')(TableProduct)
