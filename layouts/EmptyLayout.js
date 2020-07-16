import React, { useContext } from 'react'
import Router, { withRouter } from 'next/router'
import MainLayout from './MainLayout'
import { inject, observer } from 'mobx-react'
// import Login from '../pages/login'
import { withTranslation } from '../i18n'
import Custom404 from '../pages/404'
import dynamic from "next/dynamic";
import jsCookie from 'js-cookie';
const Login = dynamic(() => import("../pages/login"));

const EmptyLayout = inject('authenStore', 'loginStore')(observer((props) => {
  // const { authenStore } = useStores()
  const { authenStore, loginStore } = props
  console.log(props)
  console.log("________________ EMPTY LAYOUT PROPS __________________")
  let cookie_session = jsCookie.get('token')
  console.log(cookie_session)
  const propsLogin = JSON.parse(JSON.stringify(loginStore.data_signin))
  const propsLoginError = JSON.parse(JSON.stringify(loginStore.error_login))
  const dataSignout = JSON.parse(JSON.stringify(loginStore.data_logout))
  console.log(propsLogin)
  console.log(propsLoginError)

  if (!propsLogin || Object.keys(propsLogin).length < 1) {
    return <Login />
  }
  else if (props.router && props.router.route == "/_error") {
    return <div>{props.children}</div>
  }
  else if (props.router.pathname.includes("/404") || props.router.route.includes("/404")) {
    return <Custom404 />
  }
  else {
    return (
      <MainLayout>
        {props.children}
      </MainLayout>
    )
  }
  // else {
  //   return <Login />
  // }
}
))
EmptyLayout.getInitialProps = async (context) => {
  console.log("_________________ GET INITAL PROPS EMPTY LAYOUT __________________")
  console.log(context)

  // const { sessions } = readCookies(context.req);
  // if (!sessions) return { loggedIn: false };
  // else
  //   return { namespacesRequired: [] }



  let initProps = {};
  if (context && context.headers) {
    let cookies = context.headers.cookie;
    if (typeof cookies === 'string') {
      const cookiesJSON = JSON.parse(JSON.stringify(cookies));
      initProps.token = cookiesJSON.token;
    }
  }
  return initProps;



}
export default withRouter(
  withTranslation('common')
    (EmptyLayout)
)

