import React, { Component, useContext } from 'react'
import { MainFooter, SubFooter, TextFooter } from './Styles/AdminFooterStyles'
import { useStores } from '../hooks/use-stores'

const AdminFooter = (props) => {
  const { authenStore } = useStores()
  const footName = authenStore.footName ? authenStore.footName : "IT SERVICE DESK CONTACT NUMBER IS 02-6xx-1234"
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
