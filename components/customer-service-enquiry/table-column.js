
export const columnsTranInfo = [
  {
    title: 'No.',
    dataIndex: 'no',
    key: 'no',
    render: text => <div>{text}</div>,
  },
  {
    title: 'Tran Date',
    dataIndex: 'tranDate',
    key: 'tranDate',
  },
  {
    title: 'Tran Time',
    dataIndex: 'tranTime',
    key: 'tranTime',
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
