import React from 'react'
import App from 'next/app'
import EmptyLayout from '../layouts/EmptyLayout'
import { ThemeProvider } from 'styled-components'
import theme from '../theme'
import 'antd/dist/antd.css'

class CustomApp extends App {

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
        <EmptyLayout>
          <Component {...pageProps} events={events} />
        </EmptyLayout>
      </ThemeProvider>

    )
  }
}
export default CustomApp;
