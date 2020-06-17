import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components';
import { Menu, Dropdown, Button, message, DatePicker, Input } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';


const { RangePicker } = DatePicker;
const { Search } = Input

export const SearchBox =
  inject('customerServicesMenuStore')
    (observer((props) => {

      const [currentSearch, setCurrentSearch] = useState(0)

      function handleMenuClick(e) {
        message.info('Click on menu item.');
        console.log('click', e);
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

      return (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropdown overlay={menu}>
              <Button>
                {menuName[currentSearch]} <DownOutlined />
              </Button>
            </Dropdown>
            <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
          </div>
          {currentSearch == 6 && <RangePicker style={{ width: '100%' }} />}
        </div>
      )

    }))
