import React, { useState } from 'react'
import SimpleSearch from '../simple-search'
import styled from 'styled-components'
import { Row, Switch, Col } from 'antd';
const StyledA = styled.a`
  display: initial;
  padding-right: ${({ theme }) => theme.spacing.medium}px !important;
  text-decoration-color: initial;
  text-decoration-line: underline;
`
const StyledP = styled.p`
  display: initial;
  padding-left: ${({ theme }) => theme.spacing.medium}px !important;
`
export default function AccountUnbinding() {
  const [isSearch, setIsSearch] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
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
        setViewDetail(true)
        break;
      default:
        break;
    }
  }
  const onChange = (value) => {
    console.log("change:" + value)

    if (value === true) {
      // setVisble(true)
      // setIsChecked(true)
      // Modal.confirm({
      //   title: 'Confirm',
      //   content: 'Unlocking OTP!!Customer Id Card Number',
      //   okText: 'Confirm',
      //   cancelText: 'Cancel',
      // });
    } else {
      // setIsChecked(false)
    }
  }
  const newSearch = (
    <div style={{ marginTop: 20 }}>
      <Row>
        <SimpleSearch search={searchIdCardNumber} />
      </Row>
      {(isSearch) ? (
        <div style={{ marginTop: 20 }}>
          <Row><StyledA onClick={() => { selectedMenu('1') }}>2233344514</StyledA>Normal Saving</Row>
          <Row><StyledA onClick={() => { selectedMenu('2') }}>123456789032</StyledA>Resolving Loan-Non TCG Nano</Row>
        </div>) : ('')}
    </div>)

  const accountDetail = (
    <div style={{ marginTop: 20 }}>
      <Row>
        <SimpleSearch search={searchIdCardNumber} disabled={true} />
      </Row>
      <div style={{ marginTop: 20 }} >
      <Row>
        <Col span={24}>
          <Switch defaultChecked={false} onChange={checked => onChange(checked)} /><StyledP>Binding to TCRB Mobile Banking</StyledP>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Switch defaultChecked={true} onChange={checked => onChange(checked)} /><StyledP>Binding to Micro Pay</StyledP>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Switch defaultChecked={false} onChange={checked => onChange(checked)} /><StyledP>Binding to True Money Wallet</StyledP>
        </Col>
      </Row>
      </div>
    </div>
  )
  return (viewDetail) ? accountDetail : newSearch



}
