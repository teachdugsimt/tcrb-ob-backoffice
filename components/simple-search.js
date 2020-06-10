import React, { useEffect } from 'react'
import { Input, Button } from 'antd'
import styled from 'styled-components';

const { Search } = Input;

const StyledSearch = styled(Search)`
.ant-input-affix-wrapper{
  border-style: solid !important;
  border-width: 0px 0px 1px 0px !important;
  border-color: black !important;
  box-shadow: none !important;
},
.ant-input-affix-wrapper:hover{
  border-right-width: 0px !important
}
.ant-input-prefix {
  margin-right: ${({ theme }) => theme.spacing.large}px !important;
}
.ant-input-group-addon{
  display: ${props => props.disabled ? "none" : "table-cell"};
}`


export default function SimpleSearch(props) {
  // console.log(props.defaultValue)
  return (
    <div>
      <StyledSearch
        prefix={props.prefixWording}
        placeholder="input ID Card"
        enterButton="Search"
        size="large"
        disabled={props.disabled}
        onSearch={value => props.search(value)}
        onChange={() => console.log('change')}
        defaultValue={props.defaultValue}
        loading={false}
      />
    </div>
  )
}
