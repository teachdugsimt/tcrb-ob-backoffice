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
      dataIndex: 'bin_originate_on',
      // render: text => <a>{text}</a>,
    },
    {
      title: 'SFTP Date',
      dataIndex: 'bin_sftp_on',
    },
    {
      title: 'Type',
      dataIndex: 'acc_account_type',
    },
    {
      title: 'Transaction ID',
      dataIndex: 'product_segment',
    },
    {
      title: 'Channel',
      dataIndex: 'acc_channel',
    },
    {
      title: 'Entity',
      dataIndex: 'account_type',
    },
    {
      title: 'Product Type',
      dataIndex: 'account_type',
    },
    {
      title: 'Account Reference',
      dataIndex: 'account_type',
    },
    {
      title: 'Main A/C No',
      dataIndex: 'account_type',
    },
    {
      title: 'Sub A/C No',
      dataIndex: 'account_type',
    },
    {
      title: 'Customer Name',
      dataIndex: 'account_type',
    },
    {
      title: 'Binding Status',
      dataIndex: 'account_type',
    },
    {
      title: 'Status Date',
      dataIndex: 'account_type',
    },
    {
      title: 'Partner\'\s Response Status',
      dataIndex: 'account_type',
    },
    {
      title: 'Partner\'\s Response Date/Time',
      dataIndex: 'account_type',
    }
  ];
}

export {
  eligibleColumn,
}
