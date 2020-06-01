import React from 'react'
import App from 'next/App'
import EmptyLayout from '../components/Layouts/EmptyLayout'

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