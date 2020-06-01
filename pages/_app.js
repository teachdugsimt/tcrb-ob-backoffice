import React from 'react'
import App from 'next/App'
import EmptyLayout from '../layouts/EmptyLayout'

class CustomApp extends App {
    render() {
        const { Component, pageProps } = this.props;

        return (
            <EmptyLayout>
                <Component {...pageProps} />
            </EmptyLayout>
        )
    }
}
export default CustomApp;