import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components';
import SimpleSwitch from '../simple-switch'
import { Row, Switch, Col, Button, Input, Alert, Card } from 'antd'

const SpanText =styled.span`
border-bottom: 1px solid black !important;
padding-bottom: 5px !important;
`

const StyledSwitch = styled(Switch)`
    .ant-switch-checked .ant-switch-handle {
      left: calc(100% - 22px - 0px) !important;
    }
`

export const CustomerDetail =
  inject('customerServiceEnquiry')
    (observer((props) => {
      const { customerServiceEnquiry } = props
      const [obj, setobj] = useState(null)

      useEffect(() => {
        console.log("Data Enquiry :: ", JSON.parse(JSON.stringify(customerServiceEnquiry.rowDataObject)))
        if (obj != customerServiceEnquiry.rowDataObject)
          setobj(JSON.parse(JSON.stringify(customerServiceEnquiry.rowDataObject)))

      }, [customerServiceEnquiry.rowDataObject])

      return (
        <Row style={{ paddingTop: 10 }}>
          {obj && customerServiceEnquiry.rowDataObject && <Row gutter={{ xs: 6, sm: 14, md: 22, lg: 30 }}>
            <Col className="gutter-row" span={10}>
              <Card style={{ border: "1px solid #7B7D7D", borderRadius: 25 }}>
                <Row gutter={[16, 30]}>
                  <Col flex={100}>
                    {JSON.parse(JSON.stringify(customerServiceEnquiry.rowDataObject)) && JSON.parse(JSON.stringify(customerServiceEnquiry.rowDataObject)).accNo && JSON.parse(JSON.stringify(customerServiceEnquiry.rowDataObject)).accName ?
                      <SpanText>Customer ID :
                      {JSON.parse(JSON.stringify(customerServiceEnquiry.rowDataObject)).accNo}
                      </SpanText>
                      :
                      <SpanText> Don't Hava Value</SpanText>}
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col flex={100}>
                    {JSON.parse(JSON.stringify(customerServiceEnquiry.rowDataObject)) && JSON.parse(JSON.stringify(customerServiceEnquiry.rowDataObject)).accNo && JSON.parse(JSON.stringify(customerServiceEnquiry.rowDataObject)).accName ?
                      <SpanText>Customer Name :
                      {JSON.parse(JSON.stringify(customerServiceEnquiry.rowDataObject)).accName}
                      </SpanText> : <SpanText> Don't Hava Value</SpanText>}
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col className="gutter-row" span={14}>
              <Card style={{ border: "1px solid #7B7D7D", borderRadius: 25 }}>
                <Row gutter={[4, 24]}>
                  <div style={{ fontSize: 18 }}>Onboarded service</div>
                </Row>
                <Row gutter={[4, 16]}>
                  <Col span={8}><Switch disabled={true} /><span style={{ paddingLeft: 5 }}>E-KYC</span></Col>
                  <Col span={8}><Switch disabled={true} /><span style={{ paddingLeft: 5 }}>Micro Pay</span></Col>
                  <Col span={8}><Switch disabled={true} /><span style={{ paddingLeft: 5 }}>True Money</span></Col>
                  <Col span={8}><Switch disabled={true} /><span style={{ paddingLeft: 5 }}>FB Pay</span></Col>
                  <Col span={8}><Switch disabled={true} /><span style={{ paddingLeft: 5 }}>Mobile Banking</span></Col>
                  <Col span={8}><Switch disabled={true} /><span style={{ paddingLeft: 5 }}>NDID</span></Col>
                  <Col span={8}><Switch disabled={true} /><span style={{ paddingLeft: 5 }}>Grab Pay</span></Col>
                  <Col span={8}><Switch disabled={true} /><span style={{ paddingLeft: 5 }}>AirPay</span></Col>
                </Row>
                {/* <Row gutter={[4, 16]}> */}

                {/* </Row> */}
              </Card>
            </Col>
          </Row>}
        </Row>
      )

    }))
// Test commit - 1
// Test commit - 2
