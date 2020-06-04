import React, { Component, useContext } from 'react'
import { MainFooter, SubFooter, TextFooter } from './Styles/AdminFooterStyles'
import TestStore3 from '../mobx-store/TestStore3'

const AdminFooter = (props) => {
  const context = useContext(TestStore3)
  const footName = context.footName ? context.footName : "IT SERVICE DESK CONTACT NUMBER IS 02-6xx-1234"
  return (
    <MainFooter>
      <SubFooter>
        <TextFooter>{footName}</TextFooter>
        <span></span>
      </SubFooter>
    </MainFooter>
  )
}
export default AdminFooter
