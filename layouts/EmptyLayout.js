import React, { useContext } from 'react'
import Router, { withRouter } from 'next/router'
import MainLayout from './MainLayout'
// import { useStores } from '../hooks/use-stores'
import { inject, observer } from 'mobx-react'
import Login from '../pages/login'

const EmptyLayout = inject('authenStore')(observer((props) => {
  // const { authenStore } = useStores()
  const { authenStore } = props
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
