import React, { Component, useEffect, useState } from 'react'
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
let check_update_menu = 0
const AdminMenu = inject('authenStore', 'versatileStore', 'loginStore')(observer((props) => {
  const [Bergur, setBergur] = useState({})
  const [ButtonDiv, setButtonDiv] = useState(BUTTON_DIV)
  const [ShowAnimation, setShowAnimation] = useState(INIT_ANIMATION)
  const [HideAnimation, setHideAnimation] = useState(END_ANIMATION)
  const [isShow, setIsShow] = useState(true)
  const [focusText, setfocusText] = useState(FOCUS_TEXT)
  const [focusLink, setfocusLink] = useState(FOCUS_LINK)
  const [stateMenu, setStateMenu] = useState([])
  const [listNoneLink, setvisibleNolink] = useState([])
  // const { authenStore, versatileStore } = useStores()
  const { t, authenStore, versatileStore, loginStore } = props
  console.log("____________ Authen Store MENU _________________")
  console.log(JSON.parse(JSON.stringify(authenStore.menu)))


  useEffect(() => {
    let tmp_menu = JSON.parse(JSON.stringify(loginStore.data_menu)) && JSON.parse(JSON.stringify(loginStore.data_menu)).length > 0 ? JSON.parse(JSON.stringify(loginStore.data_menu)) : []
    if (tmp_menu && tmp_menu.length > 0 && check_update_menu == 0) {
      check_update_menu = 1
      // console.log("Tmp MENU REALLY :: ", tmp_menu)
      let default_menu = [
        { key: 14, id: 14, name: "PENDING APPROVE", translate: "pendingApprove", link_to: "/pending-approve", color: "#000000", typeLv: "42" },
        { key: 15, id: 15, name: "USER ACCESS MANAGEMENT ", translate: "useAccessManagementEnquiry", link_to: "/user-access-management", color: "#000000", typeLv: "42" },
        { key: 16, id: 16, name: "PARTNER MANAGEMENT ", translate: "partnerManagement", link_to: "/partner-management", color: "#000000", typeLv: "42" },
        // { key: 16, id: 16, name: "Product OnBoard ", translate: "productOnBoard", link_to: "/product-onboarding", color: "#000000", typeLv: "42" },

      ]
      let real_menu = tmp_menu.concat(default_menu)
      authenStore.setMenu(real_menu)
      setStateMenu(real_menu)
    }
  }, [loginStore.data_menu])

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

  // console.log("_____________ MENU REAL ____________")
  // console.log(JSON.parse(JSON.stringify(authenStore.menu)))
  return <MainContainerMenu>

    <SubMainContainer>

      <MainTitleMenuDiv style={!isShow ? ButtonDiv : {}}>
        {isShow == true && <TitleDiv>{t("functionMenu")}</TitleDiv>}
        <TitleDiv2 onClick={() => setSideBar()} style={Bergur}>
          <MenuIcon />
          <MenuIcon />
          <MenuIcon2 />
        </TitleDiv2>
      </MainTitleMenuDiv>

      {isShow == true && <MainDivMenu style={ShowAnimation}>
        <MainUl>
          {stateMenu && authenStore.menu && authenStore.menu.length > 0 && authenStore.menu.map((item, i) => {
            let e = JSON.parse(JSON.stringify(item))
            let link_to
            if (e.link_to) {
              link_to = e.link_to
            }
            else if (e.translate == "customerServiceServicesMenu") {
              link_to = "/customer-service-menu"
            }
            else if (!e.link_to && e.translate == "customerServiceEnquiry") {
              link_to = "/customer-service-enquiry"
            }
            else if (e.translate == "parameterManagement") {
              link_to = "/parameters-setup"
            }
            else if (e.translate == "dashboardReporting") {
              link_to = "/"
            }
            else if (e.translate == "digitalBankingBackOffice") {
              link_to = "/"
            }
            else {
              link_to = "/"
            }
            return <BorderMenu style={{ marginBottom: 10, ...focusText }}><Link key={"link-menu-" + e.id} href={link_to}>
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
