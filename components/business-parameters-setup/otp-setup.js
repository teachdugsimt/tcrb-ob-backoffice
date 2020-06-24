import React, { useEffect, useRef, useState } from 'react'
import { Input, Row, Col, Button } from 'antd'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { withTranslation } from '../../i18n'
import SimpleModal from '../simple-modal'
import { BusinessParameterSetupApi } from '../../services/'
const StyledInput = styled(Input)`
  background-color: unset !important;
  border: unset !important;
  border-bottom: 1px solid black !important;
  box-shadow: none !important;
  .ant-input{
    text-align: center !important;
    background-color: unset !important;
    ${'' /* cursor:not-allowed !important; */}
  }
`

const useFocus = () => {
  const htmlElRef = useRef(null)
  const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }
  return [htmlElRef, setFocus]
}

const OtpSetup =
  inject('businessParametersSetupStore')
    (observer((props) => {
      const { t, businessParametersSetupStore } = props
      const [expireOtp, setExpire] = useState(null)
      const [visibleExpireEdit, setvisibleExpireEdit] = useState(true)
      const [visibleExpireSubmit, setvisibleExpireSubmit] = useState(false)
      const [disExpire, setdisExpire] = useState(false)
      const [disExpireSubmit, setdisExpireSubmit] = useState(false)

      const [maximumOtp, setMaximum] = useState(null)
      const [visibleEditMaximum, setvisibleEditMaximum] = useState(true)
      const [visibleSubmitMaximum, setvisibleSubmitMaximum] = useState(false)
      const [disMaximum, setdisMaximum] = useState(false)
      const [disMaximumSubmit, setdisMaximumSubmit] = useState(false)

      const [visible, setVisible] = useState(false)
      const [modalString, setModal] = useState("")
      // const [inputRef, setInputFocus] = useFocus()

      useEffect(() => {

        if (!businessParametersSetupStore.responseGetOtpValue || businessParametersSetupStore.fetchingGetOtp == null) {
          let data = { otpParamsField: "OTP_EXPIRE_TIME,OTP_MAXIMUM_ENTERED,OTP_TOKEN_EXPIRE_TIME" }
          businessParametersSetupStore.getOTPdata(data)
        }
      }, [])

      useEffect(() => {

        let newProps = JSON.parse(JSON.stringify(businessParametersSetupStore.responseGetOtpValue))
        console.log("Will Receive props : ", newProps)
        if (newProps && newProps != undefined) {
          if (!expireOtp || !maximumOtp) {
            let tmpExpire = newProps.find(e => e.Name == "OTP_EXPIRE_TIME")
            let tmpMaximum = newProps.find(e => e.Name == "OTP_MAXIMUM_ENTERED")
            setExpire(tmpExpire.Value)
            setMaximum(tmpMaximum.Value)
          }
        }
      }, [businessParametersSetupStore.responseGetOtpValue])

      const _onClickExpiration = () => {
        let expire = document.getElementById("otp-expiration-period")
        expire.style.color = "orange"
        expire.focus()
        setvisibleExpireEdit(false)
        setvisibleExpireSubmit(true)
      }

      const _onClickMaximumRetry = () => {
        let maximum = document.getElementById("otp-maximum-retrying")
        maximum.style.color = "orange"
        maximum.focus()
        setvisibleEditMaximum(false)
        setvisibleSubmitMaximum(true)
      }

      const _openPopup = (text) => {
        setVisible(true)
        setModal("Confirm update otp " + text)
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
        if (modalString.includes("expire")) {
          if (getValueFromStore("expire") != expireOtp) {

            let data = {
              currentData: {
                OTP_EXPIRE_TIME: 15
              },
              newData: {
                OTP_EXPIRE_TIME: expireOtp
              },
              maker_id: 59
            }

            await businessParametersSetupStore.updateOTPdata(data)

            businessParametersSetupStore.selectProductToDelete({
              product_type: "OTP",
              product_description: "update expire OTP",
              request_id: "01",
              request_date: new Date().getTime,
              action: "update",
            })
            businessParametersSetupStore.closeExpire(true)
            setdisExpireSubmit(true)
            _setUnfocus("expire")
            setdisExpire(false)
            setVisible(false)
          } else {
            // alert("don't have any change")
          }
        } else {
          if (getValueFromStore("maximum") != maximumOtp) {

            let data = {
              currentData: {
                OTP_MAXIMUM_ENTERED: "3"
              },
              newData: {
                OTP_MAXIMUM_ENTERED: maximumOtp
              },
              maker_id: 51
            }

            await businessParametersSetupStore.updateOTPdata(data)

            businessParametersSetupStore.selectProductToDelete({
              product_type: "OTP",
              product_description: "update OTP entry maximum",
              request_id: "02",
              request_date: new Date().getTime,
              action: "update",
            })
            businessParametersSetupStore.closeMaximum(true)
            setdisMaximumSubmit(true)
            _setUnfocus("maximum")
            setdisMaximum(false)
            setVisible(false)
          } else {
            // alert("don't have any change")
          }
        }
      }

      const getValueFromStore = (type) => {
        let old_data = JSON.parse(JSON.stringify(businessParametersSetupStore.responseGetOtpValue))
        if (type == "expire") {
          let tmpExpire = old_data.find(e => e.Name == "OTP_EXPIRE_TIME")
          return tmpExpire.Value
        } else {
          let tmpMaximum = old_data.find(e => e.Name == "OTP_MAXIMUM_ENTERED")
          return tmpMaximum.Value
        }
      }

      const _onCancel = () => {
        setVisible(false)
        if (modalString.includes("expire")) {
          setModal("")
          setvisibleExpireEdit(true)
          setvisibleExpireSubmit(false)
          setExpire(getValueFromStore("expire"))
        } else {
          setModal("")
          setvisibleEditMaximum(true)
          setvisibleSubmitMaximum(false)
          setMaximum(getValueFromStore("maximum"))
        }
        let expire = document.getElementById("otp-expiration-period")
        let maximum = document.getElementById("otp-maximum-retrying")
        expire.style.color = "rgba(0, 0, 0, 0.65)"
        expire.blur()
        maximum.style.color = "rgba(0, 0, 0, 0.65)"
        maximum.blur()
      }

      return (
        <div>
          <Row gutter={[8, 8]}>
            <Col span={8}>
              <StyledInput disabled={businessParametersSetupStore.editOtpMaximumRetry != null ? businessParametersSetupStore.editOtpMaximumRetry : disMaximum} id={"otp-maximum-retrying"} value={maximumOtp} onChange={(e) => setMaximum(e.target.value)} prefix={t("otpMaximumRetrying")} suffix={t("otpTime")} />
            </Col>
            <Col span={6}>
              {visibleEditMaximum && <Button onClick={() => _onClickMaximumRetry()}>{t("edit")}</Button>}
              {visibleSubmitMaximum && <Button disabled={disMaximumSubmit} onClick={() => _openPopup("maximum")}>{t("submit")}</Button>}
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col span={8}>
              <StyledInput disabled={businessParametersSetupStore.editOtpExpirationPeriod != null ? businessParametersSetupStore.editOtpExpirationPeriod : disExpire} /*ref={inputRef}*/ id={"otp-expiration-period"} value={expireOtp} onChange={(e) => setExpire(e.target.value)} prefix={t("otpExpirationPeriod")} suffix={t("otpSecond")} />
            </Col>
            <Col span={6}>
              {visibleExpireEdit && <Button /*onClick={setInputFocus}*/ onClick={() => _onClickExpiration()} >{t("edit")}</Button>}
              {visibleExpireSubmit && <Button disabled={disExpireSubmit}/*onClick={setInputFocus}*/ onClick={() => _openPopup("expire")} >{t("submit")}</Button>}
            </Col>
          </Row>
          <SimpleModal
            onOk={() => _onConfirm()}
            onCancel={() => _onCancel()}
            okText={t("confirm")}
            cancelText={t("cancel")}
            modalString={modalString}
            visible={visible}
          />
        </div>
      )
    }))

export default withTranslation('common')(OtpSetup)
