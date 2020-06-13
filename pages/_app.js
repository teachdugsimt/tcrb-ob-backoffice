import React, { useContext } from 'react'
import App from 'next/app'
import Head from 'next/head'
import EmptyLayout from '../layouts/EmptyLayout'
import { ThemeProvider } from 'styled-components'
import theme from '../theme'
import 'antd/dist/antd.css'
import { appWithTranslation } from '../i18n'

class CustomApp extends App {

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
    return (
      <ThemeProvider theme={theme}>
        <Head>
          <title>TCRB Backoffice</title>
        </Head>
        <EmptyLayout>
          <Component {...pageProps} events={events} />
        </EmptyLayout>
      </ThemeProvider>
    )
  }
}

export default appWithTranslation(CustomApp);
