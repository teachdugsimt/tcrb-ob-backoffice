import { Table, Tag, Space } from 'antd'
import { TcrbPopconfirm } from '../antd-styles/styles'
import { checkDefaultStatus } from '../data-utility';

const eligibleColumn = (viewEditProductSelect, deactivateProductSelect) => {
  return [
    {
      title: 'No',
      // dataIndex: 'status',
      render: (text, record, index) => index + 1
    },
    {
      title: 'Origination Date',
      dataIndex: 'originate_on',
      // render: text => <a>{text}</a>,
    },
    {
      title: 'SFTP Date',
      dataIndex: 'sftp_on',
    },
    {
      title: 'Type',
      dataIndex: 'file_type',
    },
    {
      title: 'Transaction ID',
      dataIndex: 'transaction_refe',
    },
    {
      title: 'Channel',
      dataIndex: 'partner_abbreviation',
    },
    {
      title: 'Entity',
      dataIndex: 'partner_code',
    },
    {
      title: 'Product Type',
      dataIndex: 'product_type',
    },
    {
      title: 'Account Reference',
      dataIndex: 'account_reference',
    },
    {
      title: 'Main A/C No',
      dataIndex: 'main_account_no',
    },
    {
      title: 'Sub A/C No',
      dataIndex: 'sub_account_no',
    },
    {
      title: 'Customer Name',
      dataIndex: 'account_name',
    },
    {
      title: 'Binding Status',
      dataIndex: 'account_type',
    },
    {
      title: 'Status Date',
      dataIndex: 'update_on',
    },
    {
      title: 'Partner\'\s Response Status',
      dataIndex: 'partnerResponseSta',
    },
    {
      title: 'Partner\'\s Response Date/Time',
      dataIndex: 'partnerResponseDateTime',
    }
  ];
}

export {
  eligibleColumn,
}
