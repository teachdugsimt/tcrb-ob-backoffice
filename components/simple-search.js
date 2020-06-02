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
.ant-input{
  padding-left: ${({ theme }) => theme.spacing.large}px !important;
}`

export default function SimpleSearch(props) {
  return (
    <div>
      <StyledSearch
        prefix="input card number"
        placeholder="input search text"
        enterButton="Search"
        size="large"
        onSearch={value=>props.search(value)}
      />
    </div>
  )
}
