import React, { Component, useState, useContext } from 'react'
import { inject, observer } from 'mobx-react'
import Router from 'next/router'
import TestStore3 from '../mobx-store/TestStore3'

const Login = observer((props) => {
    const tmp = useContext(TestStore3)
    console.log("------------ Login screen ------------")
    console.log(tmp)
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")

    const _submitForm = () => {
        if (!id && !password) alert("Please entry id & password")
        else {
            tmp.setProfile(id, password)
            tmp.setType("42")
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
export default (Login)
