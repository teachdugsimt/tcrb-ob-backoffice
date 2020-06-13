import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { useStores } from '../hooks/use-stores'
import CircleButton from '../components/button-circle/circle-button'
// import Link from 'next/link'

import { i18n, Link, withTranslation } from '../i18n'

const index = (observer(() => {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")

  const { counterStore, authenStore } = useStores()

  return <div>
    <h1 style={{ color: 'red' }}>DashboardV1</h1>
    <h1 style={{ color: 'red' }}>{authenStore.id ? "ID :" + authenStore.id : ""}</h1>
    <h1 style={{ color: 'red' }}>{authenStore.password ? "Password : " + authenStore.password : ""}</h1>
    <h1 style={{ color: 'red' }}>{authenStore.type ? "Type :" + authenStore.type : ""}</h1>

    <div style={{ color: 'red' }}>{counterStore.count}</div>
    <button onClick={() => counterStore.increment()}>++</button>
    <button onClick={() => counterStore.decrement()}>--</button>
    <h1>Dashboard index</h1>
    <CircleButton title={i18n.t("confirm")} type={"primary"} shape={"round"} size={"large"}
    loading={false} onClick={() => console.log("Success Click!!")}/>

  </div >
}))

index.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

index.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(index)




