import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components';
import {
  clmTranInfo, clmPartnerInfo, clmAccInfo, clmTxn,
} from './table-column';
import { Table, Tabs, Carousel } from 'antd';
import { TcrbTabs, TcrbSpin } from '../antd-styles/styles'
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import SimpleLabel from '../simple-label'
import { data } from './data'
import moment from 'moment'
import 'moment/locale/th'
import _ from 'lodash'
import { withTranslation } from '../../i18n';
const { TabPane } = Tabs;

function callback(key) {
  console.log("CustomerEnquiry :: ", key);
}

const TableResult =
  inject('customerServiceEnquiry')
    (observer((props) => {
      const { customerServiceEnquiry, t } = props
      const [transInfo, setTransInfo] = useState(null)
      const [tableTranInfoData, setTableTranInfoData] = useState(null)
      const [partnerInfo, setPartnerInfo] = useState(null)
      const [accInfo, setAccInfo] = useState(null)
      const [txnInfo, setTxnInfo] = useState(null)
      const [allList, setallList] = useState(null)
      const [searchText, setSearchText] = useState([])
      const [page, setPage] = useState(1)

      const _buildListData = () => {
        let arr = customerServiceEnquiry.tmpListData ? customerServiceEnquiry.tmpListData : data
        let list1 = [], list2 = [], list3 = [], list4 = [], groupList = []
        arr.forEach((e, index) => {
          let b = moment((e.date).toString()).format('l')
          list1.push({
            key: index + 1,
            no: index + 1,
            tranDate: b, tranTime: e.time,
            // no: index + 1, tranDate: '29/6/2020', tranTime: e.time,
            entity: e.parent_partner_code, channel: e.channel,
            tranType: e.transaction_type, tranSubType: e.transaction_type,
            prodType: e.product_type,
            accNo: e.main_account_no, amount: (index + 1) * 1000, status: e.status,
            partnerTranRef: e.partner_transaction_reference,
            partnerReqId: e.request_id, bankTranRef: e.transaction_reference,
            mobileNo: "099345666" + JSON.stringify(index),
            tcrbAccRef: e.citizen_id, subAcc: e.sub_account_no,
            accName: e.account_name, accRef1: e.reference_1,
            accRef2: e.reference_2, accRef3: e.reference_3,
          })
          list2.push({
            key: index + 1,
            no: index + 1, partnerTranRef: e.partner_transaction_reference,
            partnerReqId: e.request_id, bankTranRef: e.transaction_reference,
            mobileNo: "099345666" + JSON.stringify(index),
            txnDrEntry: "TXD-DR-" + index,
            txnCrEntry: "CR-ENTRY-00" + index, feeDrEntry: JSON.stringify(index) + "%",
            feeDrAmount: (index + 1) * (index + 30), feeCrEntry: JSON.stringify(index) + ".5%",
            feeCrAmount: ((index + 1) * 100) + index, amount: ((index + 1) * 23) + index
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
      }

      const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
      };

      const handleReset = clearFilters => {
        clearFilters();

        setTableTranInfoData(transInfo)
        // this.setState({ searchText: '' });
      };

      useEffect(() => {
        if (customerServiceEnquiry.dataGetListCustomerService) {
          console.log("---------------- Table Result Request data ------------------")
          // console.log(JSON.parse(JSON.stringify(customerServiceEnquiry.dataGetListCustomerService)))
          const transList = JSON.parse(JSON.stringify(customerServiceEnquiry.dataGetListCustomerService))
          setTransInfo(transList)
          setTableTranInfoData(transList)
        }

      }, [customerServiceEnquiry.dataGetListCustomerService])

      useEffect(() => {
        // _buildListData()
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
      }

      return (
        <div style={{ paddingTop: 10 }}>
          <TcrbSpin spinning={customerServiceEnquiry.fetchingGetListCustomerService} size="large" tip="Loading..." >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {
                searchText.map(e => {
                  return <SimpleLabel label={e.searchedColumn} value={e.searchText} />
                })
              }
            </div>
            <Carousel {...settings} arrows={true} >
              <div >
                <Table
                  filtered={true}
                  onChange={(e) => setPage(e.current)}
                  columns={clmTranInfo(handleSearch, handleReset, t)} dataSource={tableTranInfoData}
                  pagination={{ current: JSON.parse(JSON.stringify(customerServiceEnquiry.pageCustomerEnquiryTable)) ? JSON.parse(JSON.stringify(customerServiceEnquiry.pageCustomerEnquiryTable)) : page, }}
                  size="small"
                  onChange={(pagination, filters, sorter, extra) => {
                    customerServiceEnquiry.setPageCustomerEnquiry(pagination.current)
                    setPage(pagination.current)
                    setTableTranInfoData(extra.currentDataSource)
                  }}
                />
              </div>
              <div>
                <Table
                  filtered={true}

                  onChange={(e) => setPage(e.current)}
                  onRow={(item, index) => ({
                    // onClick: () => {
                    //   let tmpList = allList.find(e => e.no == item.no)
                    //   customerServiceEnquiry.setTmpEnquiryRow(tmpList)
                    //   customerServiceEnquiry.setTmpEnquiryRow(transInfo)
                    // },
                  })}
                  columns={clmPartnerInfo(handleSearch, handleReset, t)} dataSource={tableTranInfoData}
                  pagination={{ current: JSON.parse(JSON.stringify(customerServiceEnquiry.pageCustomerEnquiryTable)) ? JSON.parse(JSON.stringify(customerServiceEnquiry.pageCustomerEnquiryTable)) : page, }}
                  size="small"
                  onChange={(pagination, filters, sorter, extra) => {
                    customerServiceEnquiry.setPageCustomerEnquiry(pagination.current)
                    setPage(pagination.current)
                    setTableTranInfoData(extra.currentDataSource)
                    // setTransInfo(extra.currentDataSource)
                  }}
                />
              </div>
              <div>
                <Table
                  filtered={true}
                  onChange={(e) => setPage(e.current)}
                  onRow={(item, index) => ({
                    // onClick: () => {
                    //   let tmpList = allList.find(e => e.no == item.no)
                    //   customerServiceEnquiry.setTmpEnquiryRow(tmpList)
                    //   customerServiceEnquiry.setTmpEnquiryRow(transInfo)
                    // },
                  })}
                  columns={clmAccInfo(handleSearch, handleReset, t)} dataSource={tableTranInfoData}
                  pagination={{ current: JSON.parse(JSON.stringify(customerServiceEnquiry.pageCustomerEnquiryTable)) ? JSON.parse(JSON.stringify(customerServiceEnquiry.pageCustomerEnquiryTable)) : page, }}
                  size="small"
                  onChange={(pagination, filters, sorter, extra) => {
                    customerServiceEnquiry.setPageCustomerEnquiry(pagination.current)
                    setPage(pagination.current)
                    setTableTranInfoData(extra.currentDataSource, t)
                  }}
                />
              </div>
              <div>
                <Table
                  filtered={true}
                  onChange={(e) => setPage(e.current)}
                  onRow={(item, index) => ({
                    // onClick: () => {
                    //   let tmpList = allList.find(e => e.no == item.no)
                    //   customerServiceEnquiry.setTmpEnquiryRow(tmpList)
                    //   customerServiceEnquiry.setTmpEnquiryRow(transInfo)
                    // },
                  })}
                  columns={clmTxn(handleSearch, handleReset, t)} dataSource={tableTranInfoData}
                  pagination={{ current: JSON.parse(JSON.stringify(customerServiceEnquiry.pageCustomerEnquiryTable)) ? JSON.parse(JSON.stringify(customerServiceEnquiry.pageCustomerEnquiryTable)) : page, }}
                  size="small"
                  onChange={(pagination, filters, sorter, extra) => {
                    customerServiceEnquiry.setPageCustomerEnquiry(pagination.current)
                    setPage(pagination.current)
                    setTableTranInfoData(extra.currentDataSource)
                    // setTransInfo(extra.currentDataSource)
                  }}
                />
              </div>
            </Carousel>
          </TcrbSpin>
        </div>
      )

    }))




export default withTranslation()(TableResult)
