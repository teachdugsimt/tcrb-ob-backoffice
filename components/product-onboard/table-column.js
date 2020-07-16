import { Table, Tag, Space } from 'antd'
import { TcrbPopconfirm } from '../antd-styles/styles'
import { checkDefaultStatus } from '../data-utility';

const productColumns = (viewEditProductSelect, deactivateProductSelect) => {
  return [
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => checkDefaultStatus(record.status, record.request_status)
    },
    {
      title: 'Product Code',
      dataIndex: 'product_code',
      // render: text => <a>{text}</a>,
    },
    {
      title: 'Product Name(TH)',
      dataIndex: 'product_name_thai',
    },
    {
      title: 'Product Name(EN)',
      dataIndex: 'product_name_english',
    },
    {
      title: 'Product Segment',
      dataIndex: 'product_segment',
    },
    {
      title: 'Description',
      dataIndex: 'product_description',
    },
    {
      title: 'Account Type',
      dataIndex: 'account_type',
    },
    {
      title: 'Action',
      key: 'action',
      width: '10%',
      render: (text, record) => {
        if (record.status == 'ACTIVE') {
          if (record.request_status == 'APPROVE' || record.request_status == 'REJECT') {
            return (
              <Space style={{ textAlign: "center" }}>
                <a style={{ color: 'orange' }} onClick={() => viewEditProductSelect(record)}>Edit</a>

                <TcrbPopconfirm title="Sure to Deactivate?" onConfirm={() => deactivateProductSelect(record)}>
                  <a style={{ color: '#FBA928' }}>Deactivate</a>
                </TcrbPopconfirm>
              </Space>
            )
          } else if (record.request_status == 'PENDING') {
            return null
          }

        } else if (record.status == 'INACTIVE') {
          if (record.request_status == 'PENDING') {
            return null
          }
        } else {
          return null
        }
      }

    },
  ];
}

const productServiceColumn = (deactivateServiceSelect) => {
  return [
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => checkDefaultStatus(record.status, record.request_status)
    },
    {
      title: 'Name',
      dataIndex: 'service',
      render: (text, record) => record.service.name,
    },
    {
      title: 'Transaction Code',
      dataIndex: 'transaction_code',
    },
    {
      title: 'Action',
      key: 'action',
      width: '10%',
      render: (text, record) => {
        if (record.status == 'ACTIVE') {
          if (record.request_status == 'APPROVE' || record.request_status == 'REJECT') {
            return (
              <div style={{ textAlign: "center" }}>

                <TcrbPopconfirm title="Sure to Deactivate?" onConfirm={() => deactivateServiceSelect(record)}>
                  <a style={{ color: '#FBA928' }}>Deactivate</a>
                </TcrbPopconfirm>
              </div>
            )
          } else if (record.request_status == 'PENDING') {
            return null
          }

        } else if (record.status == 'INACTIVE') {
          if (record.request_status == 'PENDING') {
            return null
          }
        } else {
          return null
        }
      }

    },
  ];
}
export {
  productColumns,
  productServiceColumn
}
