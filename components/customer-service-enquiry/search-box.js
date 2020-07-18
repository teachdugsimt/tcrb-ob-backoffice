import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components';
import { Menu, Dropdown, Button, message, DatePicker, Input } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import moment from 'moment'
import { withTranslation } from '../../i18n';
const { RangePicker } = DatePicker;
const { Search } = Input

const SearchBox =
  inject('customerServiceEnquiry')
    (observer((props) => {
      const { customerServiceEnquiry, t } = props
      const [currentSearch, setCurrentSearch] = useState(0)
      const [dateValue, setdate] = useState(null)
      const [start, setstart] = useState("")
      const [end, setend] = useState("")
      const [visibleDate, setvisibleDate] = useState(false)
      const [tmp_list_table, setTmpList] = useState(null)

      const [objDay, setobjDay] = useState({
        from_date: "",
        to_date: "",
        from_time: "",
        to_time: "",
      })

      function handleMenuClick(e) {
        // message.info('Click on menu item.');
        setCurrentSearch(e.item.props.index)
      }

      useEffect(() => {
        let newProps = JSON.parse(JSON.stringify(customerServiceEnquiry.dataGetListCustomerService))
        if (newProps != tmp_list_table) {
          setTmpList(newProps)
          // customerServiceEnquiry.clearCacheCustomerDetail()
          customerServiceEnquiry.setPageCustomerEnquiry(1)
        }
      }, [customerServiceEnquiry.dataGetListCustomerService])

      const menuName = ['Search All', 'Search by ID Card Number', 'Search by Account No',
        'Search by Entity', 'Search by Entity and Channel', 'Search by Product Type',
        'Search by Range of Date&Time']
      const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            {menuName[0]}
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            {menuName[1]}
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            {menuName[2]}
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            {menuName[3]}
          </Menu.Item>
          <Menu.Item key="5" icon={<UserOutlined />}>
            {menuName[4]}
          </Menu.Item>
          <Menu.Item key="6" icon={<UserOutlined />}>
            {menuName[5]}
          </Menu.Item>
          <Menu.Item key="7" icon={<UserOutlined />}>
            {menuName[6]}
          </Menu.Item>
        </Menu>
      );

      const _handleSearch = (value) => {
        // customerServiceEnquiry.setPageCustomerEnquiry(1)
        console.log(menuName[currentSearch])
        console.log("Search Text : ", value)
        customerServiceEnquiry.clearCacheCustomerDetail()
        let focus_menu = menuName[currentSearch]
        let text_search = value
        // let list_item = JSON.parse(JSON.stringify(data))
        if (value && value != "") {
          if (focus_menu == "Search by ID Card Number") {
            customerServiceEnquiry.getListCustomerServicesEnquiry({
              filter: {
                where: {
                  citizen_id: text_search
                  // test : 912f74047dd8964c382a6d6287f0ed12
                }
              }
            })
          }
          else if (focus_menu == "Search by Account No") {
            customerServiceEnquiry.getListCustomerServicesEnquiry({
              filter: {
                where: {
                  account_no: text_search
                  // main account / sub account
                }
              }
            })
          }
          else if (focus_menu == "Search by Entity") {
            customerServiceEnquiry.getListCustomerServicesEnquiry({
              filter: {
                where: {
                  entity: text_search
                }
                // parent partner code
              }
            })
          }
          else if (focus_menu == "Search by Entity and Channel") {
            customerServiceEnquiry.getListCustomerServicesEnquiry({
              filter: {
                where: {
                  entity_channel: text_search
                }
              }
            })
          }
          else if (focus_menu == "Search by Product Type") {
            customerServiceEnquiry.getListCustomerServicesEnquiry({
              filter: {
                where: {
                  product_type: text_search
                }
              }
            })
          } else {
            customerServiceEnquiry.getListCustomerServicesEnquiry({
              filter: {
                where: {
                  full_text_search: text_search
                }
              }
            })
          }
        } else {
          if (currentSearch == 6) { // Search by date
            if (start && end) {
              customerServiceEnquiry.getListCustomerServicesEnquiry({
                filter: {
                  where: {
                    from_date: objDay.from_date,
                    to_date: objDay.to_date,
                    from_time: objDay.from_time,
                    to_time: objDay.to_time,
                  }
                }
              })
            }
          } else { // search all && no vlaue
            customerServiceEnquiry.getListCustomerServicesEnquiry({ filter: { limit: 300 } })
            // customerServiceEnquiry.setListData(data)
          }
        }
      }

      // console.log("START : ", start)
      // console.log("END : ", end)
      // console.log("Date all : ", dateValue)
      // console.log("currentSearch : ", currentSearch)
      return (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropdown overlay={menu}>
              <Button>
                {menuName[currentSearch]} <DownOutlined />
              </Button>
            </Dropdown>
            <Search placeholder="input search text"
              onSearch={value => _handleSearch(value)}
              enterButton />
          </div>
          <div style={{ marginTop: 10 }}>
            {currentSearch == 6 && <RangePicker
              style={{ width: '100%' }}
              ranges={{
                Today: [moment(), moment()],
                'This Week': [moment().startOf('week'), moment().endOf('week')],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
              }}
              showTime
              format="YYYY/MM/DD HH:mm:ss"
              onChange={(e) => {
                if (e) {
                  let tmp_start = JSON.parse(JSON.stringify(e[0]))
                  let tmp_end = JSON.parse(JSON.stringify(e[1]))
                  let startDate = moment(tmp_start).format('l')
                  let endDate = moment(tmp_end).format('l')

                  let allTemp = {
                    from_date: moment(tmp_start).format('YYYYMMDD'),
                    to_date: moment(tmp_end).format('YYYYMMDD'),
                    from_time: moment(tmp_start).format('HHmmss'),
                    to_time: moment(tmp_end).format("HHmmss"),
                  }

                  setstart(startDate)
                  setend(endDate)
                  setobjDay(allTemp)
                  setdate(e)
                } else setCurrentSearch(0)
              }} />}
          </div>
        </div>
      )

    }))
export default withTranslation('common')(SearchBox)
// citizen_id=  912f74047dd8964c382a6d6287f0ed1

// 1. new search => reset pagination
// 2. language
