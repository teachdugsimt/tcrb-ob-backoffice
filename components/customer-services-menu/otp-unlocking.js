import React, { useState, useEffect } from 'react'
import { Input, Row, Col, Layout, Modal, Switch, Alert } from 'antd'
import styled from 'styled-components';
import SimpleSearch from '../simple-search'
import SimpleModal from '../simple-modal'
import SimpleSwitch from '../simple-switch'
import SimpleAlert from '../simple-alert'
import { inject, observer } from 'mobx-react'
import { get } from 'lodash'
import { toJS } from 'mobx';
// import { i18n, withNamespaces } from '../../i18n'
import { withTranslation } from '../../i18n'


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
const OtpUnlocking =
  inject('customerServicesMenuStore')
    (observer((props) => {
      const [idCard, setIdCard] = useState('');
      const [isSearch, setIsSearch] = useState(false);
      const [visible, setVisble] = useState(false)
      const [isChecked, setIsChecked] = useState(false)
      const [modalString, setModalString] = useState('')
      const [stringSwitch, setStringSwitch] = useState([])
      const [showAlertError, setShowAlertError] = useState(false)
      const { customerServicesMenuStore, t } = props

      useEffect(() => {
        if (isSearch) {
          setShowAlertError(true)
          setIsSearch(false)
        }
      }, [customerServicesMenuStore.accountInfoError])

      useEffect(() => {
        if (isSearch) {
          convertArrayObjectToArray(customerServicesMenuStore.accountInfo).then(result => {
            console.log(result)
            customerServicesMenuStore.arrayAccountInfo = result
            setStringSwitch(result)
          })
        }
      }, [customerServicesMenuStore.accountInfo])

      useEffect(() => {
        if (isSearch) {
          if (customerServicesMenuStore.unlockOtpInfo.ok) {
            customerServicesMenuStore.accountSelected.otp_is_locked = false
            replaceNewDataForSetString()
          }
        }
      }, [customerServicesMenuStore.unlockOtpInfo])

      useEffect(() => {
        customerServicesMenuStore.accountInfoError = null
      }, [])

      const searchIdCardNumber = async (value) => {
        setIdCard(value)
        setIsSearch(true)
        //call api
        await customerServicesMenuStore.getDataAccountOtpUnlock(value)
      }

      const convertArrayObjectToArray = (arrayObject) => {
        return new Promise((resolve, reject) => {
          let result = arrayObject.map(a => [a.otp_is_locked, a.main_account_no, a.product_name_english]);
          resolve(result)
        })
      }
      const replaceNewDataForSetString = () => {
        let arrayAccountInfo = customerServicesMenuStore.accountInfo
        let accountSelected = customerServicesMenuStore.accountSelected
        // let newArray = stringSwitch.filter(accountInfo => accountInfo.accountNumber !== toJS(customerServicesMenuStore.accountSelected.accountNumber))
        let newArray = arrayAccountInfo.filter(accountInfo => accountInfo.main_account_no !== accountSelected.main_account_no)

        convertArrayObjectToArray([...newArray, accountSelected]).then(result => {
          setStringSwitch(result)
        })
      }

      const closeModal = () => {
        setVisble(false)
        setStringSwitch(customerServicesMenuStore.arrayAccountInfo)

      };
      const onChange = (switchSelected, index) => {

        if (switchSelected === true) {

          customerServicesMenuStore.accountSelected = customerServicesMenuStore.accountInfo[index]
          setStringSwitch(customerServicesMenuStore.arrayAccountInfo)
          setVisble(true)
          setModalString(
            <div style={{ textAlign: "center" }}>
              <p>{t("unlockingOtp")}</p>
              <p> {t("accountNumber") + " " + customerServicesMenuStore.accountSelected.main_account_no}</p>
            </div>
          )

        } else {
          // setIsChecked(false)
        }
      }

      const unlockOTP = async () => {
        setVisble(false)
        await customerServicesMenuStore.submitUnlockOTP()
      }


      return (
        <div style={{ margin: 20 }}>
          <Row gutter={[4, 24]}>
            <SimpleSearch search={searchIdCardNumber} prefixWording={t("idCard")} loading={customerServicesMenuStore.searchFetching} />
          </Row>

          <Row gutter={[16, 24]}>
            <Col span={9}>
              {/* {(customerServicesMenuStore.accountInfoError) ? (<SimpleAlert message={
                get(customerServicesMenuStore.accountInfoError, 'responseData.message', 'Unknown Error')
              } type="error" showIcon />) : ('')} */}
              {customerServicesMenuStore.accountInfoError && <Alert
                message={customerServicesMenuStore.accountInfoError}
                description={''}
                type="error"
                closable
                onClose={() => customerServicesMenuStore.accountInfoError = null}
              />
              }
            </Col>
          </Row>
          {(isSearch) ? (
            <SimpleSwitch
              data={stringSwitch}
              onChange={(switchSelected, index) => onChange(switchSelected, index)} />
          ) : ('')}
          <SimpleModal
            onOk={() => unlockOTP()}
            onCancel={() => closeModal()}
            okText={t("confirm")}
            cancelText={t("cancel")}
            modalString={modalString}
            visible={visible}
          />
        </div>
      )
    }))

export default withTranslation('common')(OtpUnlocking)
