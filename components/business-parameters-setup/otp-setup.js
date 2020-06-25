import React, { useEffect, useRef, useState } from 'react'
import { Input, Row, Col, Button, Alert } from 'antd'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { withTranslation } from '../../i18n'
import SimpleModal from '../simple-modal'
import { BusinessParameterSetupApi } from '../../services/'
// import { qs } from 'qs'
import querystring from 'querystring'
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
      const [inputExpiration, setInputExpiration] = useState(true)
      const [inputMax, setInputMax] = useState(true)
      const [editExpiration, setEditExpiration] = useState(false)
      const [editMaximum, setEditMaximum] = useState(false)
      // const [inputRef, setInputFocus] = useFocus()
      const [title, setTitle] = useState("")
      const [modalType, setModalType] = useState("")
      const [textCancel, setTextCancel] = useState("")
      const [textOk, setTextOk] = useState("")

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
        console.log("==edit Expiration==")
        setInputExpiration(false)
        let expire = document.getElementById("otp-expiration-period")
        console.log("Expiration >>>", expire)
        expire.style.color = "orange"
        expire.focus()
        setvisibleExpireEdit(false)
        setvisibleExpireSubmit(true)
        setEditMaximum(true)
      }

      const _onClickMaximumRetry = () => {
        console.log("==edit Maximum==")
        setInputMax(false)
        let maximum = document.getElementById("otp-maximum-retrying")
        console.log("Maximum >>>", maximum)
        maximum.style.color = "orange"
        maximum.focus()
        setvisibleEditMaximum(false)
        setvisibleSubmitMaximum(true)
        setEditExpiration(true)
      }

      const _openPopup = (text) => {
        setVisible(true)
        if (text == "maximum") {
          let a = getValueFromStore("maximum")
          console.log(a)
          console.log(maximumOtp)
          if (maximumOtp == a) {
            setModal("Error: OTP Maximum is not change value " + maximumOtp)
            setTitle("Error")
            setModalType("error")
            setTextCancel("cancel")
          }
          else if (!maximumOtp) {
            setModal("Error: OTP Maximum is not empty ")
            setTitle("Error")
            setModalType("error")
            setTextCancel("cancel")
          }
          else {
            setModal(<div style={{ textAlign: 'center' }}>Confirm update OTP{" "}{text}{" "}Retrying !!!<br />{a}{" "}to{" "}{maximumOtp}</div>)
            setTitle("Confirm")
            setModalType("confirm")
            setTextCancel("cancel")
            setTextOk("confirm")
          }
        }
        else {
          let a = getValueFromStore("expire")
          if (expireOtp == a) {
            setModal("Error: OTP Expire is not change value " + expireOtp)
            setTitle("Error")
            setModalType("error")
            setTextCancel("cancel")
          }
          else if (!expireOtp) {
            setModal("Error: OTP Expire is not empty ")
            setTitle("Error")
            setModalType("error")
            setTextCancel("cancel")
          }
          else {
            setModal(<div style={{ textAlign: 'center' }}>Confirm update OTP{" "}{text}{" "}Period !!!<br />{a}{" "}to{" "}{expireOtp}</div>)
            setTitle("Confirm")
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
        let a = getValueFromStore("maximum")
        let b = getValueFromStore("expire")
        if (a != maximumOtp) {
          console.log("update >>>", maximumOtp)

          let data = {
            currentData: {
              OTP_MAXIMUM_ENTERED: a
            },
            newData: {
              OTP_MAXIMUM_ENTERED: maximumOtp
            },
            maker_id: 51
          }

          await businessParametersSetupStore.updateOTPdata(data)

          setVisible(false)
          setInputMax(true)
          setvisibleEditMaximum(true)
          setvisibleSubmitMaximum(false)
          setdisMaximum(false)
          setEditExpiration(false)
          _setUnfocus("maximum")
          setMaximum(a)
          // setTimeout(() => {
          //   console.log("Success")
          //   setVisible(true)
          //   setModalType("close")
          //   setTextCancel("close")

          //   setModal(<div style={{ textAlign: 'center' }}>Success update OTP{" "}{a}{" "}Retrying !!!<br />{a}{" "}to{" "}{maximumOtp}</div>)
          // }, 3000);
        }
        if (b != expireOtp) {
          console.log("update >>>", expireOtp)
          let data = {
            currentData: {
              OTP_EXPIRE_TIME: b
            },
            newData: {
              OTP_EXPIRE_TIME: expireOtp
            },
            maker_id: 59
          }

          await businessParametersSetupStore.updateOTPdata(data)
          setVisible(false)
          setInputExpiration(true)
          setvisibleExpireEdit(true)
          setvisibleExpireSubmit(false)
          setEditMaximum(false)
          setdisExpire(false)
          _setUnfocus("expire")
          setExpire(b)
          setTimeout(() => {
            console.log("Success")
            setVisible(true)
            setModalType("close")
            setTextCancel("close")

            setModal(<div style={{ textAlign: 'center' }}>Success update OTP{" "}{b}{" "}Period !!!<br />{b}{" "}to{" "}{expireOtp}</div>)
          }, 3000);
        }
      }

      const getValueFromStore = (type) => {
        let old_data = JSON.parse(JSON.stringify(businessParametersSetupStore.responseGetOtpValue))
        console.log(old_data)
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
        let a = getValueFromStore("maximum")
        let b = getValueFromStore("expire")

        setMaximum(a)
        setInputMax(true)
        setvisibleEditMaximum(true)
        setvisibleSubmitMaximum(false)
        setdisMaximum(false)
        setEditExpiration(false)
        // _setUnfocus("maximum")

        setExpire(b)
        setInputExpiration(true)
        setvisibleExpireEdit(true)
        setvisibleExpireSubmit(false)
        setEditMaximum(false)
        setdisExpire(false)
        // _setUnfocus("expire")

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
              <StyledInput readOnly={inputMax} id={"otp-maximum-retrying"} value={maximumOtp} onChange={(e) => setMaximum(e.target.value)} prefix={t("otpMaximumRetrying")} suffix={t("otpTime")} />
            </Col>
            <Col span={6}>
              {visibleEditMaximum && <Button disabled={editMaximum} onClick={() => _onClickMaximumRetry()}>{t("edit")}</Button>}
              {visibleSubmitMaximum && <Button disabled={disMaximumSubmit} onClick={() => _openPopup("maximum")}>{t("submit")}</Button>}
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col span={8}>
              <StyledInput readOnly={inputExpiration} /*ref={inputRef}*/ id={"otp-expiration-period"} value={expireOtp} onChange={(e) => setExpire(e.target.value)} prefix={t("otpExpirationPeriod")} suffix={t("otpSecond")} />
            </Col>
            <Col span={6}>
              {visibleExpireEdit && <Button disabled={editExpiration} onClick={() => _onClickExpiration()} >{t("edit")}</Button>}
              {visibleExpireSubmit && <Button disabled={disExpireSubmit}/*onClick={setInputFocus}*/ onClick={() => _openPopup("expire")} >{t("submit")}</Button>}
            </Col>
          </Row>
          <SimpleModal
            title={title}
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
