import React, { Component, useContext, useEffect, useState, useMemo } from 'react'
import AdminHeader from './AdminHeader'
import AdminMenu from './AdminMenu'
import AdminFooter from './AdminFooter'
import { withRouter } from 'next/router'
import { FirstLayer, SecondLayer, EmptyDiv, EmptySidebar, ContentPadding } from './Styles/AdminHocStyles'
import VersatileStore from '../mobx-store/VersatileStore'


const MainLayout = (props) => {
  const [width, setWidth] = useState(288)
  const context = useContext(VersatileStore)
  console.log("------------- Main Layout Screen ---------------")
  console.log(context.sidebarWidth)
  console.log(width)
  console.log(props)

  // const setWidthState = (width) => {
  //   if (width < 100)
  //     setWidth(76)
  //   else if (width > 100)
  //     setWidth(288)
  // }

  // const memoizedValue = useMemo(() => setWidthState(context.sidebarWidth), [context.sidebarWidth]);

  useEffect(() => {
    console.log("------------------------ Use Effect Main Layout ----------------------")
    console.log(context.sidebarWidth)
    // if (context.sidebarWidth < 100)
    //   setWidth(76)
    // else if (context.sidebarWidth > 100)
    //   setWidth(288)
    return () => {
      // cleanup
      console.log("------------------ Clean up Main Layout -------------------")
    }
  }, [context.sidebarWidth])

  return (
    <FirstLayer>
      <AdminHeader />
      <EmptyDiv />
      <SecondLayer>
        <AdminMenu />
        {/* {context.sidebarWidth < 100 && <EmptySidebar />}
        {context.sidebarWidth > 100 && <EmptySidebar style={{ paddingLeft: 288 }} />} */}
        <EmptySidebar style={{ paddingLeft: context.sidebarWidth > 100 ? 288 : 78 }} />
        <ContentPadding>
          {props.children}
        </ContentPadding>
      </SecondLayer>
      <AdminFooter />
    </FirstLayer>
  )
}

export default withRouter(MainLayout)























