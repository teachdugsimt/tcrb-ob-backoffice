import React, { useContext } from 'react'
import Router, { withRouter } from 'next/router'
import MainLayout from './MainLayout'
import { inject, observer } from 'mobx-react'
import Login from '../pages/login'
import { withTranslation } from '../i18n'
import Custom404 from '../pages/404'
import login from '../pages/login'

const EmptyLayout = inject('authenStore', 'loginStore')(observer((props) => {
  // const { authenStore } = useStores()
  const { authenStore, loginStore } = props
  console.log("________________ EMPTY LAYOUT PROPS __________________")
  const propsLogin = JSON.parse(JSON.stringify(loginStore.data_login))
  const propsLoginError = JSON.parse(JSON.stringify(loginStore.error_login))
  const dataSignout = JSON.parse(JSON.stringify(loginStore.data_logout))
  console.log(propsLogin)
  console.log(propsLoginError)

  if (propsLogin && propsLogin.idToken && authenStore.id) {
    return (
      <MainLayout>
        {props.children}
      </MainLayout>
    )
  }
  else if (props.router && props.router.route == "/_error") {
    return <div>{props.children}</div>
  }
  else if (props.router.pathname.includes("/404") || props.router.route.includes("/404")) {
    return <Custom404 />
  }
  else if (!propsLogin && !authenStore.id) {
    // Router.push("/login")
    return <Login />
  }
  else {
    return <Login />
  }
}
))
EmptyLayout.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withRouter(
  withTranslation('common')
    (EmptyLayout)
)
// export default withRouter(withTranslation()(EmptyLayout))



// import withError from './withError'

// class Example extends React.Component {
//     static async getInitialProps(ctx) {
//         if (error) { // define your app error logic here
//           ctx.res.statusCode = 404;
//         }

//         return { /* ... */ }
//     }

//     render() {
//         /* ... */
//     }
// }

// export default withError(Example);
