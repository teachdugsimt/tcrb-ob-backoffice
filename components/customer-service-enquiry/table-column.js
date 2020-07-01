import moment from 'moment'
import { getColumnSearchProps } from './filter-box'
import { addCommaInData } from '../data-utility';

export const clmTranInfo = (handleSearch, handleReset) => {
  return [
    {
      title: 'No.',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: 'Tran Time',
      dataIndex: 'date',
      key: 'date',
      ...getColumnSearchProps('date', handleSearch, handleReset, 'Tran Time'),
    },
    {
      title: 'Entity',
      key: 'parent_partner_code',
      dataIndex: 'parent_partner_code',
      ...getColumnSearchProps('parent_partner_code', handleSearch, handleReset, 'Entity')

    },
    {
      title: 'Channel',
      key: 'channel',
      dataIndex: 'channel',
      ...getColumnSearchProps('channel', handleSearch, handleReset, 'Channel')
    },
    {
      title: 'Tran Type',
      key: 'transaction_type',
      dataIndex: 'transaction_type',
      ...getColumnSearchProps('transaction_type', handleSearch, handleReset, 'Tran Type')

    },
    {  // ** Wait Tum Confirm
      title: 'Tran SubType',
      key: 'transaction_sub_type',
      dataIndex: 'transaction_sub_type',
    },
    {
      // if(transaction_type == TOPUP)  sender product type
      // if(transaction_type == RPYMNT) receiver product type
      title: 'Prod Type',
      key: 'product_type',
      dataIndex: 'product_type',
      ...getColumnSearchProps('product_type', handleSearch, handleReset, 'Prod Type')
    },
    {
      // if(transaction_type == TOPUP) sender_main_account_value
      //  if(transaction_type == RPYMNT) receiver_main_account_value
      title: 'A/C No.',
      key: 'account_no',
      dataIndex: 'account_no',
      ...getColumnSearchProps('account_no', handleSearch, handleReset, 'A/C No.')
    },
    {
      title: 'Amount',
      key: 'amount',
      dataIndex: 'amount',
      render: (text, record) => <div style={{ textAlign: 'right' }}>{addCommaInData(text, true)}</div>
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      ...getColumnSearchProps('status', handleSearch, handleReset, 'Status')
    },
  ];
}

export const clmPartnerInfo = (handleSearch, handleReset) => {
  return [
    {
      title: 'No.',
      dataIndex: 'no',
      key: 'no',
      render: text => <div>{text}</div>,
    },
    {
      title: 'Partner TranRef',
      dataIndex: 'partner_transaction_reference',
      key: 'partner_transaction_reference',
      ...getColumnSearchProps('partner_transaction_reference', handleSearch, handleReset, 'Partner TranRef')
    },
    {
      title: 'Partner ReqID',
      dataIndex: 'request_id',
      key: 'request_id',
      ...getColumnSearchProps('request_id', handleSearch, handleReset, 'Partner ReqID')
    },
    {
      title: 'Bank TranRef',
      key: 'transaction_reference',
      dataIndex: 'transaction_reference',
      ...getColumnSearchProps('transaction_reference', handleSearch, handleReset, 'Bank TranRef')
    },
    {
      // if(transaction_type == TOPUP) sender_proxy_value
      // if(transaction_type == RPYMNT) receiver_proxy_value
      title: 'Mobile Number',
      key: 'mobile_no',
      dataIndex: 'mobile_no',
      ...getColumnSearchProps('mobile_no', handleSearch, handleReset, 'Mobile Number')
    }
  ];
}

export const clmAccInfo = (handleSearch, handleReset) => {
  return [
    {
      title: 'No.',
      dataIndex: 'no',
      key: 'no',
      render: text => <div>{text}</div>,
    },
    {
      // if(transaction_type == TOPUP) sender_main_account_value
      // if(transaction_type == RPYMNT) receiver_main_account_value
      title: 'TCRB AccountRef',
      dataIndex: 'tcrb_account_reference',
      key: 'tcrb_account_reference',
      ...getColumnSearchProps('tcrb_account_reference', handleSearch, handleReset, 'TCRB AccountRef')
    },
    {
      // if(transaction_type == TOPUP) sender_sub_account_value
      // if(transaction_type == RPYMNT) receiver_sub_account_value
      title: 'Sub A/C',
      dataIndex: 'sub_account',
      key: 'sub_account',
      ...getColumnSearchProps('sub_account', handleSearch, handleReset, 'Sub A/C')
    },
    {
      // if(transaction_type == TOPUP) sender_name
      // if(transaction_type == RPYMNT) receiver_name
      title: 'Account Name',
      key: 'account_name',
      dataIndex: 'account_name',
      ...getColumnSearchProps('account_name', handleSearch, handleReset, 'Account Name')
    },
    {
      title: 'Acc Ref1',
      key: 'reference_1',
      dataIndex: 'reference_1',
    },
    {
      title: 'Acc Ref2',
      key: 'reference_2',
      dataIndex: 'reference_2',
    },
    {
      title: 'Acc Ref3',
      key: 'reference_3',
      dataIndex: 'reference_3',
    },
  ];
}

export const clmTxn = (handleSearch, handleReset) => {
  return [
    {
      title: 'No.',
      dataIndex: 'no',
      key: 'no',
      render: text => <div>{text}</div>,
    },
    {
      title: 'Txn-DR_Entry',
      dataIndex: 'transaction_debit_entry',
      key: 'transaction_debit_entry',
      ...getColumnSearchProps('transaction_debit_entry', handleSearch, handleReset, 'Txn-DR_Entry')
    },
    {
      title: 'Txn-CR_Entry',
      dataIndex: 'transaction_credit_entry',
      key: 'transaction_credit_entry',
      ...getColumnSearchProps('transaction_credit_entry', handleSearch, handleReset, 'Txn-CR_Entry')
    },
    {
      title: 'Fee_DR_Entry',
      key: 'fee_debit_entries',
      dataIndex: 'fee_debit_entries',
      // render: (text, record) => addCommaInData(text, false)
    },
    {
      title: 'Fee_DR_Amt',
      key: 'fee_amount',
      dataIndex: 'fee_amount',
      // render: (text, record) => addCommaInData(text, true)
    },
    {
      title: 'Fee_CR_Entry',
      key: 'bank_income_fee_entries',
      dataIndex: 'bank_income_fee_entries',
    },
    {
      title: 'Fee_CR_Amt',
      key: 'bank_income_fee',
      dataIndex: 'bank_income_fee',
      // render: (text, record) => addCommaInData(text, true)
    },
    {
      title: 'Amt',
      key: 'amount',
      dataIndex: 'amount',
      render: (text, record) => <div style={{ textAlign: 'right' }}>{addCommaInData(text, true)}</div>
    },
  ];
}
