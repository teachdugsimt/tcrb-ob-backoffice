import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components';
import { columnsTranInfo, columnsPartnerInfo, columnsAccInfo, columnsTxn, clmTab1 } from './table-column';
import { Table, Tabs, Carousel } from 'antd';
import { TcrbTabs } from '../antd-styles/styles'
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { data } from './data'
import moment from 'moment'
import 'moment/locale/th'
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
      const [allList, setallList] = useState(null)
      const [page, setPage] = useState(1)

      const _buildListData = () => {
        let arr = customerServiceEnquiry.tmpListData ? customerServiceEnquiry.tmpListData : data
        let list1 = [], list2 = [], list3 = [], list4 = [], groupList = []
        arr.forEach((e, index) => {
          let b = moment((e.date).toString()).format('l')
          list1.push({
            key: index + 1,
            no: index + 1, tranDate: b, tranTime: e.time,
            // no: index + 1, tranDate: '29/6/2020', tranTime: e.time,
            entity: e.parent_partner_code, channel: e.channel,
            tranType: e.transaction_type, tranSubType: e.transaction_type,
            prodType: e.product_type,
            accNo: e.main_account_no, amount: (index + 1) * 1000, status: e.status
          })
          list2.push({
            key: index + 1,
            no: index + 1, partnerTranRef: e.partner_transaction_reference,
            partnerReqId: e.request_id, bankTranRef: e.transaction_reference,
            mobileNo: "099345666" + JSON.stringify(index)
          })
          list3.push({
            key: index + 1,
            no: index + 1,
            tcrbAccRef: e.citizen_id, subAcc: e.sub_account_no,
            accName: e.account_name, accRef1: e.reference_1,
            accRef2: e.reference_2, accRef3: e.reference_3,
          })
          list4.push({
            key: index + 1,
            no: index + 1, txnDrEntry: "TXD-DR-" + index,
            txnCrEntry: "CR-ENTRY-00" + index, feeDrEntry: JSON.stringify(index) + "%",
            feeDrAmount: (index + 1) * (index + 30), feeCrEntry: JSON.stringify(index) + ".5%",
            feeCrAmount: ((index + 1) * 100) + index, amount: ((index + 1) * 23) + index
          })
          groupList.push({
            key: index + 1,
            no: index + 1, tranDate: e.date, tranTime: e.time,
            entity: e.parent_partner_code, channel: e.channel,
            tranType: e.transaction_type, tranSubType: e.transaction_type,
            prodType: e.product_type,
            accNo: e.main_account_no, amount: (index + 1) * 1000, status: e.status,
            partnerReqId: e.request_id, bankTranRef: e.transaction_reference,
            mobileNo: "099345666" + JSON.stringify(index),
            tcrbAccRef: e.citizen_id, subAcc: e.sub_account_no,
            accName: e.account_name, accRef1: e.reference_1,
            accRef2: e.reference_2, accRef3: e.reference_3,
            txnCrEntry: "CR-ENTRY-00" + index, feeDrEntry: JSON.stringify(index) + "%",
            feeDrAmount: (index + 1) * (index + 30), feeCrEntry: JSON.stringify(index) + ".5%",
            feeCrAmount: ((index + 1) * 100) + index, amount: ((index + 1) * 23) + index
          })
        })

        setTransInfo(list1)
        setPartnerInfo(list2)
        setAccInfo(list3)
        setTxnInfo(list4)
        setallList(groupList)
      }

      const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        console.log(dataIndex)
        console.log(selectedKeys)
        // this.setState({
        //   searchText: selectedKeys[0],
        //   searchedColumn: dataIndex,
        // });
      };

      const handleReset = clearFilters => {
        clearFilters();
        // this.setState({ searchText: '' });
      };

      useEffect(() => {
        // getListCustomerServicesEnquiry
        customerServiceEnquiry.getListCustomerServicesEnquiry({ filter: {} })
        _buildListData()
      }, [])

      useEffect(() => {
        if (customerServiceEnquiry.dataGetListCustomerService) {
          console.log("---------------- Table Result Request data ------------------")
          console.log(JSON.parse(JSON.stringify(customerServiceEnquiry.dataGetListCustomerService)))
        }

      }, [customerServiceEnquiry.dataGetListCustomerService])

      useEffect(() => {
        _buildListData()
      }, [customerServiceEnquiry.tmpListData])

      const PrevArrow = (props) => {
        const { className, style, onClick } = props
        return (
          <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
            disabled={props.currentSlide == 0 ? true : false}
          >
            <LeftOutlined style={{ fontSize: '32px', color: "#fba928" }} />
          </div>
        )
      }

      const NextArrow = (props) => {
        const { className, style, onClick } = props
        return (
          <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
            disabled={props.currentSlide == props.slideCount ? true : false}
          >
            <RightOutlined style={{ fontSize: '32px', color: "#fba928" }} />
          </div>
        )
      }
      const settings = {
        dots: false,
        infinite: false,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />
        /*nextArrow: <RightOutlined style={{
          position: "absolute",
          right: "0",
          cursor: "pointer"
        }} />,
        prevArrow: <LeftOutlined style={{
          position: "absolute",
          left: "0",
          cursor: "pointer"
        }} />,*/
      }

      /*return (
        <TcrbTabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Transaction Info" key="1">
            <Table
              filtered={true}
              onChange={(e) => setPage(e.current)}
              onRow={(item, index) => {
                return {
                  onClick: () => {
                    let tmpList = allList.find(e => e.no == item.no)
                    console.log("ITEM CLICK : ", tmpList)
                    customerServiceEnquiry.setTmpEnquiryRow(tmpList)
                  },
                }
              }}
              scroll={{ x: true }}
              columns={clmTab1()} dataSource={transInfo}
              pagination={{ current: page, }}
            />
          </TabPane>
          <TabPane
            tab="Partner Info" key="2">
            <Table
              filtered={true}
              onChange={(e) => setPage(e.current)}
              onRow={(item, index) => ({
                onClick: () => {
                  let tmpList = allList.find(e => e.no == item.no)
                  console.log("ITEM CLICK : ", tmpList)
                  customerServiceEnquiry.setTmpEnquiryRow(tmpList)
                },
              })}
              columns={columnsPartnerInfo} dataSource={partnerInfo}
              pagination={{ current: page, }}
            />
          </TabPane>
          <TabPane
            tab="Account Info" key="3">
            <Table
              filtered={true}
              onChange={(e) => setPage(e.current)}
              onRow={(item, index) => ({
                onClick: () => {
                  let tmpList = allList.find(e => e.no == item.no)
                  console.log("ITEM CLICK : ", tmpList)
                  customerServiceEnquiry.setTmpEnquiryRow(tmpList)
                },
              })}
              columns={columnsAccInfo} dataSource={accInfo}
              pagination={{ current: page, }}
            />
          </TabPane>
          <TabPane
            tab="Txn" key="4">
            <Table
              filtered={true}
              onChange={(e) => setPage(e.current)}
              onRow={(item, index) => ({
                onClick: () => {
                  let tmpList = allList.find(e => e.no == item.no)
                  console.log("ITEM CLICK : ", tmpList)
                  customerServiceEnquiry.setTmpEnquiryRow(tmpList)
                },
              })}
              columns={columnsTxn} dataSource={txnInfo}
              pagination={{ current: page, }}
            />
          </TabPane>
        </TcrbTabs>
      )*/
      return (
        <div>

          <Carousel {...settings} arrows={true} >
            <div >
              <Table
                filtered={true}
                onChange={(e) => setPage(e.current)}
                columns={clmTab1(handleSearch, handleReset)} dataSource={transInfo}
                pagination={{ current: page, }}
                size="small"
              />
            </div>
            <div>
              <Table
                filtered={true}
                onChange={(e) => setPage(e.current)}
                onRow={(item, index) => ({
                  onClick: () => {
                    let tmpList = allList.find(e => e.no == item.no)
                    console.log("ITEM CLICK : ", tmpList)
                    customerServiceEnquiry.setTmpEnquiryRow(tmpList)
                  },
                })}
                columns={columnsPartnerInfo} dataSource={partnerInfo}
                pagination={{ current: page, }}
                size="small"
              />
            </div>
            <div>
              <Table
                filtered={true}
                onChange={(e) => setPage(e.current)}
                onRow={(item, index) => ({
                  onClick: () => {
                    let tmpList = allList.find(e => e.no == item.no)
                    console.log("ITEM CLICK : ", tmpList)
                    customerServiceEnquiry.setTmpEnquiryRow(tmpList)
                  },
                })}
                columns={columnsAccInfo} dataSource={accInfo}
                pagination={{ current: page, }}
                size="small"
              />
            </div>
            <div>
              <Table
                filtered={true}
                onChange={(e) => setPage(e.current)}
                onRow={(item, index) => ({
                  onClick: () => {
                    let tmpList = allList.find(e => e.no == item.no)
                    console.log("ITEM CLICK : ", tmpList)
                    customerServiceEnquiry.setTmpEnquiryRow(tmpList)
                  },
                })}
                columns={columnsTxn} dataSource={txnInfo}
                pagination={{ current: page, }}
                size="small"
              />
            </div>
          </Carousel>

        </div>
      )

    }))




