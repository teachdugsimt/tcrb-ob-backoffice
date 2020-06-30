import moment from 'moment'
import { getColumnSearchProps } from './filter-box'

export const clmTab1 = (handleSearch, handleReset) => {
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
      ...getColumnSearchProps('tranDate', handleSearch, handleReset)
    },
    {
      title: 'Entity',
      key: 'entity',
      dataIndex: 'entity',

    },
    {
      title: 'Channel',
      key: 'channel',
      dataIndex: 'channel',

    },
    {
      title: 'Tran Type',
      key: 'tranType',
      dataIndex: 'tranType',

    },
    {
      title: 'Tran SubType',
      key: 'tranSubType',
      dataIndex: 'tranSubType',

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
}

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
  },
  {
    title: 'Fee-DR_Amt',
    key: 'feeDrAmount',
    dataIndex: 'feeDrAmount',
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
  },
  {
    title: 'Amt',
    key: 'amount',
    dataIndex: 'amount',
  },
];
