import React, { useContext } from 'react'
import Router, { withRouter } from 'next/router'
import MainLayout from './MainLayout'
import { inject, observer } from 'mobx-react'
// import Login from '../pages/login'
import { withTranslation } from '../i18n'
import Custom404 from '../pages/404'
import dynamic from "next/dynamic";
const Login = dynamic(() => import("../pages/login"));

const EmptyLayout = inject('authenStore', 'loginStore')(observer((props) => {
  // const { authenStore } = useStores()
  const { authenStore, loginStore } = props
  console.log(props)
  console.log("________________ EMPTY LAYOUT PROPS __________________")
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
  console.log("_________________ context ON LAYOUT CONTROL __________________")
  console.log(context)

  const { sessions } = readCookies(context.req);
  if (!sessions) return { loggedIn: false };
  else
    return { namespacesRequired: [] }
}
export default withRouter(
  withTranslation('common')
    (EmptyLayout)
)


// PrivatePage.getInitialProps = async context => {
//   const { sessions } = readCookies(context.req);
//   if (!session) return { loggedIn: false };
//   // the code required for your private page
// };












// import React, { useContext } from 'react'
// import Router, { withRouter } from 'next/router'
// import MainLayout from './MainLayout'
// import { inject, observer } from 'mobx-react'
// import Login from '../pages/login'
// import { withTranslation } from '../i18n'
// import Custom404 from '../pages/404'
// import login from '../pages/login'

// export default function EmptyLayout({
//   WrappedComponent,
//   clientCondition,
//   serverCondition,
//   location
// }) {
//   const EmptyLayoutWrapper = props => {
//     const router = useRouter();
//     const redirectCondition = clientCondition();
//     if (isBrowser() && redirectCondition) {
//       router.push(location);
//       return <></>;
//     }
//     return <MainLayout>
//       {props.children}
//     </MainLayout>;
//   };

//   EmptyLayoutWrapper.getInitialProps = async (ctx) => {
//     if (!isBrowser() && ctx.res) {
//       if (serverCondition(ctx)) {
//         ctx.res.writeHead(302, { Location: location });
//         ctx.res.end();
//       }
//     }

//     const componentProps =
//       WrappedComponent.getInitialProps &&
//       (await WrappedComponent.getInitialProps(ctx));

//     return { ...componentProps };
//   };

//   return EmptyLayoutWrapper;
// }
