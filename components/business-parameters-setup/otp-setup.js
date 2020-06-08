import React from 'react'
import { Input, Row, Col, Button } from 'antd'
import styled from 'styled-components'

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
  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col span={8}>
          <StyledInput prefix="OTP Maximum Retrying" suffix="Times" />
        </Col>
        <Col span={6}>
          <Button> Edit </Button>
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

    </div>
  )
}
