import React, { useContext } from 'react'
import App from 'next/app'
import Head from 'next/head'
import { Provider } from 'mobx-react';
import initializeStore from '../stores/stores';
import { appWithTranslation, i18n } from '../i18n'

import { ThemeProvider } from 'styled-components'
import theme from '../theme'
// import '../assets/fonts.less'

import 'antd/dist/antd.css'
import '../theme/antd-custom.css'
// import '../style.less';
// import '../antd-custom.less'

import EmptyLayout from '../layouts/EmptyLayout'

class CustomApp extends App {

  static async getInitialProps(appContext) {
    console.log("_________________ GET INITIAL PROPS _APP _______________________")
    console.log(appContext)

    let initProps = {};
    if (appContext && appContext.headers) {
      let cookies = appContext.headers.cookie;
      if (typeof cookies === 'string') {
        const cookiesJSON = JSON.parse(JSON.stringify(cookies));
        initProps.token = cookiesJSON.token;
      }
    }

    const mobxStore = initializeStore();
    appContext.ctx.mobxStore = mobxStore;
    const appProps = await App.getInitialProps(appContext);
    return {
      ...appProps,
      initialMobxState: mobxStore,
      initProps,
      // namespacesRequired: ['common',],
    };
  }

  constructor(props) {
    super(props);
    const isServer = typeof window === 'undefined';
    this.mobxStore = isServer ? props.initialMobxState : initializeStore(props.initialMobxState);
  }

  componentDidMount() {
    i18n.languages = ["en", "th"]
    i18n.changeLanguage("en")
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
