import React, { useState, useEffect } from 'react'
import { Input, Row, Col, Layout, Modal, Switch } from 'antd'
import styled from 'styled-components';
import SimpleSearch from '../simple-search'
const { Header, Footer, Sider, Content } = Layout;


const StyledP = styled.p`

  display: initial;
  padding-left: ${({ theme }) => theme.spacing.medium}px !important;
`
export default function OtpUnlocking() {
  const [idCard, setIdCard] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [visible, setVisble] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const searchIdCardNumber = (value) => {
    console.log('eiei search:' + value)
    setIdCard(value)
    setIsSearch(true)
  }


  const hideModal = () => {
    this.setState({
      visible: false,
    });
  };
  const onChange = (value) => {
    console.log("change:" + value)

    if (value === true) {
      setVisble(true)
      setIsChecked(true)
      // Modal.confirm({
      //   title: 'Confirm',
      //   content: 'Unlocking OTP!!Customer Id Card Number',
      //   okText: 'Confirm',
      //   cancelText: 'Cancel',
      // });
    } else {
      setIsChecked(false)
    }
  }
  const unlockOTP = () => {
    //somaction
  }
  return (
    <div style={{ marginTop: 20 }}>

      {/* <Row>
        <Col span={12}>Account Unbinding</Col>
        <Col span={12}> OTP Unlocking</Col>
      </Row> */}
      <Row>
        <SimpleSearch search={searchIdCardNumber} />
      </Row>
      {(isSearch) ? (<Col span={12}>
        <Switch defaultChecked={false} onChange={checked => onChange(checked)} />
        {isChecked ? (<StyledP>OTP is Locked</StyledP>) : (<StyledP>OTP is ready for using</StyledP>)}
      </Col>) : ('')}
      <Modal
        title="Confirm"
        visible={visible}
        onOk={unlockOTP}
        onCancel={() => setVisble(false)}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>Unlocking OTP!!</p>
        <p>Customer ID Card Number {idCard}</p>
        <p>Mobile Number </p>
      </Modal>
    </div>
  )
}
