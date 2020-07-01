import moment from 'moment'
import { getColumnSearchProps } from './filter-box'
import { addCommaInData } from '../data-utility';

export const clmTranInfo = (handleSearch, handleReset) => {
  return [
    {
      title: 'No.',
      dataIndex: 'no',
      key: 'no',
      // getColumnSearchProps('name')
    },
    {
      title: 'Tran Time',
      dataIndex: 'tranDate',
      key: 'tranDate',
      // ...getColumnSearchProps('tranDate', handleSearch, handleReset, 'Tran Time'),
    },
    {
      title: 'Entity',
      key: 'entity',
      dataIndex: 'entity',
      ...getColumnSearchProps('entity', handleSearch, handleReset, 'Entity')

    },
    {
      title: 'Channel',
      key: 'channel',
      dataIndex: 'channel',
      ...getColumnSearchProps('channel', handleSearch, handleReset, 'Channel')
    },
    {
      title: 'Tran Type',
      key: 'tranType',
      dataIndex: 'tranType',
      ...getColumnSearchProps('tranType', handleSearch, handleReset, 'Tran Type')

    },
    {
      title: 'Tran SubType',
      key: 'tranSubType',
      dataIndex: 'tranSubType',
      ...getColumnSearchProps('tranSubType', handleSearch, handleReset, 'Tran SubType')
    },
    {
      title: 'Prod Type',
      key: 'prodType',
      dataIndex: 'prodType',
      ...getColumnSearchProps('prodType', handleSearch, handleReset, 'Prod Type')
    },
    {
      title: 'A/C No.',
      key: 'accNo',
      dataIndex: 'accNo',
      ...getColumnSearchProps('accNo', handleSearch, handleReset, 'A/C No.')
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
      dataIndex: 'partnerTranRef',
      key: 'partnerTranRef',
      ...getColumnSearchProps('partnerTranRef', handleSearch, handleReset, 'Partner TranRef')
    },
    {
      title: 'Partner ReqID',
      dataIndex: 'partnerReqId',
      key: 'partnerReqId',
      ...getColumnSearchProps('partnerReqId', handleSearch, handleReset, 'Partner ReqID')
    },
    {
      title: 'Bank TranRef',
      key: 'bankTranRef',
      dataIndex: 'bankTranRef',
      ...getColumnSearchProps('bankTranRef', handleSearch, handleReset, 'Bank TranRef')
    },
    {
      title: 'Mobile Number',
      key: 'mobileNo',
      dataIndex: 'mobileNo',
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
      title: 'TCRB AccountRef',
      dataIndex: 'tcrbAccRef',
      key: 'tcrbAccRef',
      ...getColumnSearchProps('tcrbAccRef', handleSearch, handleReset, 'TCRB AccountRef')
    },
    {
      title: 'Sub A/C',
      dataIndex: 'subAcc',
      key: 'subAcc',
      ...getColumnSearchProps('subAcc', handleSearch, handleReset, 'Sub A/C')
    },
    {
      title: 'Account Name',
      key: 'accName',
      dataIndex: 'accName',
      ...getColumnSearchProps('accName', handleSearch, handleReset, 'Account Name')
    },
    {
      title: 'Acc Ref1',
      key: 'accRef1',
      dataIndex: 'accRef1',
    },
    {
      title: 'Acc Ref2',
      key: 'accRef2',
      dataIndex: 'accRef2',
    },
    {
      title: 'Acc Ref3',
      key: 'accRef3',
      dataIndex: 'accRef3',
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
      dataIndex: 'txnDrEntry',
      key: 'txnDrEntry',
      ...getColumnSearchProps('txnDrEntry', handleSearch, handleReset, 'Txn-DR_Entry')
    },
    {
      title: 'Txn-CR_Entry',
      dataIndex: 'txnCrEntry',
      key: 'txnCrEntry',
      ...getColumnSearchProps('txnCrEntry', handleSearch, handleReset, 'Txn-CR_Entry')
    },
    {
      title: 'Fee-DR_Entry',
      key: 'feeDrEntry',
      dataIndex: 'feeDrEntry',
      // ...getColumnSearchProps('feeDrEntry', handleSearch, handleReset, 'Fee-DR_Entry')
      // render: (text, record) => addCommaInData(text, false)
    },
    {
      title: 'Fee-DR_Amt',
      key: 'feeDrAmount',
      dataIndex: 'feeDrAmount',
      // render: (text, record) => addCommaInData(text, true)
    },
    {
      title: 'Fee-CR_Entry',
      key: 'feeCrEntry',
      dataIndex: 'feeCrEntry',
    },
    {
      title: 'Fee-CR_Amt',
      key: 'feeCrAmount',
      dataIndex: 'feeCrAmount',
      // render: (text, record) => addCommaInData(text, true)
    },
    {
      title: 'Amt',
      key: 'amount',
      dataIndex: 'amount',
      // render: (text, record) => addCommaInData(text, true)
    },
  ];
}

/////////////////////////////////////////////////////// mock Data แบบเก่า ////////////////////////////////////////////////////////////

