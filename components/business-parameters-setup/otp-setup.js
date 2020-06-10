import React, { useState, createRef, useRef } from 'react'
import { Input, Row, Col, Button } from 'antd'
import styled from 'styled-components'
import SimpleModal from '../simple-modal'
const StyledInput = styled(Input)`

      background-color: unset !important;
      border: unset !important;
      border-bottom: 1px solid black !important;
      box-shadow: none !important;
  .ant-input{
    background-color: unset !important;
    ${'' /* cursor:not-allowed !important; */}
  }

`
export default function OtpSetup() {
  const [disableEditOtp, setDisableEditOtp] = useState(true)
  const [disableEditOtpExpire, setDisableEditOtpExpire] = useState(true)
  const [visible, setVisble] = useState(false)
  const [modalString, setModalString] = useState('')
  const textInput = createRef();


  const editOtpMaximum = () => {
    console.log(textInput.current);

    if(disableEditOtp){
      setDisableEditOtp(false)
    }else{
      setVisble(true)
      setModalString(
        <div>
          <p>Changing OTP Maximum Retrying!!</p>
          <p>From ...</p>
          </div>
      )
    }
  }
  const changeOtpMaximum = ()=>{
    console.log(textInput.current.value);
    //some action
    setDisableEditOtp(true)
    setVisble(false)
  }
  const changeOtpExpire = () => {

  }
  const confirmModal = ()=>{
    if(disableEditOtp === false){
      changeOtpMaximum()
    }else{
      changeOtpExpire()
    }
  }
  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col span={8}>
          <StyledInput type="text" prefix="OTP Maximum Retrying" suffix="Times" readOnly={disableEditOtp}  ref={textInput}/>
          {/* <Input ref={textInput}/> */}
        </Col>
        <Col span={6}>
          <Button onClick={editOtpMaximum}> {disableEditOtp ? 'Edit':'Submit'} </Button>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={8}>
          <StyledInput prefix="OTP Expiration Perlod" suffix="Seconds" disabled={!disableEditOtp} readOnly={disableEditOtpExpire} />
        </Col>
        <Col span={6}>
          <Button disabled={!disableEditOtp}> {disableEditOtpExpire ? 'Edit':'Submit'} </Button>
        </Col>
      </Row>

      <SimpleModal
        onOk={()=> confirmModal()}
        onCancel={() => setVisble(false)}
        okText="Confirm"
        cancelText="Cancel"
        modalString={modalString}
        visible={visible}
      />

    </div>
  )
}
