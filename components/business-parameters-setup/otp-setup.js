import React, { useEffect, useRef, useState } from 'react'
import { Input, Row, Col, Button } from 'antd'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { withTranslation } from '../../i18n'
import SimpleModal from '../simple-modal'

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

const OtpSetup = inject('businessParameterSetup')(observer((props) => {
  const { t, businessParameterSetup } = props
  const [expireOtp, setExpire] = useState(null)
  const [visibleExpireEdit, setvisibleExpireEdit] = useState(true)
  const [visibleExpireSubmit, setvisibleExpireSubmit] = useState(false)
  const [disExpire, setdisExpire] = useState(false)

  const [maximumOtp, setMaximum] = useState(null)
  const [visibleEditMaximum, setvisibleEditMaximum] = useState(true)
  const [visibleSubmitMaximum, setvisibleSubmitMaximum] = useState(false)
  const [disMaximum, setdisMaximum] = useState(false)

  const [visible, setVisible] = useState(false)
  const [modalString, setModal] = useState("")
  // const [inputRef, setInputFocus] = useFocus()

  useEffect(() => {
    let data = { otpParamsField: "OTP_EXPIRE_TIME,OTP_MAXIMUM_ENTERED,OTP_TOKEN_EXPIRE_TIME" }
    businessParameterSetup.getOTPdata(data)
  }, [])

  useEffect(() => {
    let newProps = JSON.parse(JSON.stringify(businessParameterSetup.responseGetOtpValue))
    console.log("Will Receive props : ", newProps)
    if (newProps && newProps != undefined) {
      if (!expireOtp || !maximumOtp) {
        let tmpExpire = newProps.find(e => e.Name == "OTP_EXPIRE_TIME")
        let tmpMaximum = newProps.find(e => e.Name == "OTP_MAXIMUM_ENTERED")
        setExpire(tmpExpire.Value)
        setMaximum(tmpMaximum.Value)
      }
    }
  }, [businessParameterSetup.responseGetOtpValue])

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

  const _onConfirm = () => {
    if (modalString.includes("expire")) {
      if (getValueFromStore("expire") != expireOtp) {
        businessParameterSetup.closeExpire(true)
        setdisExpire(false)
      } else {
        // alert("don't have any change")
      }
    } else {
      if (getValueFromStore("maximum") != maximumOtp) {
        businessParameterSetup.closeMaximum(true)
        setdisMaximum(false)
      } else {
        // alert("don't have any change")
      }
    }
  }

  const getValueFromStore = (type) => {
    let old_data = JSON.parse(JSON.stringify(businessParameterSetup.responseGetOtpValue))
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
          <StyledInput disabled={businessParameterSetup.editOtpMaximumRetry != null ? businessParameterSetup.editOtpMaximumRetry : disMaximum} id={"otp-maximum-retrying"} value={maximumOtp} onChange={(e) => setMaximum(e.target.value)} prefix="OTP Maximum Retrying" suffix="Times" />
        </Col>
        <Col span={6}>
          {visibleEditMaximum && <Button onClick={() => _onClickMaximumRetry()}>{t("edit")}</Button>}
          {visibleSubmitMaximum && <Button onClick={() => _openPopup("maximum")}>{t("submit")}</Button>}
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={8}>
          <StyledInput disabled={businessParameterSetup.editOtpExpirationPeriod != null ? businessParameterSetup.editOtpExpirationPeriod : disExpire} /*ref={inputRef}*/ id={"otp-expiration-period"} value={expireOtp} onChange={(e) => setExpire(e.target.value)} prefix="OTP Expiration Perlod" suffix="Seconds" />
        </Col>
        <Col span={6}>
          {visibleExpireEdit && <Button /*onClick={setInputFocus}*/ onClick={() => _onClickExpiration()} >{t("edit")}</Button>}
          {visibleExpireSubmit && <Button /*onClick={setInputFocus}*/ onClick={() => _openPopup("expire")} >{t("submit")}</Button>}
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
// original text : rgba(0, 0, 0, 0.65);
