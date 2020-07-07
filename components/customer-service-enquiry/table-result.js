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
      const [pageSizeVal, setPageSizeVal] = useState(10)

      const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
      };

      const handleReset = clearFilters => {
        clearFilters();
        setTableTranInfoData(transInfo)
      };

      useEffect(() => {
        if (customerServiceEnquiry.dataGetListCustomerService) {
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

      const _handlePageSize = (pagination) => {
        if (pagination.pageSize != pageSizeVal) {
          setPageSizeVal(pagination.pageSize)
        }
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
                  pagination={{ current: JSON.parse(JSON.stringify(customerServiceEnquiry.pageCustomerEnquiryTable)) ? JSON.parse(JSON.stringify(customerServiceEnquiry.pageCustomerEnquiryTable)) : page, pageSize: pageSizeVal }}
                  size="small"
                  onChange={(pagination, filters, sorter, extra) => {
                    if (pagination) _handlePageSize(pagination)
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
                  onRow={(item, index) => ({})}
                  columns={clmPartnerInfo(handleSearch, handleReset, t)} dataSource={tableTranInfoData}
                  pagination={{ current: JSON.parse(JSON.stringify(customerServiceEnquiry.pageCustomerEnquiryTable)) ? JSON.parse(JSON.stringify(customerServiceEnquiry.pageCustomerEnquiryTable)) : page, pageSize: pageSizeVal }}
                  size="small"
                  onChange={(pagination, filters, sorter, extra) => {
                    if (pagination) _handlePageSize(pagination)
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
                  onRow={(item, index) => ({})}
                  columns={clmAccInfo(handleSearch, handleReset, t)} dataSource={tableTranInfoData}
                  pagination={{ current: JSON.parse(JSON.stringify(customerServiceEnquiry.pageCustomerEnquiryTable)) ? JSON.parse(JSON.stringify(customerServiceEnquiry.pageCustomerEnquiryTable)) : page, pageSize: pageSizeVal }}
                  size="small"
                  onChange={(pagination, filters, sorter, extra) => {
                    if (pagination) _handlePageSize(pagination)
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
                  onRow={(item, index) => ({})}
                  columns={clmTxn(handleSearch, handleReset, t)} dataSource={tableTranInfoData}
                  pagination={{ current: JSON.parse(JSON.stringify(customerServiceEnquiry.pageCustomerEnquiryTable)) ? JSON.parse(JSON.stringify(customerServiceEnquiry.pageCustomerEnquiryTable)) : page, pageSize: pageSizeVal }}
                  size="small"
                  onChange={(pagination, filters, sorter, extra) => {
                    if (pagination) _handlePageSize(pagination)
                    customerServiceEnquiry.setPageCustomerEnquiry(pagination.current)
                    setPage(pagination.current)
                    setTableTranInfoData(extra.currentDataSource)
                  }}
                />
              </div>
            </Carousel>
          </TcrbSpin>
        </div>
      )

    }))




export default withTranslation('common')(TableResult)
