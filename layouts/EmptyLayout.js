import React, { useContext } from 'react'
import Router, { withRouter } from 'next/router'
import MainLayout from './MainLayout'
import { inject, observer } from 'mobx-react'
import Login from '../pages/login'
import { withTranslation } from '../i18n'
import Custom404 from '../pages/404'

const EmptyLayout = inject('authenStore')(observer((props) => {
  // const { authenStore } = useStores()
  const { authenStore } = props
  // console.log("________________ EMPTY LAYOUT PROPS __________________")
  // console.log(props)

  // if (authenStore.password && authenStore.id) {
  return (
    <MainLayout>
      {props.children}
    </MainLayout>
  )
  // }
  // else if (props.router && props.router.route == "/_error") {
  //   return <div>{props.children}</div>
  // }
  // else if (props.router.pathname.includes("/404") || props.router.route.includes("/404")) {
  //   return <Custom404 />
  // }
  // else {
  //   return <Login />
  // }
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
