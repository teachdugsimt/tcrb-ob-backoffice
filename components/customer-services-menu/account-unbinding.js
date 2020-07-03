import React, { useState, useEffect } from 'react'
import SimpleSearch from '../simple-search'
import SimpleSwitch from '../simple-switch'
import styled from 'styled-components'
import { Row, Switch, Col, Button, Input, Alert } from 'antd';
import SimpleModal from '../simple-modal'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx';
import { withTranslation } from '../../i18n'
import { TcrbSwitch } from '../antd-styles/styles'

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
const AccountUnbinding =
  inject('customerServicesMenuStore')
    (observer((props) => {
      const [isSearch, setIsSearch] = useState(false);
      const [viewDetail, setViewDetail] = useState(false);
      const [visible, setVisble] = useState(false)
      const [modalString, setModalString] = useState('')
      const [accountId, setAccountId] = useState('')
      const mockData = [{ accountName: 'Binding to TCRB Mobile Banking', accountBindingStatus: true, accountType: '1', main_account_no: '22223425566' }, { accountName: 'Binding to Micro Pay', accountBindingStatus: true, accountType: '2', main_account_no: '554432268776' }, { accountName: 'Binding to True Money Wallet', accountBindingStatus: true, accountType: '3', main_account_no: '11445677543' }]
      const [stringAccount, setStringAccount] = useState([])
      const [stringSwitch, setStringSwitch] = useState([])
      const { customerServicesMenuStore, t } = props

      useEffect(() => {
        if (isSearch) {
          setStringAccount(customerServicesMenuStore.accountInfo)
        }
      }, [customerServicesMenuStore.accountInfo])

      useEffect(() => {
        customerServicesMenuStore.accountInfoError = null
      }, [])

      useEffect(() => {
        if (isSearch) {
          if (customerServicesMenuStore.unbindAccountInfo) {
            convertArrayObjectToArray(customerServicesMenuStore.unbindAccountInfo).then(result => {
              console.log(result)
              customerServicesMenuStore.arrayUnbindAccountInfo = result
              setStringSwitch(result)
            })
          }
        }
      }, [customerServicesMenuStore.unbindAccountInfo])

      const searchIdCardNumber = async (value) => {
        setIsSearch(true)
        await customerServicesMenuStore.getDataAccountUnbind(value)

      }

      const backSearch = async () => {
        setViewDetail(false)
        setIsSearch(false)
        setStringAccount([])
      }

      const convertArrayObjectToArray = (arrayObject) => {
        return new Promise((resolve, reject) => {
          let result = arrayObject.map(accountDetail => [(accountDetail.binding_status == '1') ? true : false, accountDetail.partner_name_english]);
          resolve(result)
        })
      }

      const selectAccount = async (selectedAccount) => {
        console.log(toJS(selectedAccount))
        customerServicesMenuStore.setAccountId(selectedAccount.main_account_no)
        await customerServicesMenuStore.getDataAccountProduct(selectedAccount.main_account_no)
        setViewDetail(true)

      }
      const onChange = (switchSelected, index) => {
        console.log("indexOf :" + index, switchSelected)
        console.log(toJS(customerServicesMenuStore.unbindAccountInfo[index]))
        let accountSelected = customerServicesMenuStore.unbindAccountInfo[index]

        if (switchSelected === true) {
          setVisble(true)
          switch (accountSelected.partner_code) {
            case "TMDS":
              setModalString(
                <div style={{ textAlign: "center" }}>
                  <p>{t("unbinding")}</p>
                  <p> {t("account") + " " + accountSelected.main_account_no} from Micro Pay</p>
                </div>
              )
              break;
          }
        } else {
        }
      }

      const unBindingAccount = async () => {
        setVisble(false)
        // call api
        await customerServicesMenuStore.submitAccountUnbiding()
      }

      const AccountList = () => {
        const listItems = stringAccount.map((string, index) =>
          <Row key={index} gutter={[4, 24]}>
            <Col span={24}>
              <StyledA onClick={() => { selectAccount(string) }}>{string.main_account_no}</StyledA><StyledSpan> {string.product_name_english}</StyledSpan>

            </Col>
          </Row>
        );
        return (
          <ul style={{ paddingInlineStart: 0 }}>{listItems}</ul>
        );
      }
      const newSearch = () => {
        console.log(customerServicesMenuStore.accountInfoError)
        return (
          <div style={{ margin: 20 }}>
            <Row gutter={[4, 24]}>
              <SimpleSearch search={searchIdCardNumber} prefixWording={t("idCard")} loading={customerServicesMenuStore.searchFetching} />
            </Row>
            <Row gutter={[16, 24]}>
              <Col span={9}>
                <div style={{}}>
                  {customerServicesMenuStore.accountInfoError && <Alert
                    message={customerServicesMenuStore.accountInfoError}
                    description={''}
                    type="error"
                    closable
                    onClose={() => customerServicesMenuStore.accountInfoError = null}
                  />
                  }
                </div>
              </Col>
            </Row>
            {(isSearch) ? (
              <AccountList />
            ) : ('')}
          </div>)
      }

      const accountDetail = (
        <div style={{ margin: 20 }}>

          <Row gutter={[4, 24]} align="top">
            <Col span={6}>
              <StyledInput readOnly={true} prefix={t('accountNumber')} defaultValue={customerServicesMenuStore.accountId} />
            </Col>
          </Row>
          <Row gutter={[16, 24]}>
            <Col span={9}>
              <div style={{}}>
                {customerServicesMenuStore.accountInfoError && <Alert
                  message={customerServicesMenuStore.accountInfoError}
                  description={''}
                  type="error"
                  closable
                  onClose={() => customerServicesMenuStore.accountInfoError = null}
                />
                }
              </div>
            </Col>
          </Row>

          <Row gutter={[4, 24]} align="middle">
            <SimpleSwitch
              data={stringSwitch}
              onChange={(switchSelected, index) => onChange(switchSelected, index)}
              isBinding={true}
            />
            <SimpleModal
              onOk={() => unBindingAccount()}
              onCancel={() => setVisble(false)}
              okText="Confirm"
              cancelText="Cancel"
              modalString={modalString}
              visible={visible}
            />
          </Row>

          <Row gutter={[4, 24]} align="bottom" justify="center">
            <Col span={6}>
              <Button shape="round" onClick={() => backSearch()}>Back</Button>

            </Col>
          </Row>
        </div>
      )
      return (viewDetail) ? accountDetail : newSearch()
    }))
export default withTranslation('common')(AccountUnbinding)
