import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components';
import SimpleSwitch from '../simple-switch'
import { Row, Switch, Col, Button, Input, Alert, Card } from 'antd'

const SpanText = styled.span`
white-space: nowrap !important;
overflow: hidden !important;
text-overflow: ellipsis !important;
padding-top: 10px;
`

const ColTextDetail = styled(Col)`
overflow: hidden !important;
text-overflow: ellipsis !important;
white-space: nowrap !important;
width: 100% !important;
border-bottom: 1px solid black !important;
padding-bottom: -5px;
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
          {customerServiceEnquiry.customer_data && Object.keys(customerServiceEnquiry.customer_data).length > 0 &&
            <Row gutter={{ xs: 6, sm: 14, md: 22, lg: 30 }}>
              <Col className="gutter-row" span={10}>
                <Card style={{ border: "1px solid #7B7D7D", borderRadius: 25, height: '100%' }}>
                  <Row gutter={[16, 30]}>
                    <ColTextDetail flex={10}>
                      {JSON.parse(JSON.stringify(customerServiceEnquiry.customer_data)) && JSON.parse(JSON.stringify(customerServiceEnquiry.customer_data)).id && JSON.parse(JSON.stringify(customerServiceEnquiry.customer_data)).name ?
                        <SpanText>Customer ID :
                      {JSON.parse(JSON.stringify(customerServiceEnquiry.customer_data)).id}
                        </SpanText>
                        :
                        <SpanText>Customer ID : Don't Hava Value</SpanText>}
                    </ColTextDetail>
                  </Row>
                  <Row gutter={[16, 16]}>
                    <ColTextDetail flex={10}>
                      {JSON.parse(JSON.stringify(customerServiceEnquiry.customer_data)) && JSON.parse(JSON.stringify(customerServiceEnquiry.customer_data)).id && JSON.parse(JSON.stringify(customerServiceEnquiry.customer_data)).name ?
                        <SpanText>Customer Name :
                      {JSON.parse(JSON.stringify(customerServiceEnquiry.customer_data)).name}
                        </SpanText> : <SpanText>Customer Name : Don't Hava Value</SpanText>}
                    </ColTextDetail>
                  </Row>
                </Card>
              </Col>
              <Col className="gutter-row" span={14}>
                <Card style={{ border: "1px solid #7B7D7D", borderRadius: 25, height: '100%' }}>
                  <Row gutter={[4, 24]}>
                    <div style={{ fontSize: 18 }}>Onboarded service</div>
                  </Row>
                  <Row gutter={[4, 16]}>
                    <Col span={6}><Switch disabled={true} /><span style={{ paddingLeft: 5 }}>E-KYC</span></Col>
                    <Col span={6}><Switch disabled={true} /><span style={{ paddingLeft: 5 }}>Micro Pay</span></Col>
                    <Col span={6}><Switch disabled={true} /><span style={{ paddingLeft: 5 }}>True Money</span></Col>
                    <Col span={6}><Switch disabled={true} /><span style={{ paddingLeft: 5 }}>FB Pay</span></Col>
                    <Col span={6}><Switch disabled={true} /><span style={{ paddingLeft: 5 }}>Mobile Banking</span></Col>
                    <Col span={6}><Switch disabled={true} /><span style={{ paddingLeft: 5 }}>NDID</span></Col>
                    <Col span={6}><Switch disabled={true} /><span style={{ paddingLeft: 5 }}>Grab Pay</span></Col>
                    <Col span={6}><Switch disabled={true} /><span style={{ paddingLeft: 5 }}>AirPay</span></Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          }
        </Row>
      )

    }))
// Test commit - 1
// Test commit - 2

// citizen_id  = 912f74047dd8964c382a6d6287f0ed1
