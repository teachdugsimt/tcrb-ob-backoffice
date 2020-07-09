import { Table, Tag, Space } from 'antd'
import { inject, observer } from 'mobx-react'
import Link from 'next/link'
export const partnerColumns = () => {

  return [
    {
      title: 'Parent Assign Name',
      dataIndex: 'parentAssignName',
      key: 'parentAssignName',
      // render: text => <div>{text}</div>,
    },
    {
      title: 'Assign Name',
      dataIndex: 'assignName',
      key: 'assignName',
    },
    {
      title: 'Registered Application Name',
      dataIndex: 'registeredApplicationName',
      key: 'registeredApplicationName',
    },
    {
      title: 'Juristic ID',
      dataIndex: 'juristicID',
      key: 'juristicID',
    },
    {
      title: 'Partner Contact Email',
      dataIndex: 'partnerContactEmail',
      key: 'partnerContactEmail',
    },
    {
      title: 'Partner Contact Mobile No.',
      dataIndex: 'partnerContactMobileNo',
      key: 'partnerContactMobileNo',
    },
    {
      title: 'Partner Contact Name',
      dataIndex: 'partnerContactName',
      key: 'partnerContactName',
    },
    {
      title: 'Juristic Name(TH)',
      dataIndex: 'juristicName_th',
      key: 'juristicName_th',
    },
    {
      title: 'Juristic Name(EN)',
      dataIndex: 'juristicName_en',
      key: 'juristicName_en',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Setup',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">

          <Link href="/partner-auth-product">
            <a style={{ color: 'orange' }}>Modify</a>
          </Link>

        </Space>
      ),
    },
    {
      title: 'Offboard',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a style={{ color: 'orange' }}>De-register</a>
        </Space>
      ),
    },
  ];
}
