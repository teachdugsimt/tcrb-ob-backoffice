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
  console.log("____________ Authen Store MENU _________________")
  console.log(JSON.parse(JSON.stringify(authenStore.menu)))

  useEffect(() => {
    let adminMenu = [
      { key: 1, id: 1, name: "CUSTOMER SERVICES ENQUIRY", translate: "customerServicesEnquiry", linkTo: "/customer-service-enquiry", color: "#000000", typeLv: "42" },
      { key: 2, id: 2, name: "CUSTOMER SERVICES MENU", translate: "customerServiceMenu", linkTo: "/customer-service-menu", color: "#000000", typeLv: "38" },
      { key: 3, id: 3, name: "PARTNER MANAGEMENT", translate: "partnerManagement", linkTo: "/partner-mangement", color: "#000000", typeLv: "38" },
      { key: 4, id: 4, name: "PRODUCT ONBOARDING", translate: "productOnboarding", linkTo: "/product-onboarding", color: "#000000", typeLv: "38" },
      { key: 5, id: 5, name: "CONSENT MANAGEMENT", translate: "consentManagement", linkTo: "/", color: "#000000", typeLv: "30" },
      { key: 6, id: 6, name: "TERM & CONDITION MANAGEMENT", translate: "term&conditionManagement", linkTo: "/", color: "#000000", typeLv: "30" },
      { key: 7, id: 7, name: "SECURITY CODE ENQUIRY", translate: "securityCodeEnquiry", linkTo: "/", color: "#000000", typeLv: "50" },
      { key: 8, id: 8, name: "NOTIFICATION ENQUIRY", translate: "notificationEnquiry", linkTo: "/", color: "#000000", typeLv: "50" },
      { key: 9, id: 9, name: "BRANCH LOCATION ENQUIRY", translate: "branchLocation", linkTo: "/", color: "#000000", typeLv: "12" },
      { key: 10, id: 10, name: "LIVE CHAT ENQUIRY", translate: "liveChat", linkTo: "/", color: "#000000", typeLv: "12" },
      { key: 11, id: 11, name: "MARKETING ADS ENQUIRY", translate: "marketingAds", linkTo: "/", color: "#000000", typeLv: "12" },
      { key: 12, id: 12, name: "DASHBOARD & REPORTS", translate: "dashboardReports", linkTo: "/", color: "#000000", typeLv: "42" },
      { key: 13, id: 13, name: "BUSINESS PARAMETERS SETUP", translate: "businessParametersSetup", linkTo: "/parameters-setup", color: "#000000", typeLv: "42" },
      { key: 14, id: 14, name: "PENDING APPROVE", translate: "pendingApprove", linkTo: "/pending-approve", color: "#000000", typeLv: "42" },
      { key: 15, id: 15, name: "USER ACCESS MANAGEMENT ", translate: "useAccessManagementEnquiry", linkTo: "/user-access-management", color: "#000000", typeLv: "42" },
      { key: 16, id: 16, name: "DEVICE ENQUIRY", translate: "deviceEnquiry", linkTo: "/", color: "#000000", typeLv: "42" },
    ]

    authenStore.setMenu(adminMenu)
  }, [])

  useEffect(() => {
    console.log("--------- Menu is comming ---------")
  }, [JSON.parse(JSON.stringify(authenStore.menu))])
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
