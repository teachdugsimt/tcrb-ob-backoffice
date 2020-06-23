import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Select } from 'antd';
const { Option } = Select;


export default function SimpleMenu(props) {
  return (
    <div>
      <Select
        onChange={(value) => props.onChange(value)}
        style={{ width: '100%' }}
      >
        {props.options.map((item, index) => <Option key={index} value={item.partner_code}>{item.partner_code}/{item.partner_abbreviation}</Option>)}
      </Select>
    </div>
  )

}
