import React, { useState, useEffect } from 'react'
import { Input, Row, Col, Layout, Modal, Switch, Alert } from 'antd'
import styled from 'styled-components';
import SimpleSearch from '../simple-search'
import SimpleModal from '../simple-modal'
import SimpleSwitch from '../simple-switch'
import { useStores } from '../../hooks/use-stores'
import { toJS } from 'mobx';
import { i18n, withNamespaces } from '../../i18n'


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
  const [isSearch, setIsSearch] = useState(false);
  const [visible, setVisble] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [modalString, setModalString] = useState('')
  const [stringSwitch, setStringSwitch] = useState([])
  const [showAlertError, setShowAlertError] = useState(false)
  const mockData = [
    { accountNumber: '123123123123', accountType: 'Binding to TCRB Mobile Banking', accountStatus: true },
    { accountNumber: '00993445123123', accountType: 'Binding to Micro Pay', accountStatus: false }
  ]
  const { customerServicesMenuStore } = useStores()
  useEffect(() => {
    console.log(toJS(customerServicesMenuStore.accountInfoError))
    setShowAlertError(true)

  }, [toJS(customerServicesMenuStore.accountInfoError)])
  const searchIdCardNumber = async (value) => {
    setIsSearch(true)
    //call api
    await customerServicesMenuStore.getData(value)
    // when not found account
    setShowAlertError(true)
    // when found account
    // convertArrayObjectToArray(customerServicesMenuStore.accountInfo).then(result => {
    //   customerServicesMenuStore.arrayAccountInfo = result
    //   setStringSwitch(result)
    // })
  }
  const convertArrayObjectToArray = (arrayObject) => {
    return new Promise((resolve, reject) => {
      let result = arrayObject.map(a => [a.otp_is_locked, a.main_account_no, a.product_name_english]);
      resolve(result)
    })
  }
  const replaceNewDataForSetString = () => {
    let arrayAccountInfo = customerServicesMenuStore.accountInfo.data
    let accountSelected = customerServicesMenuStore.accountSelected
    let newArray = arrayAccountInfo.filter(accountInfo => accountInfo.main_account_no !== accountSelected.main_account_no)

    convertArrayObjectToArray([...newArray, accountSelected]).then(result => {
      setStringSwitch(result)
    })
  }

  const closeModal = () => {
    setVisble(false)
    // setStringSwitch(customerServicesMenuStore.arrayAccountInfo.data.data)
  };
  const onChange = (switchSelected, index) => {
    if (switchSelected === true) {
      customerServicesMenuStore.accountSelected = customerServicesMenuStore.accountInfo.data[index]
      // setStringSwitch(customerServicesMenuStore.arrayAccountInfo)
      setVisble(true)
      setModalString(
        <div style={{ textAlign: "center" }}>
          <p>{i18n.t("unlockingOtp")}</p>
          <p> {i18n.t("accountNumber") + " " + customerServicesMenuStore.accountSelected.main_account_no}</p>
        </div>
      )
    } else {
      // setIsChecked(false)
    }
  }

  const unlockOTP = () => {
    setVisble(false)
    //cal api
    customerServicesMenuStore.accountSelected.otp_is_locked = false
    replaceNewDataForSetString()
  }


  return (
    <div style={{ marginTop: 20 }}>
      <Row gutter={[4, 32]}>
        <SimpleSearch search={searchIdCardNumber} prefixWording={i18n.t("idCard")} loading={customerServicesMenuStore.accountInfoFetching} />
      </Row>
      <Row gutter={[4, 24]}>
        {(showAlertError) ? (<Alert message={customerServicesMenuStore.accountInfoError.responseData.userMessage} type="error" showIcon />) : ('')}
      </Row>
      {(isSearch) ? (
        <SimpleSwitch
          data={stringSwitch}
          onChange={(switchSelected, index) => onChange(switchSelected, index)} />
      ) : ('')}
      <SimpleModal
        onOk={() => unlockOTP()}
        onCancel={() => closeModal()}
        okText={i18n.t("confirm")}
        cancelText={i18n.t("cancel")}
        modalString={modalString}
        visible={visible}
      />
    </div>
  )
}
