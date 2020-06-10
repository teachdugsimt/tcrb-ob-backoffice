import React, { Component, useState, useContext } from 'react'
import { inject, observer } from 'mobx-react'
import Router, { withRouter } from 'next/router'
import { useStores } from '../hooks/use-stores'



const Login = observer((props) => {

  let customerMenu = [
    { id: 1, name: "CUSTOMER SERVICES ENQUIRY", linkTo: "/", color: "#000000", typeLv: "42" },
    { id: 2, name: "CUSTOMER SERVICES MENU", linkTo: "/test-customer-service-menu", color: "#000000", typeLv: "38" },
    { id: 3, name: "PARTNER MANAGEMENT", linkTo: "/", color: "#000000", typeLv: "38" },
    { id: 4, name: "CONSENT MANAGEMENT", linkTo: "/", color: "#000000", typeLv: "30" },
    { id: 5, name: "TERM & CONDITION MANAGEMENT", linkTo: "/", color: "#000000", typeLv: "30" },
    { id: 6, name: "SECURITY CODE ENQUIRY", linkTo: "/", color: "#000000", typeLv: "50" },
    { id: 12, name: "BUSINESS PARAMETERS SETUP", linkTo: "/parameters-setup", color: "#000000", typeLv: "42" },
  ]

  let adminMenu = [
    { id: 1, name: "CUSTOMER SERVICES ENQUIRY", linkTo: "/", color: "#000000", typeLv: "42" },
    { id: 2, name: "CUSTOMER SERVICES MENU", linkTo: "/test-customer-service-menu", color: "#000000", typeLv: "38" },
    { id: 3, name: "PARTNER MANAGEMENT", linkTo: "/", color: "#000000", typeLv: "38" },
    { id: 4, name: "CONSENT MANAGEMENT", linkTo: "/", color: "#000000", typeLv: "30" },
    { id: 5, name: "TERM & CONDITION MANAGEMENT", linkTo: "/", color: "#000000", typeLv: "30" },
    { id: 6, name: "SECURITY CODE ENQUIRY", linkTo: "/", color: "#000000", typeLv: "50" },
    { id: 7, name: "NOTIFICATION ENQUIRY", linkTo: "/", color: "#000000", typeLv: "50" },
    { id: 8, name: "BRANCH LOCATION ENQUIRY", linkTo: "/", color: "#000000", typeLv: "12" },
    { id: 9, name: "LIVE CHAT ENQUIRY", linkTo: "/", color: "#000000", typeLv: "12" },
    { id: 10, name: "MARKETING ADS ENQUIRY", linkTo: "/", color: "#000000", typeLv: "12" },
    { id: 11, name: "DASHBOARD & REPORTS", linkTo: "/", color: "#000000", typeLv: "42" },
    { id: 12, name: "BUSINESS PARAMETERS SETUP", linkTo: "/parameters-setup", color: "#000000", typeLv: "42" },
    { id: 13, name: "USER ACCESS MANAGEMENT ENQUIRY", linkTo: "/", color: "#000000", typeLv: "42" },
    { id: 14, name: "DEVICE ENQUIRY", linkTo: "/", color: "#000000", typeLv: "42" },
  ]

  let userMenu = [
    { id: 1, name: "CUSTOMER SERVICES ENQUIRY", linkTo: "/", color: "#000000", typeLv: "42" },
    { id: 2, name: "CUSTOMER SERVICES MENU", linkTo: "/test-customer-service-menu", color: "#000000", typeLv: "38" },
    { id: 12, name: "BUSINESS PARAMETERS SETUP", linkTo: "/parameters-setup", color: "#000000", typeLv: "42" },
  ]

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
      if (id.includes("customer")) {
        authenStore.setMenu(customerMenu)
      } else if (id.includes("admin")) {
        authenStore.setMenu(adminMenu)
      } else {
        authenStore.setMenu(userMenu)
      }
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