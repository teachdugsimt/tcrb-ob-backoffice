import React from 'react'
import styled from 'styled-components'
// import { Input } from 'antd'
const Label = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
`
const Key = styled.div`
  padding: 2px 10px;
  background-color: ${({ theme }) => theme.colors.dim}
`
const Value = styled.div`
  padding: 2px 10px;
  background-color: ${({ theme }) => theme.colors.grey}
`

export default function SimpleLabel(props) {
  return (
    <Label><Key>{props.label}</Key><Value>{props.value}</Value></Label>
  )
}
