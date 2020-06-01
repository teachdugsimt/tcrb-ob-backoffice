

import React, { useContext } from 'react'
import Router, { withRouter } from 'next/router'
import MainLayout from './MainLayout'
// import Login from '../../pages/Login'


const EmptyLayout = (props) => {

  // const context = useContext(TestStore3)

  // if (context.password && context.id) {
  return (
    <MainLayout>
      {props.children}
    </MainLayout>
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