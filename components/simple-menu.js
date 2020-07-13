import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Select } from 'antd';
import { withTranslation } from '../i18n'
const { Option } = Select;


function SimpleMenu(props) {
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
export default withTranslation('common')(SimpleMenu)
