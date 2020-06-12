import React, { useState, useEffect } from 'react'
import { Input, Row, Col, Layout, Modal, Switch } from 'antd'
import styled from 'styled-components';
import SimpleSearch from '../simple-search'
import SimpleModal from '../simple-modal'
import SimpleSwitch from '../simple-switch'
import { useStores } from '../../hooks/use-stores'
import { StartupApi } from '../../services'
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
  const [stringSwitch, setStringSwitch] = useState([])
  const mockData = [
    { accountNumber: '123123123123', accountType: 'Binding to TCRB Mobile Banking', accountStatus: true },
    { accountNumber: '00993445123123', accountType: 'Binding to Micro Pay', accountStatus: false }
  ]
  // const [stringSwitch, setStringSwitch] = useState([
  //   [true, '123123123123', 'Binding to TCRB Mobile Banking'],
  //   [false, '00993445123123', 'Binding to Micro Pay'],
  // ])

  const { customerServicesMenuStore } = useStores()

  useEffect(() => {
    console.log(customerServicesMenuStore.getAccountInfo)
    convertArrayObjectToArray(customerServicesMenuStore.getAccountInfo).then(result => {
      customerServicesMenuStore.arrayAccountInfo = result
      // setStringSwitch(result)
    })
  })

  // useEffect(() => {
  //   // setStringSwitch(toJS(customerServicesMenuStore.arrayAccountInfo))
  // }, [visible])

  const searchIdCardNumber = async (value) => {
    console.log('eiei search:' + value)
    setIdCard(value)
    setIsSearch(true)
    //call api
    // customerServicesMenuStore.getAccountInfo = mockData
    await customerServicesMenuStore.getData()
    // console.log(toJS(customerServicesMenuStore.getAccountInfo))
    convertArrayObjectToArray(toJS(customerServicesMenuStore.getAccountInfo)).then(result => {
      customerServicesMenuStore.arrayAccountInfo = result
      setStringSwitch(result)
    })
    // convertArrayObjectToArray(mockData).then(result => {
    //   console.log(result)
    //   customerServicesMenuStore.arrayAccountInfo = result
    //   setStringSwitch(result)
    // })
    // console.log(stringSwitch)
  }
  const convertArrayObjectToArray = (arrayObject) => {
    return new Promise((resolve, reject) => {
      let result = arrayObject.map(a => [a.otp_is_locked, a.main_account_no, a.product_name_english]);
      resolve(result)
    })
  }
  const replaceNewDataForSetString = () => {
    let arrayAccountInfo = toJS(customerServicesMenuStore.getAccountInfo)
    let accountSelected = toJS(customerServicesMenuStore.accountSelected)
    // let newArray = stringSwitch.filter(accountInfo => accountInfo.accountNumber !== toJS(customerServicesMenuStore.accountSelected.accountNumber))
    let newArray = arrayAccountInfo.filter(accountInfo => accountInfo.main_account_no !== accountSelected.main_account_no)

    console.log(newArray, arrayAccountInfo)
    convertArrayObjectToArray([...newArray, accountSelected]).then(result => {
      console.log(result)
      setStringSwitch(result)
    })
  }

  const closeModal = () => {
    setVisble(false)
    setStringSwitch(toJS(customerServicesMenuStore.arrayAccountInfo))
  };
  const onChange = (switchSelected, index) => {
    console.log(switchSelected, index)
    if (switchSelected === true) {
      customerServicesMenuStore.accountSelected = toJS(customerServicesMenuStore.getAccountInfo)[index]
      setVisble(true)
      setModalString(
        <div style={{ textAlign: "center" }}>
          <p>Unlocking OTP!!</p>
          <p>Account Number {customerServicesMenuStore.accountSelected.main_account_no}</p>
        </div>
      )
    } else {
      // setIsChecked(false)
    }
  }

  const unlockOTP = () => {
    setVisble(false)

    //some action
    customerServicesMenuStore.accountSelected.otp_is_locked = false
    replaceNewDataForSetString()
  }


  return (
    <div style={{ marginTop: 20 }}>
      <Row gutter={[4, 24]}>
        <SimpleSearch search={searchIdCardNumber} prefixWording="ID Card Number" />
      </Row>
      {(isSearch) ? (
        <SimpleSwitch
          data={stringSwitch}
          onChange={(switchSelected, index) => onChange(switchSelected, index)} />
      ) : ('')}
      <SimpleModal
        onOk={() => unlockOTP()}
        onCancel={() => closeModal()}
        okText="Confirm"
        cancelText="Cancel"
        modalString={modalString}
        visible={visible}
      />
    </div>
  )
}
