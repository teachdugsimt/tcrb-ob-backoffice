import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import CircleButton from '../components/button-circle/circle-button'
// import Link from 'next/link'
import { TcrbButton } from '../components/antd-styles/styles'
import { i18n, Link, withTranslation } from '../i18n'

const index =
  inject('counterStore', 'authenStore')
    (observer((props) => {
      const [id, setId] = useState("")
      const [password, setPassword] = useState("")

      const { authenStore } = props

      return <div>
        {/* <h1 style={{ color: 'red' }}>DashboardV1</h1> */}
        <h1 style={{ color: 'red' }}>{authenStore.id ? "ID :" + authenStore.id : ""}</h1>
        <h1 style={{ color: 'red' }}>{authenStore.password ? "Password : " + authenStore.password : ""}</h1>
        {/* <h1 style={{ color: 'red' }}>{props.authenStore.type ? "Type :" + props.authenStore.type : ""}</h1> */}

        {/* <div style={{ color: 'red' }}>{props.counterStore.count}</div>
        <button onClick={() => props.counterStore.increment()}>++</button>
        <button onClick={() => props.counterStore.decrement()}>--</button>
        <h1>Dashboard index</h1>
        <TcrbButton className="default" shape={"round"} size={"large"}
          onClick={() => console.log("Success Click!!", props.counterStore.count)} >{i18n.t("confirm")} </TcrbButton> */}

      </div>
    }))

index.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withTranslation()(index)




