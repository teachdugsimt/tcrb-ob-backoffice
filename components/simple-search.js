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
.input:focus .input:hover {
    outline: none !important;
    ${'' /* border-color: none !important; */}
},
.ant-input-affix-wrapper-focused .ant-input-affix-wrapper:focused {
    ${'' /* border: none !important; */}
    ${'' /* border-color: none !important; */}
    border-top-width: 0px !important;

},
.ant-input-affix-wrapper:hover{
  border-right-width: 0px !important
}
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
