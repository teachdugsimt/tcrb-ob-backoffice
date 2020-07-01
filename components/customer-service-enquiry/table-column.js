import moment from 'moment'
import { getColumnSearchProps } from './filter-box'
import { addCommaInData } from '../data-utility';

export const clmTab1 = (handleSearch, handleReset) => {
  console.log("Handle Search : ", handleSearch)
  console.log("Handle Reset : ", handleReset)
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
      ...getColumnSearchProps('date', handleSearch, handleReset),
    },
    {
      title: 'Entity',
      key: 'partner_code',
      dataIndex: 'partner_code',
      ...getColumnSearchProps('partner_code', handleSearch, handleReset)

    },
    {
      title: 'Channel',
      key: 'channel',
      dataIndex: 'channel',

    },
    {
      title: 'Tran Type',
      key: 'transaction_type',
      dataIndex: 'transaction_type',
      ...getColumnSearchProps('transaction_type', handleSearch, handleReset)

    },
    // {  // ** Wait Tum Confirm
    //   title: 'Tran SubType',
    //   key: 'tranSubType',
    //   dataIndex: 'tranSubType',

    // },
    {
      // if(transaction_type == TOPUP)  sender product type
      // if(transaction_type == RPYMNT) receiver product type
      title: 'Prod Type',
      key: 'product_type',
      dataIndex: 'product_type',
    },
    {
      // if(transaction_type == TOPUP) sender_main_account_value
      //  if(transaction_type == RPYMNT) receiver_main_account_value
      title: 'A/C No.',
      key: 'account_no',
      dataIndex: 'account_no',
    },
    {
      title: 'Amount',
      key: 'amount',
      dataIndex: 'amount',
      render: (text, record) => addCommaInData(text, true)
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
    },
  ];
}

// export const columnsTranInfo = [
//   {
//     title: 'No.',
//     dataIndex: 'no',
//     key: 'no',
//     render: text => <div>{text}</div>,
//   },
//   {
//     title: 'Tran Time',
//     dataIndex: 'tranDate',
//     key: 'date',
//     filters: [
//       {
//         text: 'Today',
//         value: moment(new Date()).format('l'),
//       },
//     ],
//     filterMultiple: false,
//     onFilter: (value, record) => record.date.indexOf(value) === 0,
//     sorter: (a, b) => a.date.localeCompare(b.date),
//     sortDirections: ['descend', 'ascend'],
//   },
//   {
//     title: 'Entity',
//     key: 'entity',
//     dataIndex: 'entity',
//     filters: [
//       {
//         text: 'TMDS',
//         value: 'TMDS',
//       },
//       {
//         text: 'OBCH',
//         value: 'OBCH',
//       },
//     ],
//     filterMultiple: false,
//     onFilter: (value, record) => record.entity && record.entity.includes(value),
//     sorter: (a, b) => a.entity && b.entity && a.entity.length - b.entity.length,
//     // sorter: (a, b) => a.entity.localeCompare(b.entity),
//     // sortDirections: ['descend', 'ascend'],
//   },
//   {
//     title: 'Channel',
//     key: 'channel',
//     dataIndex: 'channel',
//     filters: [
//       {
//         text: 'TMDS',
//         value: 'TMDS',
//       },
//       {
//         text: 'OB',
//         value: 'OB',
//       },
//     ],
//     filterMultiple: false,
//     onFilter: (value, record) => record.channel && record.channel.includes(value),
//     sorter: (a, b) => a.channel && b.channel && a.channel.length - b.channel.length,
//     // sorter: (a, b) => a.channel.localeCompare(b.channel),
//     // sortDirections: ['descend', 'ascend'],
//   },
//   {
//     title: 'Tran Type',
//     key: 'tranType',
//     dataIndex: 'tranType',
//     filters: [
//       {
//         text: 'RPYMNT',
//         value: 'RPYMNT',
//       },
//       {
//         text: 'TOPUP',
//         value: 'TOPUP',
//       },
//     ],
//     filterMultiple: false,
//     onFilter: (value, record) => record.tranType && record.tranType.includes(value),
//     sorter: (a, b) => a.tranType && b.tranType && a.tranType.length - b.tranType.length,
//     sortDirections: ['descend', 'ascend'],
//   },
//   {
//     title: 'Tran SubType',
//     key: 'tranSubType',
//     dataIndex: 'tranSubType',
//     filters: [
//       {
//         text: 'RPYMNT',
//         value: 'RPYMNT',
//       },
//       {
//         text: 'TOPUP',
//         value: 'TOPUP',
//       },
//     ],
//     onFilter: (value, record) => record.tranSubType && record.tranSubType.includes(value),
//     sorter: (a, b) => a.tranSubType && b.tranSubType && a.tranSubType.length - b.tranSubType.length,
//     sortDirections: ['descend', 'ascend'],
//   },
//   {
//     title: 'Prod Type',
//     key: 'prodType',
//     dataIndex: 'prodType',
//   },
//   {
//     title: 'A/C No.',
//     key: 'accNo',
//     dataIndex: 'accNo',
//   },
//   {
//     title: 'Amount',
//     key: 'amount',
//     dataIndex: 'amount',
//   },
//   {
//     title: 'Status',
//     key: 'status',
//     dataIndex: 'status',
//   },
// ];

export const columnsPartnerInfo = [
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
  },
  {
    title: 'Partner ReqID',
    dataIndex: 'request_id',
    key: 'request_id',
  },
  {
    title: 'Bank TranRef',
    key: 'transaction_reference',
    dataIndex: 'transaction_reference',
  },
  {
    // if(transaction_type == TOPUP) sender_proxy_value
    // if(transaction_type == RPYMNT) receiver_proxy_value
    title: 'Mobile Number',
    key: 'mobile_no',
    dataIndex: 'mobile_no',
  }
];

export const columnsAccInfo = [
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
  },
  {
    // if(transaction_type == TOPUP) sender_sub_account_value
    // if(transaction_type == RPYMNT) receiver_sub_account_value
    title: 'Sub A/C',
    dataIndex: 'sub_account',
    key: 'sub_account',
  },
  {
    // if(transaction_type == TOPUP) sender_name
    // if(transaction_type == RPYMNT) receiver_name
    title: 'Account Name',
    key: 'account_name',
    dataIndex: 'account_name',
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

export const columnsTxn = [
  {
    title: 'No.',
    dataIndex: 'no',
    key: 'no',
    render: text => <div>{text}</div>,
  },
  {
    title: 'Txn_DR_Entry',
    dataIndex: 'transaction_debit_entry',
    key: 'transaction_debit_entry',
  },
  {
    title: 'Txn_CR_Entry',
    dataIndex: 'transaction_credit_entry',
    key: 'transaction_credit_entry',
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
    // render: (text, record) => addCommaInData(text, true)
  },
];
