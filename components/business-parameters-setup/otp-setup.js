import React, { useState } from 'react'
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
  const [visible, setVisble] = useState(false)
  const [modalString, setModalString] = useState('')

  const editOtpMaximum = () => {
    if(disableEditOtp){
      setDisableEditOtp(false)
    }else{
      setModalString(
        <div>
          <p>Changing OTP Maximum Retrying!!</p>
          <p>From ...</p>
          </div>
      )
    }
  }
  const changeOtpMaximum = ()=>{

  }
  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col span={8}>
          <StyledInput prefix="OTP Maximum Retrying" suffix="Times" readOnly={disableEditOtp}/>
        </Col>
        <Col span={6}>
          <Button onClick={editOtpMaximum}> {disableEditOtp ? 'Edit':'Submit'} </Button>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={8}>
          <StyledInput prefix="OTP Expiration Perlod" suffix="Seconds" />
        </Col>
        <Col span={6}>
          <Button> Edit </Button>
        </Col>
      </Row>
      <SimpleModal
        onOk={()=> unlockOTP()}
        onCancel={() => setVisble(false)}
        okText="Confirm"
        cancelText="Cancel"
        modalString={modalString}
        visible={visible}
      />

    </div>
  )
}
