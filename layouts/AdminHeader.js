import React, { Component, useContext } from 'react'
import logo02 from '../images/logo02.png'
import DropdownTopRight from '../components/DropdownTopRight'
import account from '../images/account.png'
import {
  MainHeader, SubHeader, SubHeader2, DivImageLogo, WrapperImageLogo, InsideTopRightDiv,
  ContentMainDiv, TextMenu, DivAccount, WrapperImageAccount, DivName, TextName,WrapperButtonAnt
} from "./Styles/AdminHeaderStyles"
import { Button } from 'antd';

const AdminHeader = (props) => {

  return (
    <MainHeader>
      <SubHeader>
        <DivImageLogo>
          <WrapperImageLogo src={logo02} />
        </DivImageLogo>
        <InsideTopRightDiv>
          <ContentMainDiv>
            <WrapperButtonAnt title={"Support"}/>
            <WrapperButtonAnt title={"Signout"}/>
            <DivAccount>
              <WrapperImageAccount src={account} />
              <DivName>
                <TextName>Korkaew</TextName>
                <TextName>Tribamrongsuk</TextName>
              </DivName>
            </DivAccount>
          </ContentMainDiv>
        </InsideTopRightDiv>
      </SubHeader>

      <SubHeader2>

        <DropdownTopRight />

      </SubHeader2>

    </MainHeader>
  )
}

export default AdminHeader
