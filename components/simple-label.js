import React from 'react'
import styled from 'styled-components'
// import { Input } from 'antd'
import { withTranslation } from '../i18n'
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

function SimpleLabel(props) {
  return (
    <Label><Key>{props.label}</Key><Value>{props.value}</Value></Label>
  )
}

export default withTranslation('common')(SimpleLabel)
