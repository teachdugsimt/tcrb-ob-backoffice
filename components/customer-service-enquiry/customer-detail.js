import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components';
import SimpleSwitch from '../simple-switch'
import { Row, Switch, Col, Button, Input, Alert, Card } from 'antd'

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
const StyledSwitch = styled(Switch)`

    .ant-switch-checked .ant-switch-handle {
      left: calc(100% - 22px - 0px) !important;
    }
`

// const onboard_service = [
//   { switchSelected: true, index: "E-KYC" },
//   { switchSelected: true, index: "E-KYC" }
// ]

const data_service = [
  [true, "E-KYC"],
  [false, "Micro Pay"],
  [false, "True Money"],
  [false, "FB Pay"]
]


export const CustomerDetail =
  inject('customerServicesMenuStore')
    (observer((props) => {

      const onChange = () => {

      }

      return (
        <div>
          <Row>
            <Col span={8}>
              <Card style={{ border: "1px solid #7B7D7D", borderRadius: 25 }}>
                <Row gutter={[16, 30]}>
                  <Col flex={100}>
                    <StyledInput readOnly={true} prefix={'Customer Id'} defaultValue={"3 1234 5678 74 8"} />
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col flex={100}>
                    <StyledInput readOnly={true} prefix={'Customer Name'} defaultValue={"ศิริพร ศุภวัชโรบล"} />
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={16} style={{ paddingLeft: 12 }}>
              <Card style={{ border: "1px solid #7B7D7D", borderRadius: 25 }}>
                <Row gutter={[4, 24]}>
                  <div style={{ fontSize: 18 }}>Onboarded service</div>
                </Row>
                <Row gutter={[4, 16]}>
                  <Col span={6}><Switch disabled={true} />E-KYc</Col>
                  <Col span={6}><Switch disabled={true} />Micro Pay</Col>
                  <Col span={6}><Switch disabled={true} />Tyue Money</Col>
                  <Col span={6}><Switch disabled={true} />FB Pay</Col>
                </Row>
                <Row gutter={[4, 16]}>
                  <Col span={6}><Switch disabled={true} />Mobile Banking</Col>
                  <Col span={6}><Switch disabled={true} />NDID</Col>
                  <Col span={6}><Switch disabled={true} />Grab Pay</Col>
                  <Col span={6}><Switch disabled={true} />ABC</Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
      )

    }))
