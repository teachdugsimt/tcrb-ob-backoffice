import React from 'react'
import App from 'next/App'
import EmptyLayout from '../layouts/EmptyLayout'
import { ThemeProvider } from 'styled-components'
import theme from '../theme'
import 'antd/dist/antd.css'

class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <EmptyLayout>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </EmptyLayout>
    )
  }
}
export default CustomApp;
