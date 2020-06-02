import React from 'react'
import { Input, Button } from 'antd'
import styled from 'styled-components';

const { Search } = Input;

const StyledSearch = styled(Search)`
.ant-input-affix-wrapper{
    border-style: solid !important;
    border-width: 0px 0px 1px 0px !important;
    border-color: black !important;
},
.ant-input-prefix {
  margin-right: ${({ theme }) => theme.spacing.large}px !important;
}
  if(props.disabled === true){
    .ant-input-group-addon{
      display: none;
    }
  }
`

export default function SimpleSearch(props) {
  return (
    <div>
      <StyledSearch
        prefix="ID Card Number"
        placeholder="input ID Card"
        enterButton="Search"
        size="large"
        disabled={props.disabled}
        onSearch={value => props.search(value)}
      />
    </div>
  )
}
