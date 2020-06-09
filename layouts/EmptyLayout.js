import React, { useContext } from 'react'
import Router, { withRouter } from 'next/router'
import MainLayout from './MainLayout'
import { useStores } from '../hooks/use-stores'
import { observer } from 'mobx-react'
import Login from '../pages/Login'

const EmptyLayout = (observer((props) => {
  const { authenStore } = useStores()
  if (authenStore.password && authenStore.id) {
    return (
      <MainLayout>
        {props.children}
      </MainLayout>
    )
  }
  else if (props.router && props.router.route == "/_error") {
    return <div>{props.children}</div>
  }
  else {
    return <Login />
  }
}))
export default withRouter(EmptyLayout)
