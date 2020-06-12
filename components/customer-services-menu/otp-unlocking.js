import React, { useState, useEffect } from 'react'
import { Input, Row, Col, Layout, Modal, Switch } from 'antd'
import styled from 'styled-components';
import SimpleSearch from '../simple-search'
import SimpleModal from '../simple-modal'
import SimpleSwitch from '../simple-switch'
import { useStores } from '../../hooks/use-stores'
import { toJS } from 'mobx';


const StyledA = styled.a`
  display: initial;
  padding-left: ${({ theme }) => theme.spacing.medium}px !important;
  color: #F88008 !important;
  text-decoration-color: #F88008;
  text-decoration-line: underline;
`
const StyledSpan = styled.span`

  display: initial;
  padding-left: ${({ theme }) => theme.spacing.medium}px !important;
`
const StyledSwitch = styled(Switch)`

      ${({ defaultChecked }) => defaultChecked && `
      background-color: #F88008 !important;
  `}
`

export default function OtpUnlocking
  () {
  const [idCard, setIdCard] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [visible, setVisble] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [modalString, setModalString] = useState('')
  // const [stringSwitch, setStringSwitch] = useState([
  //   { accountNumber: '123123123123', accountType: 'Binding to TCRB Mobile Banking', accountStatus: true },
  //   { accountNumber: '00993445123123', accountType: 'Binding to Micro Pay', accountStatus: false }
  // ])
  const [stringSwitch, setStringSwitch] = useState([
    [true, '123123123123', 'Binding to TCRB Mobile Banking'],
    [false, '00993445123123', 'Binding to Micro Pay'],
  ])
  const { customerServicesMenuStore } = useStores()
  const searchIdCardNumber = (value) => {
    console.log('eiei search:' + value)
    setIdCard(value)
    setIsSearch(true)
  }

  const replaceNewDataForSetString = () => {
    let newArray = stringSwitch.filter(accountInfo => accountInfo.accountNumber !== toJS(customerServicesMenuStore.accountSelected.accountNumber))
    setStringSwitch([...newArray, toJS(customerServicesMenuStore.accountSelected)])
  }

  const hideModal = () => {
    this.setState({
      visible: false,
    });
  };
  const onChange = (switchSelected, index) => {
    console.log(switchSelected)
    if (switchSelected.accountStatus === true) {
      customerServicesMenuStore.accountSelected = switchSelected
      setVisble(true)
      setIsChecked(true)
      setModalString(
        <div style={{ textAlign: "center" }}>
          <p>Unlocking OTP!!</p>
          <p>Account Number {switchSelected.accountNumber}</p>
        </div>
      )
    } else {
      // setIsChecked(false)
    }
  }

  const unlockOTP = () => {
    //some action
    customerServicesMenuStore.accountSelected.accountStatus = false
    setVisble(false)
    replaceNewDataForSetString()
  }


  return (
    <div style={{ margin: 20 }}>
      <Row gutter={[4, 24]}>
        <SimpleSearch search={searchIdCardNumber} prefixWording="ID Card Number" />
      </Row>
      {(isSearch) ? (
        <SimpleSwitch
          data={stringSwitch}
          onChange={(switchSelected) => onChange(switchSelected)} />
      ) : ('')}
      <SimpleModal
        onOk={() => unlockOTP()}
        onCancel={() => setVisble(false)}
        okText="Confirm"
        cancelText="Cancel"
        modalString={modalString}
        visible={visible}
      />
    </div>
  )
}
