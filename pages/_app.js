import React, { useContext } from 'react'
import App from 'next/app'
import Head from 'next/head'
import { Provider } from 'mobx-react';
import initializeStore from '../stores/stores';
import { appWithTranslation } from '../i18n'

import { ThemeProvider } from 'styled-components'
import theme from '../theme'
// import '../assets/fonts.less'

// import 'antd/dist/antd.css'
// import '../style.less';


import EmptyLayout from '../layouts/EmptyLayout'

class CustomApp extends App {

  static async getInitialProps(appContext) {
    const mobxStore = initializeStore();
    appContext.ctx.mobxStore = mobxStore;
    const appProps = await App.getInitialProps(appContext);
    return {
      ...appProps,
      initialMobxState: mobxStore,
    };
  }

  constructor(props) {
    super(props);
    const isServer = typeof window === 'undefined';
    this.mobxStore = isServer ? props.initialMobxState : initializeStore(props.initialMobxState);
  }

  componentDidMount() {
    let fixedNextDimension = document.getElementById("__next")
    fixedNextDimension.style.height = "100%"
    fixedNextDimension.style.width = "100%"
  }

  render() {
    const { Component, pageProps } = this.props;
    const events = [
      "PushEvent",
      "PushEvent",
      "PushEvent",
      "ReleaseEvent",
      "StatusEvent",
      "BadEvent"
    ];
    console.log('PAGE PROPS', pageProps)
    return (
      <Provider {...this.mobxStore}>
        <ThemeProvider theme={theme}>

          <Head>
            <title>TCRB Backoffice</title>
          </Head>
          <EmptyLayout>
            <Component {...pageProps} events={events} />
          </EmptyLayout>
        </ThemeProvider>
      </Provider>
    )
  }
}

export default appWithTranslation(CustomApp);
