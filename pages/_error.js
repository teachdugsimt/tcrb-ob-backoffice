import React from 'react'
import ErrorPage from 'next/error'
import { withTranslation } from '../i18n'

const withError = (Component) => class extends React.Component {
  static async getInitialProps(ctx) {
    const props = await Component.getInitialProps(ctx)
    const { statusCode } = ctx.res
    return { statusCode, ...props }
  }

  render() {
    const { statusCode } = this.props
    if (statusCode && statusCode !== 200) {
      return <ErrorPage statusCode={statusCode} />
    }
    else if (statusCode && statusCode == 404) {
      return <ErrorPage statusCode={statusCode} />
    }
    // return <Component {...this.props} />
  }
}

withError.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withTranslation('common')(withError)

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
