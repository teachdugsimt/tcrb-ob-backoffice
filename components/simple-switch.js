import React, { useState, useEffect } from 'react'
import { Input, Row, Col, Layout, Modal, Switch } from 'antd'
import styled from 'styled-components';
import Simple from './simple-modal'
import { toJS } from 'mobx';
import { i18n, withNamespaces, withTranslation } from '../i18n'

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


function SimpleSwitch(props) {
  const { t } = props
  const SwitchList = () => {
    const listItems = props.data.map((switchOn, index) => {
      let tmpSwitchOn = JSON.parse(JSON.stringify(switchOn))
      const textList = tmpSwitchOn.splice(1)
      return (
        <Row key={index} gutter={[4, 32]}>
          <Col span={2}>
            <StyledSwitch defaultChecked={tmpSwitchOn[0]}
              onChange={checked => props.onChange(tmpSwitchOn[0], index)}
              disabled={tmpSwitchOn[0] === false} />
            {/* <StyledA>{string.accountNumber}</StyledA> */}
          </Col>
          {props.isBinding ? (
            <div>
              {textList.map((textDetail, index) => <Col key={index} flex={100}>
                <StyledSpan> {textDetail}</StyledSpan>
              </Col>)}
            </div>
          ) : (
              <>
                {textList.map((textDetail, index) => <Col key={index} span={6}>
                  {index == 0 ? <StyledA>{textDetail}</StyledA> : <StyledSpan> {textDetail}</StyledSpan>}
                </Col>)}

                <Col span={4}>
                  {tmpSwitchOn[0] ? (<StyledSpan>{t("otpIsLock")}</StyledSpan>) : (<StyledSpan>{t("otpIsReady")}</StyledSpan>)}
                </Col>
              </>
            )
          }
        </Row >)
    }
    );
    return (
      <ul style={{ paddingInlineStart: 0 }}>{listItems}</ul>
    );
  }
  return (
    <Col flex={100}>
      <SwitchList />
    </Col>
  )
}
export default withTranslation('common')(SimpleSwitch)
