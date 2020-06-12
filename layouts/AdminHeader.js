import React, { Component, useContext } from 'react'
import logo02 from '../images/logo02.png'
import DropdownTopRight from '../components/dropdown-top-right'
import account from '../images/account.png'
import {
  MainHeader, SubHeader, SubHeader2, DivImageLogo, WrapperImageLogo, InsideTopRightDiv,
  ContentMainDiv, TextMenu, DivAccount, WrapperImageAccount, DivName, TextName, WrapperButtonAnt
} from "./Styles/AdminHeaderStyles"
import Router from 'next/router'
import { observer } from 'mobx-react'
import { useStores } from '../hooks/use-stores'
import { i18n, withNamespaces } from '../i18n'
import { Button } from 'antd';

const AdminHeader = (observer((props) => {
  const { authenStore } = useStores()
  const goLogin = () => {
    authenStore.clear()
    Router.push("/login")
  }

  return (
    <MainHeader>
      <SubHeader>
        <DivImageLogo>
          <WrapperImageLogo src={logo02} />
        </DivImageLogo>
        <InsideTopRightDiv>
          <ContentMainDiv>
            <WrapperButtonAnt title={i18n.t('support')} />
            <WrapperButtonAnt title={i18n.t("signout")} onClick={() => goLogin()} />
            <DivAccount>
              <WrapperImageAccount src={account} />
              <DivName>
                <TextName>{i18n.t('mockName')}</TextName>
                <TextName>{i18n.t('mockLastName')}</TextName>
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
}))

export default AdminHeader
