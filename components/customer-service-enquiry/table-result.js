import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components';
import { columnsTranInfo, columnsPartnerInfo, columnsAccInfo, columnsTxn } from './table-column';
import { Table, Tabs } from 'antd';
import { data } from './data'
const { TabPane } = Tabs;

function callback(key) {
  console.log("CustomerEnquiry :: ", key);
}

export const TableResult =
  inject('customerServiceEnquiry')
    (observer((props) => {
      const { customerServiceEnquiry } = props
      const [transInfo, setTransInfo] = useState(null)
      const [partnerInfo, setPartnerInfo] = useState(null)
      const [accInfo, setAccInfo] = useState(null)
      const [txnInfo, setTxnInfo] = useState(null)
      const [page, setPage] = useState(1)

      const _buildListData = () => {
        let arr = customerServiceEnquiry.tmpListData ? customerServiceEnquiry.tmpListData : data
        let list1 = [], list2 = [], list3 = [], list4 = []
        arr.forEach((e, i) => {
          list1.push({
            no: i + 1, tranDate: e.date, tranTime: e.time,
            entity: e.parent_partner_code, channel: e.channel,
            tranType: e.transaction_type, tranSubType: e.transaction_type,
            prodType: e.product_type,
            accNo: e.main_account_no, amount: (i + 1) * 1000, status: e.status
          })
          list2.push({
            no: i + 1, partnerTranRef: e.partner_transaction_reference,
            partnerReqId: e.request_id, bankTranRef: e.transaction_reference,
            mobileNo: "099345666" + JSON.stringify(i)
          })
          list3.push({
            no: i + 1,
            tcrbAccRef: e.citizen_id, subAcc: e.sub_account_no,
            accName: e.account_name, accRef1: e.reference_1,
            accRef2: e.reference_2, accRef3: e.reference_3,
          })
          list4.push({
            no: i + 1, txnDrEntry: "TXD-DR-" + i,
            txnCrEntry: "CR-ENTRY-00" + i, feeDrEntry: JSON.stringify(i) + "%",
            feeDrAmount: (i + 1) * (i + 30), feeCrEntry: JSON.stringify(i) + ".5%",
            feeCrAmount: ((i + 1) * 100) + i, amount: ((i + 1) * 23) + i
          })
        })
        setTransInfo(list1)
        setPartnerInfo(list2)
        setAccInfo(list3)
        setTxnInfo(list4)
      }

      useEffect(() => {
        _buildListData()
      }, [])

      useEffect(() => {
        _buildListData()
      }, [customerServiceEnquiry.tmpListData])

      return (
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Transaction Info" key="1">
            <Table
              onChange={(e) => setPage(e.current)}
              onRow={(item, index) => {
                return {
                  onClick: () => customerServiceEnquiry.setTmpPendingListID(item),
                }
              }}
              columns={columnsTranInfo} dataSource={transInfo}
              pagination={{ current: page, }}
            />
          </TabPane>
          <TabPane
            onRow={(item, index) => ({
              onClick: () => customerServiceEnquiry.setTmpPendingListID(item),
            })}
            tab="Partner Info" key="2">
            <Table
              onChange={(e) => setPage(e.current)}
              columns={columnsPartnerInfo} dataSource={partnerInfo}
              pagination={{ current: page, }}
            />
          </TabPane>
          <TabPane
            onRow={(item, index) => ({
              onClick: () => customerServiceEnquiry.setTmpPendingListID(item),
            })}
            tab="Account Info" key="3">
            <Table
              onChange={(e) => setPage(e.current)}
              columns={columnsAccInfo} dataSource={accInfo}
              pagination={{ current: page, }}
            />
          </TabPane>
          <TabPane
            onRow={(item, index) => ({
              onClick: () => customerServiceEnquiry.setTmpPendingListID(item),
            })}
            tab="Txn" key="4">
            <Table
              onChange={(e) => setPage(e.current)}
              columns={columnsTxn} dataSource={txnInfo}
              pagination={{ current: page, }}
            />
          </TabPane>
        </Tabs>
      )

    }))