export const columnsTranInfo = [
  {
    title: 'No.',
    dataIndex: 'no',
    key: 'no',
    render: text => <div>{text}</div>,
  },
  {
    title: 'Tran Time',
    dataIndex: 'tranDate',
    key: 'tranDate',
    filters: [
      {
        text: 'Today',
        value: moment(new Date()).format('l'),
      },
    ],
    filterMultiple: false,
    onFilter: (value, record) => record.tranDate.indexOf(value) === 0,
    sorter: (a, b) => a.tranDate.localeCompare(b.tranDate),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Entity',
    key: 'entity',
    dataIndex: 'entity',
    filters: [
      {
        text: 'TMDS',
        value: 'TMDS',
      },
      {
        text: 'OBCH',
        value: 'OBCH',
      },
    ],
    filterMultiple: false,
    onFilter: (value, record) => record.entity && record.entity.includes(value),
    sorter: (a, b) => a.entity && b.entity && a.entity.length - b.entity.length,
    // sorter: (a, b) => a.entity.localeCompare(b.entity),
    // sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Channel',
    key: 'channel',
    dataIndex: 'channel',
    filters: [
      {
        text: 'TMDS',
        value: 'TMDS',
      },
      {
        text: 'OB',
        value: 'OB',
      },
    ],
    filterMultiple: false,
    onFilter: (value, record) => record.channel && record.channel.includes(value),
    sorter: (a, b) => a.channel && b.channel && a.channel.length - b.channel.length,
    // sorter: (a, b) => a.channel.localeCompare(b.channel),
    // sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Tran Type',
    key: 'tranType',
    dataIndex: 'tranType',
    filters: [
      {
        text: 'RPYMNT',
        value: 'RPYMNT',
      },
      {
        text: 'TOPUP',
        value: 'TOPUP',
      },
    ],
    filterMultiple: false,
    onFilter: (value, record) => record.tranType && record.tranType.includes(value),
    sorter: (a, b) => a.tranType && b.tranType && a.tranType.length - b.tranType.length,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Tran SubType',
    key: 'tranSubType',
    dataIndex: 'tranSubType',
    filters: [
      {
        text: 'RPYMNT',
        value: 'RPYMNT',
      },
      {
        text: 'TOPUP',
        value: 'TOPUP',
      },
    ],
    onFilter: (value, record) => record.tranSubType && record.tranSubType.includes(value),
    sorter: (a, b) => a.tranSubType && b.tranSubType && a.tranSubType.length - b.tranSubType.length,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Prod Type',
    key: 'prodType',
    dataIndex: 'prodType',
  },
  {
    title: 'A/C No.',
    key: 'accNo',
    dataIndex: 'accNo',
  },
  {
    title: 'Amount',
    key: 'amount',
    dataIndex: 'amount',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
  },
];

export const columnsPartnerInfo = [
  {
    title: 'No.',
    dataIndex: 'no',
    key: 'no',
    render: text => <div>{text}</div>,
  },
  {
    title: 'Partner TranRef',
    dataIndex: 'partnerTranRef',
    key: 'partnerTranRef',
  },
  {
    title: 'Partner ReqID',
    dataIndex: 'partnerReqId',
    key: 'partnerReqId',
  },
  {
    title: 'Bank TranRef',
    key: 'bankTranRef',
    dataIndex: 'bankTranRef',
  },
  {
    title: 'Mobile Number',
    key: 'mobileNo',
    dataIndex: 'mobileNo',
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
    title: 'TCRB AccountRef',
    dataIndex: 'tcrbAccRef',
    key: 'tcrbAccRef',
  },
  {
    title: 'Sub A/C',
    dataIndex: 'subAcc',
    key: 'subAcc',
  },
  {
    title: 'Account Name',
    key: 'accName',
    dataIndex: 'accName',
  },
  {
    title: 'Acc Ref1',
    key: 'accRef1',
    dataIndex: 'accRef1',
  },
  {
    title: 'Acc Ref2',
    key: 'accRef2',
    dataIndex: 'accRef2',
  },
  {
    title: 'Acc Ref3',
    key: 'accRef3',
    dataIndex: 'accRef3',
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
    title: 'Txn-DR_Entry',
    dataIndex: 'txnDrEntry',
    key: 'txnDrEntry',
  },
  {
    title: 'Txn-CR_Entry',
    dataIndex: 'txnCrEntry',
    key: 'txnCrEntry',
  },
  {
    title: 'Fee-DR_Entry',
    key: 'feeDrEntry',
    dataIndex: 'feeDrEntry',
    // render: (text, record) => addCommaInData(text, false)
  },
  {
    title: 'Fee-DR_Amt',
    key: 'feeDrAmount',
    dataIndex: 'feeDrAmount',
    // render: (text, record) => addCommaInData(text, true)
  },
  {
    title: 'Fee-CR_Entry',
    key: 'feeCrEntry',
    dataIndex: 'feeCrEntry',
  },
  {
    title: 'Fee-CR_Amt',
    key: 'feeCrAmount',
    dataIndex: 'feeCrAmount',
    // render: (text, record) => addCommaInData(text, true)
  },
  {
    title: 'Amt',
    key: 'amount',
    dataIndex: 'amount',
    // render: (text, record) => addCommaInData(text, true)
  },
];
