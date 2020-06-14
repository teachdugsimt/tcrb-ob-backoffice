import React, { useState } from 'react'
import SimpleSearch from '../simple-search'
import styled from 'styled-components'
import { Row, Switch, Col, Button, Input } from 'antd';
import { useStores } from '../../hooks/use-stores'
import SimpleModal from '../simple-modal'
import { i18n, withNamespaces } from '../../i18n'
import { toJS } from 'mobx';

const StyledA = styled.a`
  display: initial;
  padding-right: ${({ theme }) => theme.spacing.medium}px !important;
  color: #F88008 !important;
  text-decoration-color: #F88008;
  text-decoration-line: underline;
`
const StyledP = styled.p`
  display: initial;
  padding-left: ${({ theme }) => theme.spacing.medium}px !important;
`
const StyledSpan = styled.span`

  display: initial;
  padding-left: ${({ theme }) => theme.spacing.medium}px !important;
`
const StyledInput = styled(Input)`
      ${({ readOnly }) => readOnly && `
          border-style: solid !important;
          border-width: 0px 0px 1px 0px !important;
          border-color: black !important;
          box-shadow: none !important;
          border-right-style: unset !important;
          border-right-width: 0px !important
      `}
`
export default function AccountUnbinding() {
  const [isSearch, setIsSearch] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  const [visible, setVisble] = useState(false)
  const [modalString, setModalString] = useState('')
  const [accountId, setAccountId] = useState('')
  const { customerServicesMenuStore } = useStores()
  // const stringSwitch = [{ accountName: i18n.t("bindingTCRBMobilBanking"), accountBindingStatus: true, accountType: '1' }, { accountName: i18n.t("bindingMicroPay"), accountBindingStatus: true, accountType: '2' }, { accountName: i18n.t("bindingTrueMoneyWallet"), accountBindingStatus: true, accountType: '3' }]
  // const stringAccount = [{ accountNumber: '2233344514', accountName: i18n.t("normalSaving"), accountType: '1' }, { accountNumber: '123456789032', accountName: i18n.t("revolvingLoanNonTCG"), accountType: '2' }]
  const stringSwitch = [{ accountName: 'Binding to TCRB Mobile Banking', accountBindingStatus: true, accountType: '1' }, { accountName: 'Binding to Micro Pay', accountBindingStatus: true, accountType: '2' }, { accountName: 'Binding to True Money Wallet', accountBindingStatus: true, accountType: '3' }]
  const [stringAccount, setStringAccount] = useState([])

  const searchIdCardNumber = async (value) => {
    // console.log('eiei search:' + value)
    // setIdCard(value)
    setIsSearch(true)
    // customerServicesMenuStore.setCitizenId(value)
    await customerServicesMenuStore.getData(value)
    setStringAccount(toJS(customerServicesMenuStore.accountInfo))

    // convertArrayObjectToArray(toJS(customerServicesMenuStore.getAccountInfo)).then(result => {
    //   customerServicesMenuStore.arrayAccountInfo = result
    //   setStringAccount(result)
    // })
  }

  const convertArrayObjectToArray = (arrayObject) => {
    return new Promise((resolve, reject) => {
      let result = arrayObject.map(a => [a.otp_is_locked, a.main_account_no, a.product_name_english]);
      resolve(result)
    })
  }
  const selectedMenu = (selectedAccount) => {
    console.log(selectedAccount)
    customerServicesMenuStore.setAccountId(selectedAccount.main_account_no)
    setViewDetail(true)
    // switch (selectedAccount.accountType) {
    //   case '1':
    //     customerServicesMenuStore.setAccountId(selectedAccount.accountNumber)
    //     setViewDetail(true)
    //     break;
    //   case '2':
    //     console.log('eiei menu2', selectedAccount)
    //     customerServicesMenuStore.setAccountId(selectedAccount.accountNumber)
    //     // setAccountId(accountId)
    //     setViewDetail(true)
    //     break;
    //   default:
    //     break;
    // }
  }
  const onChange = (switchSelected, index) => {
    // console.log("change:" + value + ",indexOf :" + index)

    if (switchSelected.accountBindingStatus === true) {
      setVisble(true)
      switch (switchSelected.accountType) {
        case '1':
          setModalString(
            <div style={{ textAlign: "center" }}>
              <p>{i18n.t("unbinding")}</p>
              <p> {i18n.t("account")+" "+customerServicesMenuStore.accountId} from Mobile Banking</p>
            </div>
          )
          break;
        case '2':
          setModalString(
            <div style={{ textAlign: "center" }}>
              <p>{i18n.t("unbinding")}</p>
              <p> {i18n.t("account")+" "+customerServicesMenuStore.accountId} from Micro Pay</p>
            </div>
          )
          break;
        case '3':
          setModalString(
            <div style={{ textAlign: "center" }}>
              <p>{i18n.t("unbinding")}</p>
              <p> {i18n.t("account")+" "+customerServicesMenuStore.accountId} from True Money Wallet</p>
            </div>
          )
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
          <Switch defaultChecked={string.accountBindingStatus} onChange={checked => onChange(string)} /><StyledP>{string.accountName}</StyledP>
        </Col>
      </Row>
    );
    return (
      <ul>{listItems}</ul>
    );
  }
  const AccountList = () => {
    const listItems = stringAccount.map((string, index) =>
      <Row key={index}>
        <Col span={24}>
          <StyledA onClick={() => { selectedMenu(string) }}>{string.main_account_no}</StyledA><StyledSpan> {string.product_name_english}</StyledSpan>

        </Col>
      </Row>
    );
    return (
      <ul>{listItems}</ul>
    );
  }
  const newSearch = (
    <div style={{ marginTop: 20 }}>
      <Row gutter={[4, 24]}>
        <SimpleSearch search={searchIdCardNumber} prefixWording={i18n.t("idCard")} />
      </Row>
      {(isSearch) ? (
        <AccountList />
      ) : ('')}
    </div>)

  const accountDetail = (
    <div style={{ margin: 20 }}>
      {/* <Row gutter={[4, 24]}>
        <Button onClick={() => setViewDetail(false)}>{i18n.t("back")}</Button>
      </Row> */}
      <Row gutter={[4, 24]} align="top">
        <Col span={6}>
          <StyledInput readOnly={true} prefix={i18n.t('accountNumber')} defaultValue={customerServicesMenuStore.accountId} />

        </Col>
      </Row>
      <Row gutter={[4, 24]} align="middle">
        <SwitchList />
        <SimpleModal
          onOk={() => setVisble(false)}
          onCancel={() => setVisble(false)}
          okText="Confirm"
          cancelText="Cancel"
          modalString={modalString}
          visible={visible}
        />
      </Row>
      {/* <div style={{ marginTop: 20 }} >
        <SwitchList />
        <SimpleModal
          onOk={() => setVisble(false)}
          onCancel={() => setVisble(false)}
          okText="Confirm"
          cancelText="Cancel"
          modalString={modalString}
          visible={visible}
        />
      </div> */}
      <Row gutter={[4, 24]} align="bottom" justify="center">
        <Col span={6}>
          <Button shape="round" onClick={() => setViewDetail(false)}>Back</Button>

        </Col>
      </Row>
    </div>
  )
  return (viewDetail) ? accountDetail : newSearch



}
