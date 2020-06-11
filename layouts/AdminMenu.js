import React, { Component, useContext, useState } from 'react'
import Link from 'next/link'
import { useStores } from '../hooks/use-stores'
import { colors } from '../theme/colors'
import styled from 'styled-components';
import {
  BorderMenu, MainDivMenu, MainContainerMenu, SubMainContainer,
  MainTitleMenuDiv, MainUl, SpanText, LinkColorMenu, TitleDiv,
  MenuIcon, MenuIcon2, TitleDiv2, WrapperMainDivMenu, MainHideDivMenu
} from './Styles/AdminHocStyles'
import { i18n, withNamespaces } from '../i18n'

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

const AdminMenu = (props) => {
  const [Bergur, setBergur] = useState({})
  const [ButtonDiv, setButtonDiv] = useState(BUTTON_DIV)
  const [ShowAnimation, setShowAnimation] = useState(INIT_ANIMATION)
  const [HideAnimation, setHideAnimation] = useState(END_ANIMATION)
  const [isShow, setIsShow] = useState(true)
  const { authenStore, versatileStore } = useStores()

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
      versatileStore.setSidebarWidth(288)
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
  console.log("---------------- Admin Menu Screen ----------------")
  console.log(versatileStore.sidebarWidth)
  return <MainContainerMenu>

    <SubMainContainer>

      <MainTitleMenuDiv style={!isShow ? ButtonDiv : {}}>
        {isShow && <TitleDiv>FUNCTIONS MENU</TitleDiv>}
        <TitleDiv2 onClick={() => setSideBar()} style={Bergur}>
          <MenuIcon />
          <MenuIcon />
          <MenuIcon2 />
        </TitleDiv2>
      </MainTitleMenuDiv>

      {isShow == true && <MainDivMenu style={ShowAnimation}>
        <MainUl>
          {authenStore.getMenu && authenStore.getMenu.map((e, i) => {
            return <BorderMenu style={{ marginBottom: i == (authenStore.getMenu.length - 1) ? 10: 0  }}><Link key={"link-menu-" + e.id} href={e.linkTo}>
              <SpanText id={"span-text-" + e.id}><LinkColorMenu>{i18n.t(e.translate)}</LinkColorMenu></SpanText>
              {/* <SpanText id={"span-text-" + e.id}><LinkColorMenu>{e.name}</LinkColorMenu></SpanText> */}
            </Link></BorderMenu>
          })}
        </MainUl>
      </MainDivMenu>}
      {isShow == false && <MainHideDivMenu style={HideAnimation} />}

    </SubMainContainer>

  </MainContainerMenu>
}

export default AdminMenu
