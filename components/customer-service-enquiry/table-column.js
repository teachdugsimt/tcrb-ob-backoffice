import moment from 'moment'
import getColumnSearchProps from './filter-box'
import { addCommaInData } from '../data-utility';
import { withTranslation } from '../../i18n';

export const clmTranInfo = (handleSearch, handleReset) => {
  return [
    {
      title: "number",
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: "tranDate",
      dataIndex: 'date',
      key: 'date',
      ...getColumnSearchProps('date', handleSearch, handleReset, 'Tran Time'),
      render: (text, record) => moment(text).format('ll')
    },
    {
      title: "entity",
      key: 'parent_partner_code',
      dataIndex: 'parent_partner_code',
      ...getColumnSearchProps('parent_partner_code', handleSearch, handleReset, 'Entity')
    },
    {
      title: "channel",
      key: 'channel',
      dataIndex: 'channel',
      ...getColumnSearchProps('channel', handleSearch, handleReset, 'Channel')
    },
    {
      title: "tranType",
      key: 'transaction_type',
      dataIndex: 'transaction_type',
      ...getColumnSearchProps('transaction_type', handleSearch, handleReset, 'Tran Type')

    },
    {  // ** Wait Tum Confirm
      title: "tranSubType",
      key: 'transaction_sub_type',
      dataIndex: 'transaction_sub_type',
    },
    {
      title: "prodType",
      key: 'product_type',
      dataIndex: 'product_type',
      ...getColumnSearchProps('product_type', handleSearch, handleReset, 'Prod Type')
    },
    {
      title: "accountNo",
      key: 'account_no',
      dataIndex: 'account_no',
      ...getColumnSearchProps('account_no', handleSearch, handleReset, 'A/C No.')
    },
    {
      title: "amount",
      key: 'amount',
      dataIndex: 'amount',
      render: (text, record) => <div style={{ textAlign: 'right' }}>{addCommaInData(text, true)}</div>
    },
    {
      title: "status",
      key: 'status',
      dataIndex: 'status',
      ...getColumnSearchProps('status', handleSearch, handleReset, 'Status')
    },
  ];
}

export const clmPartnerInfo = (handleSearch, handleReset, t) => {
  return [
    {
      title: "number",
      dataIndex: 'no',
      key: 'no',
      render: text => <div>{text}</div>,
    },
    {
      title: "partnerTranRef",
      dataIndex: 'partner_transaction_reference',
      key: 'partner_transaction_reference',
      ...getColumnSearchProps('partner_transaction_reference', handleSearch, handleReset, 'Partner TranRef')
    },
    {
      title: "partnerReqID",
      dataIndex: 'request_id',
      key: 'request_id',
      ...getColumnSearchProps('request_id', handleSearch, handleReset, 'Partner ReqID')
    },
    {
      title: "bankTranRef",
      key: 'transaction_reference',
      dataIndex: 'transaction_reference',
      ...getColumnSearchProps('transaction_reference', handleSearch, handleReset, 'Bank TranRef')
    },
    {
      title: "mobileNumber",
      key: 'mobile_no',
      dataIndex: 'mobile_no',
      ...getColumnSearchProps('mobile_no', handleSearch, handleReset, 'Mobile Number')
    }
  ];
}

export const clmAccInfo = (handleSearch, handleReset, t) => {
  return [
    {
      title: "number",
      dataIndex: 'no',
      key: 'no',
      render: text => <div>{text}</div>,
    },
    {
      title: "tcrbAccountRef",
      dataIndex: 'tcrb_account_reference',
      key: 'tcrb_account_reference',
      ...getColumnSearchProps('tcrb_account_reference', handleSearch, handleReset, 'TCRB AccountRef')
    },
    {
      title: "subAC",
      dataIndex: 'sub_account',
      key: 'sub_account',
      ...getColumnSearchProps('sub_account', handleSearch, handleReset, 'Sub A/C')
    },
    {
      title: "accountName",
      key: 'account_name',
      dataIndex: 'account_name',
      ...getColumnSearchProps('account_name', handleSearch, handleReset, 'Account Name')
    },
    {
      title: "accRef1",
      key: 'reference_1',
      dataIndex: 'reference_1',
    },
    {
      title: "accRef2",
      key: 'reference_2',
      dataIndex: 'reference_2',
    },
    {
      title: "accRef3",
      key: 'reference_3',
      dataIndex: 'reference_3',
    },
  ];
}

export const clmTxn = (handleSearch, handleReset, t) => {
  return [
    {
      title: "number",
      dataIndex: 'no',
      key: 'no',
      render: text => <div>{text}</div>,
    },
    {
      title: "txnDREntry",
      dataIndex: 'transaction_debit_entry',
      key: 'transaction_debit_entry',
      ...getColumnSearchProps('transaction_debit_entry', handleSearch, handleReset, 'Txn-DR_Entry')
    },
    {
      title: "txnCREntry",
      dataIndex: 'transaction_credit_entry',
      key: 'transaction_credit_entry',
      ...getColumnSearchProps('transaction_credit_entry', handleSearch, handleReset, 'Txn-CR_Entry')
    },
    {
      title: "feeDREntry",
      key: 'fee_debit_entries',
      dataIndex: 'fee_debit_entries',
    },
    {
      title: "feeDRAMT",
      key: 'fee_amount',
      dataIndex: 'fee_amount',
    },
    {
      title: "feeCREntry",
      key: 'bank_income_fee_entries',
      dataIndex: 'bank_income_fee_entries',
    },
    {
      title: "feeCRAMT",
      key: 'bank_income_fee',
      dataIndex: 'bank_income_fee',
    },
    {
      title: "amt",
      key: 'amount',
      dataIndex: 'amount',
      render: (text, record) => <div style={{ textAlign: 'right' }}>{addCommaInData(text, true)}</div>
    },
  ];
}
