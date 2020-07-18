import React, { useContext } from 'react'
import Router, { withRouter } from 'next/router'
import MainLayout from './MainLayout'
import { inject, observer } from 'mobx-react'
// import Login from '../pages/login'
import { withTranslation } from '../i18n'
import Custom404 from '../pages/404'
import dynamic from "next/dynamic";
// import jsCookie from 'js-cookie';
import { Cookies } from 'react-cookie';
import { handleAuthSSR } from '../components/data-utility/auth';
const cookies = new Cookies();
const Login = dynamic(() => import("../pages/login"));

const EmptyLayout = inject('authenStore', 'loginStore')(observer((props) => {
  // const { authenStore } = useStores()
  const { authenStore, loginStore, pathInitial } = props
  console.log(props)
  console.log("________________ EMPTY LAYOUT PROPS __________________")

  // const propsLogin = JSON.parse(JSON.stringify(loginStore.data_signin))
  // const propsLoginError = JSON.parse(JSON.stringify(loginStore.error_login))
  // const dataSignout = JSON.parse(JSON.stringify(loginStore.data_logout))

  let cookies_menu
  if(cookies.get("menus")){
    cookies_menu = JSON.parse(JSON.stringify(cookies.get("menus")))
    console.log("___________ Cookies Profile _____________")
    console.log(cookies_menu)
    loginStore.setProfile(cookies_menu)
  }

  if(!cookies.get('token') || !cookies_menu){
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

}
))
EmptyLayout.getInitialProps = async (context) => {
  console.log("_________________ GET INITAL PROPS EMPTY LAYOUT __________________")
  console.log(context)
  // Step to handle authen SSR
  // 1. get token from cookies to a variable
  // 2. request some api and pack token to header, we don't interest for response
  // 3. if api success then do anything else (token don't expiration can router to other screen)
  // 4. if api reject then (token was expire) router to login screen
}
export default withRouter(
  withTranslation('common')
    (EmptyLayout)
)

