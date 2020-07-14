import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import CircleButton from '../components/button-circle/circle-button'
// import Link from 'next/link'
import { TcrbButton } from '../components/antd-styles/styles'
import { i18n, Link, withTranslation } from '../i18n'

const index =
  inject('counterStore', 'authenStore', 'loginStore')
    (observer((props) => {
      const [id, setId] = useState("")
      const [password, setPassword] = useState("")
      const { authenStore, loginStore, t } = props

      useEffect(() => {
        let loginProps = JSON.parse(JSON.stringify(loginStore.data_signin))
        console.log("Index Props screen :: ", loginProps)
        console.log(JSON.parse(JSON.stringify(authenStore.menu)))
      }, [JSON.parse(JSON.stringify(loginStore.data_signin))])

      return <div>
        <h1 style={{ color: 'red' }}>{authenStore.id ? "ID :" + authenStore.id : ""}</h1>
        <h1 style={{ color: 'red' }}>{authenStore.password ? "Password : " + authenStore.password : ""}</h1>
      </div>
    }))

index.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withTranslation('common')(index)




