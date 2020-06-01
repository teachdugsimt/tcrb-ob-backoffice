

import React, { useContext } from 'react'
import Router, { withRouter } from 'next/router'
import { ThemeProvider } from 'styled-components'
import theme from '../theme'
import MainLayout from './MainLayout'
// import Login from '../../pages/Login'


const EmptyLayout = (props) => {

  // const context = useContext(TestStore3)

  // if (context.password && context.id) {
  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        {props.children}
      </MainLayout>
    </ThemeProvider>
  )
  // }
  // else if (props.router && props.router.route == "/_error") {
  //   return <div>{props.children}</div>
  // }
  // else {
  //   return <Login />
  // }


}
export default withRouter(EmptyLayout)