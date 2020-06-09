import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react'
import { useStores } from '../hooks/use-stores'
import Link from 'next/link'

const index = (observer(() => {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")

  const { counterStore, authenStore } = useStores()

  return <div>
    DashboardV1
    <h1>{authenStore.id ? "ID :" + authenStore.id : ""}</h1>
    <h1>{authenStore.password ? "Password : " + authenStore.password : ""}</h1>
    <h1>{authenStore.type ? "Type :" + authenStore.type : ""}</h1>

    <div>{counterStore.count}</div>
    <button onClick={() => counterStore.increment()}>++</button>
    <button onClick={() => counterStore.decrement()}>--</button>

  </div >
}))

export default index




