import React, { Component, useContext, useState } from 'react'
import Link from 'next/link'
import { inject, observer } from 'mobx-react'
// import { useStores } from '../hooks/use-stores'
import { colors } from '../theme/colors'
import styled from 'styled-components';
import {
  BorderMenu, MainDivMenu, MainContainerMenu, SubMainContainer,
  MainTitleMenuDiv, MainUl, SpanText, LinkColorMenu, TitleDiv,
  MenuIcon, MenuIcon2, TitleDiv2, WrapperMainDivMenu, MainHideDivMenu
} from './Styles/AdminHocStyles'
import { withTranslation } from '../i18n'

const INIT_ANIMATION = {
  height: '100%',
}

const END_ANIMATION = {
  height: '0%',
}

const BUTTON_DIV = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: 52,
  backgroundColor: '#707070',
  flexDirection: 'row',
  borderRadius: 4,
  padding: 10,
  paddingRight: 10,
  paddingLeft: 10,
}

const FOCUS_TEXT = {
  // borderBottomWidth: 4,
  // borderBottomColor: 'lightgrey',
  // borderBottomStyle: 'inset'
}
const FOCUS_LINK = {
  // color: "#FBA928",
}

const AdminMenu = inject('authenStore', 'versatileStore')(observer((props) => {
  const [Bergur, setBergur] = useState({})
  const [ButtonDiv, setButtonDiv] = useState(BUTTON_DIV)
  const [ShowAnimation, setShowAnimation] = useState(INIT_ANIMATION)
  const [HideAnimation, setHideAnimation] = useState(END_ANIMATION)
  const [isShow, setIsShow] = useState(true)
  const [focusText, setfocusText] = useState(FOCUS_TEXT)
  const [focusLink, setfocusLink] = useState(FOCUS_LINK)
  // const { authenStore, versatileStore } = useStores()
  const { t, authenStore, versatileStore } = props

  const setSideBar = () => {
    if (isShow) {
      versatileStore.setSidebarWidth(58)
      setButtonDiv({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: 52,
        backgroundColor: '#707070',
        borderRadius: 4,
        padding: 10,
        paddingRight: 10,
        paddingLeft: 10,
      })
      setShowAnimation({
        height: '100%',
      })
      setIsShow(!isShow)
      setBergur({
        paddingTop: 0,
        paddingRight: 0,
        paddingLeft: 2.5,
        paddingBottom: 2.5
      })
    } else {
      versatileStore.setSidebarWidth(300)
      setHideAnimation({
        height: '0%',
      })
      setBergur({
        paddingTop: 15,
        paddingRight: 15,
        paddingLeft: 0,
        paddingBottom: 0
      })
      setIsShow(!isShow)
    }
  }

  return <MainContainerMenu>

    <SubMainContainer>

      <MainTitleMenuDiv style={!isShow ? ButtonDiv : {}}>
        {isShow && <TitleDiv>{t("functionMenu")}</TitleDiv>}
        <TitleDiv2 onClick={() => setSideBar()} style={Bergur}>
          <MenuIcon />
          <MenuIcon />
          <MenuIcon2 />
        </TitleDiv2>
      </MainTitleMenuDiv>

      {isShow == true && <MainDivMenu style={ShowAnimation}>
        <MainUl>
          {authenStore.getMenu && authenStore.getMenu.map((e, i) => {
            return <BorderMenu style={{ marginBottom: i == (authenStore.getMenu.length - 1) ? 10 : 0, ...focusText }}><Link key={"link-menu-" + e.id} href={e.linkTo}>
              <SpanText id={"span-text-" + e.id}><LinkColorMenu style={focusLink}>{t(e.translate)}</LinkColorMenu></SpanText>
            </Link></BorderMenu>
          })}
        </MainUl>
      </MainDivMenu>}
      {isShow == false && <MainHideDivMenu style={HideAnimation} />}

    </SubMainContainer>

  </MainContainerMenu>
}))

AdminMenu.getInitialProps = async () => ({
  namespacesRequired: [],
})


export default
  withTranslation('common')(AdminMenu)
