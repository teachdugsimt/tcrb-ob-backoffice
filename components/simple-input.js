import React from 'react'
import styled from 'styled-components'
import { Input } from 'antd'
const StyledInput = styled(Input)`
          border-style: solid !important;
          border-width: 0px 0px 1px 0px !important;
          border-color: black !important;
          box-shadow: none !important;
          border-right-style: unset !important;
          border-right-width: 0px !important;
          border-radius: 0px;
           .ant-input{
            text-align: right !important;
          }
          .ant-input-suffix{
            width:50px !important;
          }
`
export default function SimpleInput(props) {
  return (
    <div>
      <StyledInput onChange={(e) => props.onChange(e.target.value)} prefix={props.prefix} suffix={props.suffix} readOnly={props.readOnly} defaultValue={props.defaultValue} />
    </div>
  )
}
