import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components';
import SimpleSwitch from '../simple-switch'
import { Row, Switch, Col, Button, Input, Alert } from 'antd'

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
      ${({ defaultChecked }) => defaultChecked && `
      background-color: #F88008 !important;
  `}
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
        <div style={{ height: 150, display: 'flex', flexDirection: 'row' }}>
          <div style={{
            display: 'flex',
            flex: 0.4,
            border: "1px solid #7B7D7D",
            borderRadius: 25,
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'column'
          }}>
            <Col>
              <StyledInput readOnly={true} prefix={'Customer Id'} defaultValue={"3 1234 5678 74 8"} style={{ color: 'black' }} />
            </Col>
            <Col>
              <StyledInput readOnly={true} prefix={'Customer Name'} defaultValue={"ศิริพร ศุภวัชโรบล"} style={{ color: 'black' }} />
            </Col>
          </div>
          <div style={{
            display: 'flex',
            flex: 0.6,
            border: "1px solid #7B7D7D",
            borderRadius: 25,
            marginLeft: 30,
            flexDirection: 'column'
          }}>
            <div style={{ paddingLeft: 20, paddingTop: 10, fontSize: 18 }}>Onboarded service</div>
            <div style={{ height: 50, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div style={{
                display: 'flex',
                flex: 0.25,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                // backgroundColor: 'pink',
                alignItems: 'center',
                paddingLeft: 20
              }}>
                <StyledSwitch defaultChecked onChange={onChange} />
                <div style={{ paddingLeft: 10 }}>E-KYC</div>
              </div>
              <div style={{
                display: 'flex',
                // backgroundColor: 'pink',
                flex: 0.25,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: 20
              }}>
                <StyledSwitch defaultChecked={false} onChange={onChange} />
                <div style={{ paddingLeft: 10 }}>Micro divay</div>
              </div>
              <div style={{
                display: 'flex',
                // backgroundColor: 'pink',
                flex: 0.25,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: 20
              }}>
                <StyledSwitch defaultChecked={false} onChange={onChange} />
                <div style={{ paddingLeft: 10 }}>True Money</div>
              </div>
              <div style={{
                display: 'flex',
                // backgroundColor: 'pink',
                flex: 0.25,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: 20
              }}>
                <StyledSwitch defaultChecked={false} onChange={onChange} />
                <div style={{ paddingLeft: 10 }}>FB Pay</div>
              </div>

            </div>
            <div style={{ height: 50, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div style={{
                display: 'flex',
                // backgroundColor: 'pink',
                flex: 0.25,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: 20
              }}>
                <StyledSwitch defaultChecked onChange={onChange} />
                <div style={{ paddingLeft: 10 }}>Mobile Banking</div>
              </div>
              <div style={{
                display: 'flex',
                // backgroundColor: 'pink',
                flex: 0.25,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: 20
              }}>
                <StyledSwitch defaultChecked={false} onChange={onChange} />
                <div style={{ paddingLeft: 10 }}>NDID</div>
              </div>
              <div style={{
                display: 'flex',
                // backgroundColor: 'pink',
                flex: 0.25,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: 20
              }}>
                <StyledSwitch defaultChecked={false} onChange={onChange} />
                <div style={{ paddingLeft: 10 }}>Grab Pay</div>
              </div>
              <div style={{
                display: 'flex',
                // backgroundColor: 'pink',
                flex: 0.25,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: 20
              }}>
                <StyledSwitch defaultChecked={false} onChange={onChange} />
                <div style={{ paddingLeft: 10 }}>ABC</div>
              </div>
            </div>
          </div>
        </div >
      )

    }))
