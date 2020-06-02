import React, { useState } from 'react'
import SimpleSearch from '../simple-search'
import styled from 'styled-components'
import { Row } from 'antd';
const StyledP = styled.a`
  display: initial;
  padding-right: ${({ theme }) => theme.spacing.medium}px !important;
  text-decoration-color: initial;
  text-decoration-line: underline;
`
export default function AccountUnbinding() {
  const [isSearch, setIsSearch] = useState(false);
  const searchIdCardNumber = (value) => {
    // console.log('eiei search:' + value)
    // setIdCard(value)
    setIsSearch(true)
  }
  const selectedMenu = (menu) => {
    switch (menu) {
      case '1':

        break;
      case '2':
        console.log('eiei menu2')
        break;
      default:
        break;
    }
  }
  return (
    <div>
      <Row>
        <SimpleSearch search={searchIdCardNumber} />
      </Row>
      {(isSearch) ? (
        <div>
          <Row>Normal Saving</Row>
          <Row><StyledP onClick={()=>{selectedMenu('2')}}>1234567890</StyledP>Resolving Loan-Non TCG Nano</Row>
        </div>) : ('')}
    </div>
  )
}
