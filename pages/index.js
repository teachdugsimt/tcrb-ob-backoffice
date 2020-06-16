import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import CircleButton from '../components/button-circle/circle-button'
// import Link from 'next/link'

import { i18n, Link, withTranslation } from '../i18n'

const index =
  inject('counterStore', 'authenStore')
    (observer((props) => {
      const [id, setId] = useState("")
      const [password, setPassword] = useState("")

      // const { counterStore, authenStore } = useStores()

      return <div>
        <h1 style={{ color: 'red' }}>DashboardV1</h1>
        <h1 style={{ color: 'red' }}>{props.authenStore.id ? "ID :" + props.authenStore.id : ""}</h1>
        <h1 style={{ color: 'red' }}>{props.authenStore.password ? "Password : " + props.authenStore.password : ""}</h1>
        <h1 style={{ color: 'red' }}>{props.authenStore.type ? "Type :" + props.authenStore.type : ""}</h1>

        <div style={{ color: 'red' }}>{props.counterStore.count}</div>
        <button onClick={() => props.counterStore.increment()}>++</button>
        <button onClick={() => props.counterStore.decrement()}>--</button>
        <h1>Dashboard index</h1>
        <CircleButton title={i18n.t("confirm")} type={"primary"} shape={"round"} size={"large"}
          loading={false} onClick={() => console.log("Success Click!!", props.counterStore.count)} />

      </div >
    }))

index.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

index.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(index)




