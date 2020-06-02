import React, { Component } from 'react'
import AdminHeader from './AdminHeader'
import AdminMenu from './AdminMenu'
import AdminFooter from './AdminFooter'
import { withRouter } from 'next/router'
import { FirstLayer, SecondLayer, EmptyDiv, EmptySidebar, ContentPadding } from './Styles/AdminHocStyles'


const MainLayout = (props) => {
  return (
    <FirstLayer>
      <AdminHeader />
      <EmptyDiv />
      <SecondLayer>
        <AdminMenu />
        <EmptySidebar />
        <ContentPadding>
          {props.children}
        </ContentPadding>
      </SecondLayer>
      <AdminFooter />
    </FirstLayer>
  )
}

export default withRouter(MainLayout)























