import React, { Component } from 'react'
import AdminHeader from './AdminHeader'
import AdminMenu from './AdminMenu'
import AdminFooter from './AdminFooter'
import { withRouter } from 'next/router'
import { FirstLayer, SecondLayer } from './Styles/AdminHocStyles'


const MainLayout = (props) => {
    return (
        <FirstLayer>
            <AdminHeader />
            <SecondLayer>
                <AdminMenu />
                {props.children}
            </SecondLayer>
            <AdminFooter />
        </FirstLayer>
    )
}

export default withRouter(MainLayout)























