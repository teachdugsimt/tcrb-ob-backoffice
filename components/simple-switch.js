import React, { useState, useEffect } from 'react'
import { Input, Row, Col, Layout, Modal, Switch } from 'antd'
import styled from 'styled-components';
import SimpleModal from './simple-modal'
import { toJS } from 'mobx';
import { i18n, withNamespaces } from '../i18n'

const StyledA = styled.a`
  display: initial;
  padding-left: ${({ theme }) => theme.spacing.medium}px !important;
  color: #F88008 !important;
  text-decoration-color: #F88008;
  text-decoration-line: underline;
`
const StyledSpan = styled.span`

  display: initial;
  padding-left: ${({ theme }) => theme.spacing.medium}px !important;
`
const StyledSwitch = styled(Switch)`
      ${({ defaultChecked }) => defaultChecked && `
      background-color: #F88008 !important;
  `}
`


export default function SimpleSwitch(props) {
  const SwitchList = () => {
    const listItems = props.data.map((switchOn, index) => {
      const textList = switchOn.splice(1)
      return (<Row key={index} gutter={[4, 8]}>
        <Col span={2}>
          <StyledSwitch defaultChecked={switchOn[0]}
            onChange={checked => props.onChange(switchOn[0], index)}
            disabled={switchOn[0] === false} />
          {/* <StyledA>{string.accountNumber}</StyledA> */}
        </Col>
        {textList.map((textDetail, index) => <Col key={index} span={6}>
          {index == 0 ? <StyledA>{textDetail}</StyledA> : <StyledSpan> {textDetail}</StyledSpan>}
        </Col>)
        }
        <Col span={4}>
          {switchOn[0] ? (<StyledSpan>{i18n.t("otpIsLock")}</StyledSpan>) : (<StyledSpan>{i18n.t("otpIsReady")}</StyledSpan>)}
        </Col>
      </Row>)
    }
    );
    return (
      <ul>{listItems}</ul>
    );
  }
  return (
    <Col flex={100}>
      <SwitchList />
    </Col>
  )
}