import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components';
import { Menu, Dropdown, Button, message, DatePicker, Input } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { data } from './data'

const { RangePicker } = DatePicker;
const { Search } = Input

export const SearchBox =
  inject('customerServiceEnquiry')
    (observer((props) => {
      const { customerServiceEnquiry } = props
      const [currentSearch, setCurrentSearch] = useState(0)
      const [dateValue, setdate] = useState(null)


      function handleMenuClick(e) {
        message.info('Click on menu item.');
        console.log('click', e);
        setCurrentSearch(e.item.props.index)
        console.log("????? SEARCH :: ", currentSearch)
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
        if (value && value != "") {
          let focus_menu = menuName[currentSearch]
          console.log("_handleSearch -> focus_menu", focus_menu)
          let text_search = value
          console.log("_handleSearch -> text_search", text_search)
          let list_item = JSON.parse(JSON.stringify(data))
          console.log("_handleSearch -> list_item", list_item)

          if (focus_menu == "Search by ID Card Number") {
            let tmp = list_item.filter(e => e.citizen_id.includes(text_search))
            console.log("_handleSearch -> tmp", tmp)
            customerServiceEnquiry.setListData(tmp)
          }
          else if (focus_menu == "Search by Account No") {
            let tmp = list_item.filter(e => e.main_account_no.includes(text_search) || e.sub_account_no.includes(text_search))
            customerServiceEnquiry.setListData(tmp)
          }
          else if (focus_menu == "Search by Entity") {
            let tmp = list_item.filter(e => e.parent_partner_code.includes(text_search))
            customerServiceEnquiry.setListData(tmp)
          }
          else if (focus_menu == "Search by Entity and Channel") {
            let tmp = list_item.filter(e => e.channel.includes(text_search))
            customerServiceEnquiry.setListData(tmp)
          }
          else if (focus_menu == "Search by Product Type") {
            let tmp = list_item.filter(e => e.product_type.includes(text_search))
            customerServiceEnquiry.setListData(tmp)
          }
          else if (focus_menu == "Search by Range of Date&Time") {
            // let tmp = list_item.filter(e => e.citizen_id == text_search)
            // customerServiceEnquiry.setListData(tmp)
          }
        } else {
          customerServiceEnquiry.setListData(data)
        }
      }

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
            {currentSearch == 6 && <RangePicker style={{ width: '100%' }} onChange={(e) => setdate(e)} />}
          </div>
        </div>
      )

    }))
