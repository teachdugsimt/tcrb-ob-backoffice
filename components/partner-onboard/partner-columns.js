import { Table, Tag, Space } from 'antd'
import { inject, observer } from 'mobx-react'
import Link from 'next/link'
import { checkDefaultStatus } from '../data-utility';
export const partnerColumns = (partnerOnboard) => {

  return [
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   key: 'status',
    // },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => checkDefaultStatus(record.status, record.request_status)
    },
    {
      title: 'Parent Assign Name',
      dataIndex: 'partner_code',
      key: 'partner_code',
      // render: text => <div>{text}</div>,
    },
    {
      title: 'Assign Name',
      dataIndex: 'partner_code_group',
      key: 'partner_code_group',
    },
    {
      title: 'Registered Application Name',
      dataIndex: 'partner_abbreviation',
      key: 'partner_abbreviation',
    },
    {
      title: 'Juristic ID',
      dataIndex: 'partner_name_thai',
      key: 'partner_name_thai',
    },
    {
      title: 'Partner Contact Name',
      dataIndex: 'contact_name',
      key: 'contact_name',
    },
    {
      title: 'Partner Contact Email',
      dataIndex: 'contact_email',
      key: 'contact_email',
    },
    {
      title: 'Partner Contact Mobile No.',
      dataIndex: 'contact_mobile_no',
      key: 'contact_mobile_no',
    },
    {
      title: 'Juristic Name(TH)',
      dataIndex: 'partner_name_thai',
      key: 'partner_name_thai',
    },
    {
      title: 'Juristic Name(EN)',
      dataIndex: 'partner_name_thai',
      key: 'partner_name_thai',
    },

    {
      title: 'Setup',
      key: 'action',
      render: (text, record) => {
        return <Space size="middle">
          <Link href="/partner-auth-product" >
            <a style={{ color: 'orange' }} onClick={() => {
              partnerOnboard.setPartnerId(record.partner_code) // partner code
              partnerOnboard.setPartnerRealId(record.id) // partner code
            }}>Modify</a>
          </Link>
        </Space>
      },
    },
    {
      title: 'Offboard',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a style={{ zIndex: 2, color: 'orange' }} onClick={() => {
            let params = record
            partnerOnboard.deRegisterPartnerRequest(params)
          }}>De-register</a>
        </Space>
      ),
    },
  ];
}
