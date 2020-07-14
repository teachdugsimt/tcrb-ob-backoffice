import React, { Component, useEffect } from 'react'
import logo02 from '../images/logo.png'
import DropdownTopRight from '../components/dropdown-top-right/dropdown-top-right'
import account from '../images/account.png'
import {
  MainHeader, SubHeader, SubHeader2, DivImageLogo, WrapperImageLogo, InsideTopRightDiv,
  ContentMainDiv, TextMenu, DivAccount, WrapperImageAccount, DivName, TextName, WrapperButtonAnt
} from "./Styles/AdminHeaderStyles"
import Router from 'next/router'
import { inject, observer } from 'mobx-react'
import { withTranslation } from '../i18n'
import { Button } from 'antd';
import { TcrbButton, TcrbPopconfirm, TcrbSpin } from '../components/antd-styles/styles'

const AdminHeader = inject('authenStore', 'loginStore')(observer((props) => {
  // const { authenStore } = useStores()
  const { t, authenStore, loginStore } = props
  const goLogin = () => {
    authenStore.clear()
    // Router.push("/login")
  }
  useEffect(() => {
    let propsSignout = JSON.parse(JSON.stringify(loginStore.data_logout))
    let propsLogin = JSON.parse(JSON.stringify(loginStore.data_signin))
    if(propsSignout && propsSignout.signOut == true && !propsLogin){
      // Router.push("/login")
    }
  }, [JSON.parse(JSON.stringify(loginStore.data_logout))])

  return (
    <MainHeader>
      <SubHeader>
        <DivImageLogo>
          <WrapperImageLogo src={logo02} />
        </DivImageLogo>
        <InsideTopRightDiv>
          <ContentMainDiv>
            <WrapperButtonAnt title={t('support')} />
            <WrapperButtonAnt title={t("signout")} onClick={() => {
              loginStore.clearCacheLogin('error')
              loginStore.clearCacheLogin('success')
              loginStore.requestLogout({ username: authenStore.id })
              Router.push("/login")
              goLogin()
            }} />
            <TcrbSpin spinning={loginStore.fetching_login} size="large" tip="Loading..." />
            <DivAccount>
              <WrapperImageAccount src={account} />
              <DivName>
                <TextName>{t('mockName')}</TextName>
                <TextName>{t('mockLastName')}</TextName>
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

AdminHeader.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default
  withTranslation('common')(AdminHeader)
