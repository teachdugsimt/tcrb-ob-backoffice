import { Table, Tag, Space } from 'antd'
import Link from 'next/link'

export const productModifyColumns = (partnerOnboard) => {
  return [
    {
      title: 'Service Name',
      dataIndex: 'service_name',
      key: 'service_name'
      // render: text => <a>{text}</a>,
    },
    {
      title: 'Fee Type',
      dataIndex: 'feeType',
      key: 'feeType',
    },
    {
      title: 'Settlement Cycle',
      dataIndex: 'settlementCycle',
      key: 'settlementCycle',
    },
    {
      title: 'Principal GL & Fee Settlement',
      dataIndex: 'principalGL',
      key: 'principalGL',
      render: (text, record) => (
        <Space size="middle">
          <Link href="/gl-principal-setup">
            <a style={{ color: 'orange' }} onClick={() => {
              partnerOnboard.setServiceName(record.service_name)
            }}>change</a>
          </Link>
        </Space>
      ),
    },

    // {
    //   title: 'Fee & Settlement',
    //   dataIndex: 'fee_Settlement',
    //   key: 'fee_Settlement',
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <Link href="/fee-settlement-setup">
    //         <a style={{ color: 'orange' }}>change</a>
    //       </Link>
    //     </Space>
    //   ),
    // }
  ];
}
