import React, { Component, useContext } from 'react'
import { MainFooter, SubFooter, TextFooter } from './Styles/AdminFooterStyles'
// import { useStores } from '../hooks/use-stores'
import { inject, observer } from 'mobx-react'
import { withTranslation } from '../i18n'

const AdminFooter = inject('authenStore')(observer((props) => {
  const { authenStore } = props
  const footName = authenStore.footName ? authenStore.footName : "IT SERVICE DESK CONTACT NUMBER IS 02-6xx-1234"
  return (
    <MainFooter>
      <SubFooter>
        <TextFooter>{footName}</TextFooter>
        <span></span>
      </SubFooter>
    </MainFooter>
  )
}))

AdminFooter.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withTranslation('common')(AdminFooter)
