import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components';
import { Menu, Dropdown, Button, message, DatePicker, Input } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { data } from './data'
import moment from 'moment'
const { RangePicker } = DatePicker;
const { Search } = Input

export const SearchBox =
  inject('customerServiceEnquiry')
    (observer((props) => {
      const { customerServiceEnquiry } = props
      const [currentSearch, setCurrentSearch] = useState(0)
      const [dateValue, setdate] = useState(null)
      const [start, setstart] = useState("")
      const [end, setend] = useState("")
      const [visibleDate, setvisibleDate] = useState(false)

      function handleMenuClick(e) {
        message.info('Click on menu item.');
        setCurrentSearch(e.item.props.index)
      }

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
        let focus_menu = menuName[currentSearch]
        let text_search = value
        let list_item = JSON.parse(JSON.stringify(data))
        if (value && value != "") {
          if (focus_menu == "Search by ID Card Number") {
            // let tmp = list_item.filter(e => e.citizen_id.includes(text_search))
            // customerServiceEnquiry.setListData(tmp)
          }
          else if (focus_menu == "Search by Account No") {
            // let tmp = list_item.filter(e => e.main_account_no.includes(text_search) || e.sub_account_no.includes(text_search))
            // customerServiceEnquiry.setListData(tmp)
          }
          else if (focus_menu == "Search by Entity") {
            // let tmp = list_item.filter(e => e.parent_partner_code.includes(text_search))
            // customerServiceEnquiry.setListData(tmp)
          }
          else if (focus_menu == "Search by Entity and Channel") {
            // let tmp = list_item.filter(e => e.channel.includes(text_search))
            // customerServiceEnquiry.setListData(tmp)
          }
          else if (focus_menu == "Search by Product Type") {
            // let tmp = list_item.filter(e => e.product_type.includes(text_search))
            // customerServiceEnquiry.setListData(tmp)
          } else {
            // SEARCH ALL
            // let citizen = list_item.filter(e => e.citizen_id.includes(text_search))
            // let main_account_no = list_item.filter(e => e.main_account_no.includes(text_search) || e.sub_account_no.includes(text_search))
            // let parent_partner_code = list_item.filter(e => e.parent_partner_code.includes(text_search))
            // let channel = list_item.filter(e => e.channel.includes(text_search))
            // let product_type = list_item.filter(e => e.product_type.includes(text_search))
            // let tmp = [...citizen, ...main_account_no, ...parent_partner_code, ...channel, ...product_type]
            // console.log("SEARCH ALL : ", tmp)
            // if (tmp.length > 0)
            //   customerServiceEnquiry.setListData(tmp)
            // else
            //   customerServiceEnquiry.setListData(data)
          }
        } else {
          if (currentSearch == 6) {
            // let tmp = list_item.filter(e => moment((e.date).toString()).format('l') >= start && moment((e.date).toString()).format('l') <= end)
            // customerServiceEnquiry.setListData(tmp)
          } else {
            // customerServiceEnquiry.setListData(data)
          }
        }
      }

      console.log("START : ", start)
      console.log("END : ", end)
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
              // onSearch={value => {
              //   console.log(menuName[currentSearch])
              //   console.log("Search Text : ", value)
              // }}
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
                  setstart(startDate)
                  setend(endDate)
                  setdate(e)
                } else setCurrentSearch(0)
              }} />}
          </div>
        </div>
      )

    }))
