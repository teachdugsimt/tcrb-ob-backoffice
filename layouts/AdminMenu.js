import React, { Component, useContext, useState } from 'react'
import VersatileStore from '../mobx-store/VersatileStore'
import Link from 'next/link'
import { colors } from '../theme/colors'
import {
  BorderMenu, MenuIcon, MenuIcon2, MainDivMenu, MainContainerMenu, SubMainContainer,
  MainTitleMenuDiv, TitleDiv, TitleDiv2, MainUl, SpanText, LinkColorMenu
} from './Styles/AdminHocStyles'

const listMenu = [
  { id: 1, name: "CUSTOMER SERVICES ENQUIRY", linkTo: "/", color: "#000000" },
  { id: 2, name: "CUSTOMER SERVICES MENU", linkTo: "/", color: "#000000" },
  { id: 3, name: "PARTNER MANAGEMENT", linkTo: "/", color: "#000000" },
  { id: 4, name: "CONSENT MANAGEMENT", linkTo: "/", color: "#000000" },
  { id: 5, name: "TERM & CONDITION MANAGEMENT", linkTo: "/", color: "#000000" },
  { id: 6, name: "SECURITY CODE ENQUIRY", linkTo: "/", color: "#000000" },
  { id: 7, name: "NOTIFICATION ENQUIRY", linkTo: "/", color: "#000000" },
  { id: 8, name: "BRANCH LOCATION ENQUIRY", linkTo: "/", color: "#000000" },
  { id: 9, name: "LIVE CHAT ENQUIRY", linkTo: "/", color: "#000000" },
  { id: 10, name: "MARKETING ADS ENQUIRY", linkTo: "/", color: "#000000" },
  { id: 11, name: "DASHBOARD & REPORTS", linkTo: "/", color: "#000000" },
  { id: 12, name: "BUSINESS PARAMETERS SETUP", linkTo: "/", color: "#000000" },
  { id: 13, name: "USER ACCESS MANAGEMENT ENQUIRY", linkTo: "/", color: "#000000" },
  { id: 14, name: "DEVICE ENQUIRY", linkTo: "/", color: "#000000" },
]

const AdminMenu = (props) => {
  const context = useContext(VersatileStore)
  return <MainContainerMenu>

    <SubMainContainer>

      <MainTitleMenuDiv>
        <TitleDiv>FUNCTIONS MENU</TitleDiv>

        <TitleDiv2>
          <MenuIcon />
          <MenuIcon />
          <MenuIcon2 />
        </TitleDiv2>
      </MainTitleMenuDiv>

      <MainDivMenu>
        <MainUl>
          {listMenu && listMenu.map((e, i) => {
            return <BorderMenu><Link key={"link-menu-" + e.id} href={e.linkTo}>
              <SpanText id={"span-text-"+e.id}><LinkColorMenu>{e.name}</LinkColorMenu></SpanText>
            </Link></BorderMenu>
          })}
        </MainUl>
      </MainDivMenu>

    </SubMainContainer>

  </MainContainerMenu>
}

export default AdminMenu
