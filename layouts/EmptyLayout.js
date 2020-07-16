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
  // let cookie_session = jsCookie.get('token')
  // console.log("OLD COOKIES :: ", cookie_session)
  console.log("NEW COOKIES from initail props :: ", pathInitial && pathInitial.cookies ? pathInitial.cookies : "NULL COOKIES 1")
  console.log("NEW COOKIES from direct cookies :: ", cookies.get('token'))
  console.log("COOKIES MENU :: ", cookies.get("menus"))
  const propsLogin = JSON.parse(JSON.stringify(loginStore.data_signin))
  const propsLoginError = JSON.parse(JSON.stringify(loginStore.error_login))
  const dataSignout = JSON.parse(JSON.stringify(loginStore.data_logout))

  // console.log(propsLogin)
  // console.log(propsLoginError)

  let cookies_menu
  if(cookies.get("menus")){
    cookies_menu = JSON.parse(JSON.stringify(cookies.get("menus")))
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

  // await handleAuthSSR(context); // Because Router.push can not use


  // let token = null;
  // if (context.req) {
  //   token = context.req.headers.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  // }
  // else {
  //   token = cookies.get('token')
  // }
  // if (context.res) {
  //   context.res.writeHead(302, {
  //     Location: '/'
  //   })
  //   context.res.end()
  // } else {
  //   if (token)
  //     return {
  //       pathInitial: '/',
  //       cookies: token
  //     }
  //   // Router.push('/')
  //   else {
  //     return { pathInitial: '/login' }
  //     // Router.push('/login')
  //   }
  // }

}
export default withRouter(
  withTranslation('common')
    (EmptyLayout)
)

