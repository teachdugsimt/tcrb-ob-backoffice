import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components';
// import {
//   clmTranInfo, clmPartnerInfo, clmAccInfo, clmTxn,
// } from './table-column';
import { Table, Tabs, Carousel } from 'antd';
import { TcrbTabs, TcrbSpin } from '../antd-styles/styles'
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import SimpleLabel from '../simple-label'
import getColumnSearchProps from './filter-box'
import { addCommaInData } from '../data-utility';
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
      const [pageSizeVal, setPageSizeVal] = useState(10)

      const clmTranInfo = (handleSearch, handleReset) => {
        return [
          {
            title: t("number"),
            dataIndex: 'no',
            key: 'no',
          },
          {
            title: t("tranDate"),
            dataIndex: 'date',
            key: 'date',
            ...getColumnSearchProps('date', handleSearch, handleReset, 'Tran Time'),
            render: (text, record) => moment(text).format('ll')
          },
          {
            title: t("entity"),
            key: 'parent_partner_code',
            dataIndex: 'parent_partner_code',
            ...getColumnSearchProps('parent_partner_code', handleSearch, handleReset, 'Entity')
          },
          {
            title: t("channel"),
            key: 'channel',
            dataIndex: 'channel',
            ...getColumnSearchProps('channel', handleSearch, handleReset, 'Channel')
          },
          {
            title: t("tranType"),
            key: 'transaction_type',
            dataIndex: 'transaction_type',
            ...getColumnSearchProps('transaction_type', handleSearch, handleReset, 'Tran Type')

          },
          {  // ** Wait Tum Confirm
            title: t("tranSubType"),
            key: 'transaction_sub_type',
            dataIndex: 'transaction_sub_type',
          },
          {
            title: t("prodType"),
            key: 'product_type',
            dataIndex: 'product_type',
            ...getColumnSearchProps('product_type', handleSearch, handleReset, 'Prod Type')
          },
          {
            title: t("accountNo"),
            key: 'account_no',
            dataIndex: 'account_no',
            ...getColumnSearchProps('account_no', handleSearch, handleReset, 'A/C No.')
          },
          {
            title: t("amount"),
            key: 'amount',
            dataIndex: 'amount',
            render: (text, record) => <div style={{ textAlign: 'right' }}>{addCommaInData(text, true)}</div>
          },
          {
            title: t("status"),
            key: 'status',
            dataIndex: 'status',
            ...getColumnSearchProps('status', handleSearch, handleReset, 'Status')
          },
        ];
      }

      const clmPartnerInfo = (handleSearch, handleReset) => {
        return [
          {
            title: t("number"),
            dataIndex: 'no',
            key: 'no',
            render: text => <div>{text}</div>,
          },
          {
            title: t("partnerTranRef"),
            dataIndex: 'partner_transaction_reference',
            key: 'partner_transaction_reference',
            ...getColumnSearchProps('partner_transaction_reference', handleSearch, handleReset, 'Partner TranRef')
          },
          {
            title: t("partnerReqID"),
            dataIndex: 'request_id',
            key: 'request_id',
            ...getColumnSearchProps('request_id', handleSearch, handleReset, 'Partner ReqID')
          },
          {
            title: t("bankTranRef"),
            key: 'transaction_reference',
            dataIndex: 'transaction_reference',
            ...getColumnSearchProps('transaction_reference', handleSearch, handleReset, 'Bank TranRef')
          },
          {
            title: t("mobileNumber"),
            key: 'mobile_no',
            dataIndex: 'mobile_no',
            ...getColumnSearchProps('mobile_no', handleSearch, handleReset, 'Mobile Number')
          }
        ];
      }

      const clmAccInfo = (handleSearch, handleReset) => {
        return [
          {
            title: t("number"),
            dataIndex: 'no',
            key: 'no',
            render: text => <div>{text}</div>,
          },
          {
            title: t("tcrbAccountRef"),
            dataIndex: 'tcrb_account_reference',
            key: 'tcrb_account_reference',
            ...getColumnSearchProps('tcrb_account_reference', handleSearch, handleReset, 'TCRB AccountRef')
          },
          {
            title: t("subAC"),
            dataIndex: 'sub_account',
            key: 'sub_account',
            ...getColumnSearchProps('sub_account', handleSearch, handleReset, 'Sub A/C')
          },
          {
            title: t("accountName"),
            key: 'account_name',
            dataIndex: 'account_name',
            ...getColumnSearchProps('account_name', handleSearch, handleReset, 'Account Name')
          },
          {
            title: t("accRef1"),
            key: 'reference_1',
            dataIndex: 'reference_1',
          },
          {
            title: t("accRef2"),
            key: 'reference_2',
            dataIndex: 'reference_2',
          },
          {
            title: t("accRef3"),
            key: 'reference_3',
            dataIndex: 'reference_3',
          },
        ];
      }

      const clmTxn = (handleSearch, handleReset) => {
        return [
          {
            title: t("number"),
            dataIndex: 'no',
            key: 'no',
            render: text => <div>{text}</div>,
          },
          {
            title: t("txnDREntry"),
            dataIndex: 'transaction_debit_entry',
            key: 'transaction_debit_entry',
            ...getColumnSearchProps('transaction_debit_entry', handleSearch, handleReset, 'Txn-DR_Entry')
          },
          {
            title: t("txnCREntry"),
            dataIndex: 'transaction_credit_entry',
            key: 'transaction_credit_entry',
            ...getColumnSearchProps('transaction_credit_entry', handleSearch, handleReset, 'Txn-CR_Entry')
          },
          {
            title: t("feeDREntry"),
            key: 'fee_debit_entries',
            dataIndex: 'fee_debit_entries',
          },
          {
            title: t("feeDRAMT"),
            key: 'fee_amount',
            dataIndex: 'fee_amount',
          },
          {
            title: t("feeCREntry"),
            key: 'bank_income_fee_entries',
            dataIndex: 'bank_income_fee_entries',
          },
          {
            title: t("feeCRAMT"),
            key: 'bank_income_fee',
            dataIndex: 'bank_income_fee',
          },
          {
            title: t("amt"),
            key: 'amount',
            dataIndex: 'amount',
            render: (text, record) => <div style={{ textAlign: 'right' }}>{addCommaInData(text, true)}</div>
          },
        ];
      }


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
                  columns={clmTranInfo(handleSearch, handleReset)} dataSource={tableTranInfoData}
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
                  columns={clmPartnerInfo(handleSearch, handleReset)} dataSource={tableTranInfoData}
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
                  columns={clmAccInfo(handleSearch, handleReset)} dataSource={tableTranInfoData}
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
                  columns={clmTxn(handleSearch, handleReset)} dataSource={tableTranInfoData}
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
