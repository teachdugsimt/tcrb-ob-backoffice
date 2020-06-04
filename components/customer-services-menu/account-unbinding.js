import React, { useState } from 'react'
import SimpleSearch from '../simple-search'
import styled from 'styled-components'
import { Row, Switch, Col } from 'antd';
import SimpleModal from '../simple-modal'

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
  const [visible, setVisble] = useState(false)
  const [modalString, setModalString] = useState('')
  const [accountId, setAccountId] = useState('')
  const numbers = [1, 2, 3, 4, 5];
  const stringSwitch = ['Binding to TCRB Mobile Banking', 'Binding to Micro Pay', 'Binding to True Money Wallet']

  const searchIdCardNumber = (value) => {
    // console.log('eiei search:' + value)
    // setIdCard(value)
    setIsSearch(true)
  }
  const selectedMenu = (menu, accountId) => {
    switch (menu) {
      case '1':

        break;
      case '2':
        console.log('eiei menu2')
        setAccountId(accountId)
        setViewDetail(true)
        break;
      default:
        break;
    }
  }
  const onChange = (value, index) => {
    console.log("change:" + value + ",indexOf :" + index)

    if (value === true) {
      setVisble(true)
      // setIsChecked(true)
      switch (index) {
        case 0:
          setModalString(
            <div>
              <p>Unlocking OTP!!</p>
              <p>Customer ID Card Number {idCard}</p>
              <p>Mobile Number </p>
              </div>
          )
          break;
        case 1:

          break;
        case 2:

          break;
        default:
          break;
      }
    } else {
      // setIsChecked(false)
    }
  }

  const unBindingAccount = () => {

  }

  const SwitchList = () => {
    const listItems = stringSwitch.map((string, index) =>
      <Row key={index}>
        <Col span={24}>
          <Switch defaultChecked={false} onChange={checked => onChange(checked, index)} /><StyledP>{string}</StyledP>
        </Col>
      </Row>
    );
    return (
      <ul>{listItems}</ul>
    );
  }
  const newSearch = (
    <div style={{ marginTop: 20 }}>
      <Row>
        <SimpleSearch search={searchIdCardNumber}  prefixWording="ID Card Number"/>
      </Row>
      {(isSearch) ? (
        <div style={{ marginTop: 20 }}>
          <Row><StyledA onClick={() => { selectedMenu('1') }}>2233344514</StyledA>Normal Saving</Row>
          <Row><StyledA onClick={() => { selectedMenu('2', '123456789032') }}>123456789032</StyledA>Resolving Loan-Non TCG Nano</Row>
        </div>) : ('')}
    </div>)

  const accountDetail = (
    <div style={{ marginTop: 20 }}>
      <Row>
        <SimpleSearch disabled={true} defaultValue={"1234"} prefixWording="Account No"/>
      </Row>
      <div style={{ marginTop: 20 }} >
        <SwitchList/>
        <SimpleModal
          onOk={() => unlockOTP()}
          onCancel={() => setVisble(false)}
          okText="Confirm"
          cancelText="Cancel"
          modalString={modalString}
          visible={visible}
        />
      </div>
    </div>
  )
  return (viewDetail) ? accountDetail : newSearch



}
