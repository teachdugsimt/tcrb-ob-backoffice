import React, { Component } from 'react'
import AdminHeader from './AdminHeader'
import AdminMenu from './AdminMenu'
import AdminFooter from './AdminFooter'
import { withRouter } from 'next/router'
import { FirstLayer, SecondLayer, EmptyDiv } from './Styles/AdminHocStyles'


const MainLayout = (props) => {
    return (
        <FirstLayer>
            <AdminHeader />
            <EmptyDiv/>
            <SecondLayer>
                <AdminMenu />
                {props.children}
            </SecondLayer>
            <AdminFooter />
        </FirstLayer>
    )
}

export default withRouter(MainLayout)























