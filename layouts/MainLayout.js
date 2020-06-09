import React, { Component, useContext, useEffect, useState, useMemo } from 'react'
import AdminHeader from './AdminHeader'
import AdminMenu from './AdminMenu'
import AdminFooter from './AdminFooter'
import { withRouter } from 'next/router'
import { FirstLayer, SecondLayer, EmptyDiv, EmptySidebar, ContentPadding, WrapperImageBackground } from './Styles/AdminHocStyles'
import { observer } from 'mobx-react'
import { useStores } from '../hooks/use-stores'
import backgroundImage from '../images/background.png'

const MainLayout = (observer((props) => {
  const [width, setWidth] = useState(288)
  const { versatileStore } = useStores()
  useEffect(() => {
    return () => {
      // clean up
    }
  }, [versatileStore.sidebarWidth])

  return (
    <FirstLayer>
      <WrapperImageBackground src={backgroundImage}/>
      <AdminHeader />
      <EmptyDiv />
      <SecondLayer>
        <AdminMenu />
        <EmptySidebar style={{ paddingLeft: versatileStore.sidebarWidth > 100 ? 288 : 74 }} />
        <ContentPadding>
          {props.children}
        </ContentPadding>
      </SecondLayer>
      <AdminFooter />
    </FirstLayer>
  )
}))

export default withRouter(MainLayout)























