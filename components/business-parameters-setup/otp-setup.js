import React, { useEffect, useRef, useState } from 'react'
import { Input, Row, Col, Alert, Table } from 'antd'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { withTranslation } from '../../i18n'
import SimpleModal from '../simple-modal'
import SimpleInput from '../simple-input'
import { TcrbButton } from '../antd-styles/styles'
import { toJS } from 'mobx'
import { addKeyToDataSource } from '../data-utility'

const OtpSetup =
  inject('businessParametersSetupStore')
    (observer((props) => {
      const { t, businessParametersSetupStore } = props
      const [expireOtp, setExpire] = useState('')
      const [visibleExpireEdit, setvisibleExpireEdit] = useState(true)
      const [visibleExpireSubmit, setvisibleExpireSubmit] = useState(false)

      const [newMaximumOtp, setNewMaximumOtp] = useState('')
      const [visibleEditMaximum, setvisibleEditMaximum] = useState(true)
      const [visibleSubmitMaximum, setvisibleSubmitMaximum] = useState(false)

      const [visible, setVisible] = useState(false)
      const [modalString, setModal] = useState("")
      const [isReadOnlyInputExpiration, setIsReadOnlyInputExpiration] = useState(true)
      const [isReadOnlyInputMaximum, setIsReadOnlyInputMaximum] = useState(true)
      const [isDisableEditExpiration, setIsDisableEditExpiration] = useState(false)
      const [isDisableEditMaximum, setIsDisabledEditMaximum] = useState(false)
      const [dataSourceOtpPendingList, setDataSourceOtpPendingList] = useState([])

      const [titleModal, setTitleModal] = useState("")
      const [modalType, setModalType] = useState("")
      const [textCancel, setTextCancel] = useState("")
      const [textOk, setTextOk] = useState("")
      const [typeUpdate, setTypeUpdate] = useState("")

      useEffect(() => {
        /* if (!businessParametersSetupStore.responseGetOtpValue || businessParametersSetupStore.fetchingGetOtp == null) {
          let data = { otpParamsField: "OTP_EXPIRE_TIME,OTP_MAXIMUM_ENTERED,OTP_TOKEN_EXPIRE_TIME" }
          businessParametersSetupStore.getOTPdata(data)
          console.log('getOtpData')
        } */
        let data = { otpParamsField: "OTP_EXPIRE_TIME,OTP_MAXIMUM_ENTERED,OTP_TOKEN_EXPIRE_TIME" }
        businessParametersSetupStore.getOTPdata(data)
        businessParametersSetupStore.responseUpdateOtp = null
        businessParametersSetupStore.responseGetOtpValue = null
        businessParametersSetupStore.getDataOtpPendingList()
      }, [])

      useEffect(() => {
        if (businessParametersSetupStore.responseGetOtpPending != null) {
          let newRequestOtpPending = businessParametersSetupStore.responseGetOtpPending
          for (let index = 0; index < newRequestOtpPending.length; index++) {
            let dataToJs = JSON.parse(newRequestOtpPending[index].data)
            switch (newRequestOtpPending[index].change_sub_type) {
              case "OTP_EXPIRE_TIME":
                newRequestOtpPending[index].currentData = dataToJs.Current.OTP_EXPIRE_TIME
                newRequestOtpPending[index].newData = dataToJs.New.OTP_EXPIRE_TIME
                break;
              case "OTP_MAXIMUM_ENTERED":
                newRequestOtpPending[index].currentData = dataToJs.Current.OTP_MAXIMUM_ENTERED
                newRequestOtpPending[index].newData = dataToJs.New.OTP_MAXIMUM_ENTERED
                break;

              default:
                break;
            }
          }
          addKeyToDataSource(newRequestOtpPending).then(result => {
            setDataSourceOtpPendingList(result)
          })
        }

      }, [businessParametersSetupStore.responseGetOtpPending])
      useEffect(() => {
        if (businessParametersSetupStore.responseGetOtpValue != null) {
          let newProps = businessParametersSetupStore.responseGetOtpValue
          if (newProps && newProps != undefined) {
            if (!expireOtp || !newMaximumOtp) {
              let tmpExpire = newProps.find(e => e.Name == "OTP_EXPIRE_TIME")
              let tmpMaximum = newProps.find(e => e.Name == "OTP_MAXIMUM_ENTERED")
              setExpire(tmpExpire.Value)
              setNewMaximumOtp(tmpMaximum.Value)
            }
          }
        }
      }, [businessParametersSetupStore.responseGetOtpValue])

      useEffect(() => {
        let newProps = JSON.parse(JSON.stringify(businessParametersSetupStore.responseUpdateOtp))
        let fetch = businessParametersSetupStore.fetchingUpdateOtp
        let error = businessParametersSetupStore.errorUpdateOtp
        if ((newProps && !fetch) && !error) {
          setVisible(true)
          setModal(<div style={{ textAlign: 'center' }}>Update{" "}{typeUpdate}{" "}Success<br />Your changes will take effect after being approved.</div>)
          setTitleModal("Success")
          setModalType("close")
          setTextCancel("close")
        } else if (error) {
          setVisible(true)
          setModal(<div style={{ textAlign: 'center', color: 'red' }}>Error Message : {" "}{newProps.userMessage}</div>)
          setTitleModal("Error")
          setModalType("error")
          setTextCancel("close")
        }

      }, [businessParametersSetupStore.responseUpdateOtp])

      const _onClickExpiration = () => {
        setIsReadOnlyInputExpiration(false)
        let expire = document.getElementById("otp-expiration-period")
        expire.style.color = "orange"
        expire.focus()
        setvisibleExpireEdit(false)
        setvisibleExpireSubmit(true)
        setIsDisabledEditMaximum(true)
      }

      const _onClickMaximumRetry = () => {
        setIsReadOnlyInputMaximum(false)
        let maximum = document.getElementById("otp-maximum-retrying")
        maximum.style.color = "orange"
        maximum.focus()
        setvisibleEditMaximum(false)
        setvisibleSubmitMaximum(true)
        setIsDisableEditExpiration(true)
      }

      const _openPopup = (text) => {
        setVisible(true)
        if (text == "maximum") {
          let currentMaximumOtp = getValueFromStore("maximum")
          if (newMaximumOtp == currentMaximumOtp) {
            setModal(<div style={{ textAlign: 'center', color: 'red' }}>Error: OTP Maximum is not change <br />value : {newMaximumOtp}</div>)
            setTitleModal("Error")
            setModalType("error")
            setTextCancel("cancel")
          }
          else if (!newMaximumOtp) {
            setModal(<div style={{ textAlign: 'center', color: 'red' }}>Error: OTP Maximum is not empty</div>)
            setTitleModal("Error")
            setModalType("error")
            setTextCancel("cancel")
          }
          else {
            setModal(<div style={{ textAlign: 'center' }}>Confirm update OTP {text} Retrying !!!<br />{currentMaximumOtp} to {newMaximumOtp}</div>)
            setTitleModal("Confirm")
            setModalType("confirm")
            setTextCancel("cancel")
            setTextOk("confirm")
          }
        }
        else {
          let currentExpireOtp = getValueFromStore("expire")
          if (expireOtp == currentExpireOtp) {
            setModal(<div style={{ textAlign: 'center', color: 'red' }}>Error: OTP Expire is not change <br />value : {expireOtp}</div>)
            setTitleModal("Error")
            setModalType("error")
            setTextCancel("cancel")
          }
          else if (!expireOtp) {
            setModal(<div style={{ textAlign: 'center', color: 'red' }}>Error: OTP Expire is not empty</div>)
            setTitleModal("Error")
            setModalType("error")
            setTextCancel("cancel")
          }
          else {
            setModal(<div style={{ textAlign: 'center' }}>Confirm update OTP {text} Period !!!<br />{currentExpireOtp} to {expireOtp}</div>)
            setTitleModal("Confirm")
            setModalType("confirm")
            setTextCancel("cancel")
            setTextOk("confirm")
          }
        }

      }

      const _setUnfocus = (type) => {
        if (type == "expire") {
          let expire = document.getElementById("otp-expiration-period")
          expire.style.color = "rgba(0, 0, 0, 0.65)"
          expire.blur()
        } else {
          let maximum = document.getElementById("otp-maximum-retrying")
          maximum.style.color = "rgba(0, 0, 0, 0.65)"
          maximum.focus()
        }
      }

      const _onConfirm = async () => {
        let currentMaximumOtp = getValueFromStore("maximum")
        let currentExpireOtp = getValueFromStore("expire")
        if (currentMaximumOtp != newMaximumOtp) {

          let data = {
            currentData: {
              OTP_MAXIMUM_ENTERED: currentMaximumOtp
            },
            newData: {
              OTP_MAXIMUM_ENTERED: newMaximumOtp
            },
            maker_id: 51
          }
          setVisible(false)
          setIsReadOnlyInputMaximum(true)
          setvisibleEditMaximum(true)
          setvisibleSubmitMaximum(false)
          setIsDisableEditExpiration(false)
          _setUnfocus("maximum")
          setNewMaximumOtp(currentMaximumOtp)
          setTypeUpdate("Maximum OTP")
          await businessParametersSetupStore.updateOTPdata(data)

        }
        if (currentExpireOtp != expireOtp) {
          let data = {
            currentData: {
              OTP_EXPIRE_TIME: currentExpireOtp
            },
            newData: {
              OTP_EXPIRE_TIME: expireOtp
            },
            maker_id: 59
          }

          setVisible(false)
          setIsReadOnlyInputExpiration(true)
          setvisibleExpireEdit(true)
          setvisibleExpireSubmit(false)
          setIsDisabledEditMaximum(false)
          _setUnfocus("expire")
          setExpire(currentExpireOtp)
          setTypeUpdate("Expire OTP")
          await businessParametersSetupStore.updateOTPdata(data)

        }
      }

      const columnOtpPending = [
        {
          title: 'Change Type',
          dataIndex: 'change_sub_type',
        },
        {
          title: 'Current Value',
          dataIndex: 'currentData',
        },
        {
          title: 'New Value',
          dataIndex: 'newData',
        }
      ]
      const getValueFromStore = (type) => {
        let old_data = JSON.parse(JSON.stringify(businessParametersSetupStore.responseGetOtpValue))
        if (type == "expire") {
          let tmpExpire = old_data.find(oldData => oldData.Name == "OTP_EXPIRE_TIME")
          return tmpExpire.Value
        } else {
          let tmpMaximum = old_data.find(oldData => oldData.Name == "OTP_MAXIMUM_ENTERED")
          return tmpMaximum.Value
        }
      }

      const _onCancel = async () => {
        setVisible(false)
        let currentMaximum = getValueFromStore("maximum")
        let currentExpire = getValueFromStore("expire")

        setNewMaximumOtp(currentMaximum)
        setIsReadOnlyInputMaximum(true)
        setvisibleEditMaximum(true)
        setvisibleSubmitMaximum(false)
        setIsDisableEditExpiration(false)

        setExpire(currentExpire)
        setIsReadOnlyInputExpiration(true)
        setvisibleExpireEdit(true)
        setvisibleExpireSubmit(false)
        setIsDisabledEditMaximum(false)

        let expire = document.getElementById("otp-expiration-period")
        let maximum = document.getElementById("otp-maximum-retrying")
        expire.style.color = "rgba(0, 0, 0, 0.65)"
        expire.blur()
        maximum.style.color = "rgba(0, 0, 0, 0.65)"
        maximum.blur()

        await businessParametersSetupStore.resetOTPrequest()
      }

      return (
        <div>
          <Row gutter={[8, 8]}>
            <Col span={10}>
              <SimpleInput readOnly={isReadOnlyInputMaximum} id={"otp-maximum-retrying"} disabled={isDisableEditMaximum} value={newMaximumOtp} onChange={(value) => setNewMaximumOtp(value)} prefix={t("otpMaximumRetrying")} suffix={t("otpTime")} />
            </Col>
            <Col span={6}>
              {visibleEditMaximum && <TcrbButton disabled={isDisableEditMaximum} onClick={() => _onClickMaximumRetry()} className="default">{t("edit")}</TcrbButton>}
              {visibleSubmitMaximum && <TcrbButton onClick={() => _openPopup("maximum")} className="default">{t("submit")}</TcrbButton>}
            </Col>
          </Row>
          <Row gutter={[8, 36]}>
            <Col span={10}>
              <SimpleInput readOnly={isReadOnlyInputExpiration} disabled={isDisableEditExpiration} id={"otp-expiration-period"} value={expireOtp} onChange={(value) => setExpire(value)} prefix={t("otpExpirationPeriod")} suffix={t("otpSecond")} />
            </Col>
            <Col span={6}>
              {visibleExpireEdit && <TcrbButton disabled={isDisableEditExpiration} onClick={() => _onClickExpiration()} className="default">{t("edit")}</TcrbButton>}
              {visibleExpireSubmit && <TcrbButton onClick={() => _openPopup("expire")} className="default">{t("submit")}</TcrbButton>}
            </Col>
          </Row>
          <Row>
            <Col flex={100}>
              <Table
                bordered
                dataSource={dataSourceOtpPendingList}
                columns={columnOtpPending}
                size="small"
              />
            </Col>

          </Row>

          <SimpleModal
            title={titleModal}
            type={modalType}
            onOk={() => _onConfirm()}
            onCancel={() => _onCancel()}
            textCancel={textCancel}
            textOk={textOk}
            modalString={modalString}
            visible={visible}
          />
        </div>
      )
    }))

export default withTranslation('common')(OtpSetup)
