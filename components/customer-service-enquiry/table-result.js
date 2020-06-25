import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components';
import { columnsTranInfo, columnsPartnerInfo, columnsAccInfo, columnsTxn } from './table-column';
import { Table, Tabs } from 'antd';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

let transInfo = [
  { no: 1, tranDate: "22-07-2020", tranTime: "19:44", entity: "OTP", channel: "OB", tranType: "Withdraw", tranSubType: "withdraw 100 BATH", prodType: "WITHDRAW", accNo: "07560431", amount: "29,000", status: "pending" },
  { no: 2, tranDate: "21-07-2020", tranTime: "19:40", entity: "OTP", channel: "OB", tranType: "Withdraw", tranSubType: "withdraw 100 BATH", prodType: "WITHDRAW", accNo: "07560431", amount: "29,910", status: "pending" },
]

let partnerInfo = [
  { no: 1, partnerTranRef: "REF00911", partnerReqId: "5550009", bankTranRef: "2020198888", mobileNo: "092-981-8252" },
  { no: 2, partnerTranRef: "REF00912", partnerReqId: "5550010", bankTranRef: "2020198883", mobileNo: "092-981-8252" }
]

let accInfo = [
  { tcrbAccRef: "9990813123", subAcc: "1238849", accName: "Kittichai", accRef1: "7237482374", accRef2: "123123132", accRef3: "1239912123", },
  { tcrbAccRef: "9990813124", subAcc: "1238846", accName: "John Wick", accRef1: "7237482376", accRef2: "123123131", accRef3: "1239912121", },
]

let txnInfo = [
  { no: 1, txnDrEntry: "X-TRANSITION-W", txnCrEntry: "CR-ENTRy-001", feeDrEntry: "3%", feeDrAmount: "189", feeCrEntry: "7.5%", feeCrAmount: 322, amount: 560 },
  { no: 2, txnDrEntry: "X-TRANSITION-R", txnCrEntry: "CR-ENTRy-002", feeDrEntry: "3.3%", feeDrAmount: "222", feeCrEntry: "7.7%", feeCrAmount: 367, amount: 555 }
]

const TableSet = () => (
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="Transaction Info" key="1">
      <Table columns={columnsTranInfo} dataSource={transInfo} />
    </TabPane>
    <TabPane tab="Partner Info" key="2">
      <Table columns={columnsPartnerInfo} dataSource={partnerInfo} />
    </TabPane>
    <TabPane tab="Account Info" key="3">
      <Table columns={columnsAccInfo} dataSource={accInfo} />
    </TabPane>
    <TabPane tab="Txn" key="4">
      <Table columns={columnsTxn} dataSource={txnInfo} />
    </TabPane>
  </Tabs>
);

export const TableResult =
  inject('customerServicesMenuStore')
    (observer((props) => {

      return (
        <TableSet />
      )

    }))
