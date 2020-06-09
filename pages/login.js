import React, { Component, useState, useContext } from 'react'
import { inject, observer } from 'mobx-react'
import Router, { withRouter } from 'next/router'
import { useStores } from '../hooks/use-stores'

const Login = observer((props) => {

  const { authenStore } = useStores()
  console.log("------------ Login screen ------------")
  console.log(authenStore)
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")

  const _submitForm = () => {
    if (!id && !password) alert("Please entry id & password")
    else {
      authenStore.setProfile(id, password)
      authenStore.setType("50")
      Router.push("/")
    }
  }

  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 450, height: 400 }}>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1>Login Screen</h1>
        <div className="row">
          <h4>username</h4>
          <input style={{ margin: 5 }} value={id} onChange={e => setId(e.target.value)}></input>
        </div>
        <div className="row">
          <h4>password</h4>
          <input type="password" style={{ margin: 5 }} value={password} onChange={e => setPassword(e.target.value)}></input>
        </div>

        <button style={{ margin: 5 }} onClick={() => _submitForm()}>OK</button>
      </div>

    </div>
  )
})
export default withRouter(Login)
