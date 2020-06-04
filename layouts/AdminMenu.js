import React, { Component, useContext, useState } from 'react'
import VersatileStore from '../mobx-store/VersatileStore'
import Link from 'next/link'
import { colors } from '../theme/colors'
import { BorderMenu } from './Styles/AdminHocStyles'
const listMenu = [
  { id: 1, name: "CUSTOMER SERVICES ENQUIRY", linkTo: "/", color: "#000000" },
  { id: 2, name: "CUSTOMER SERVICES MENU", linkTo: "/", color: "#000000" },
  { id: 3, name: "PARTNER MANAGEMENT", linkTo: "/", color: "#000000" },
  { id: 4, name: "CONSENT MANAGEMENT", linkTo: "/", color: "#000000" },
  { id: 5, name: "TERM & CONDITION MANAGEMENT", linkTo: "/", color: "#000000" },
  { id: 6, name: "SECURITY CODE ENQUIRY", linkTo: "/", color: "#000000" },
  { id: 7, name: "NOTIFICATION ENQUIRY", linkTo: "/", color: "#000000" },
  { id: 8, name: "BRANCH LOCATION ENQUIRY", linkTo: "/", color: "#000000" },
  { id: 9, name: "LIVE CHAT ENQUIRY", linkTo: "/", color: "#000000" },
  { id: 10, name: "MARKETING ADS ENQUIRY", linkTo: "/", color: "#000000" },
  { id: 11, name: "DASHBOARD & REPORTS", linkTo: "/", color: "#000000" },
  { id: 12, name: "BUSINESS PARAMETERS SETUP", linkTo: "/", color: "#000000" },
  { id: 13, name: "USER ACCESS MANAGEMENT ENQUIRY", linkTo: "/", color: "#000000" },
  { id: 14, name: "DEVICE ENQUIRY", linkTo: "/", color: "#000000" },
]
const AdminMenu = (props) => {
  const context = useContext(VersatileStore)
  return <div style={{ width: context.sidebarWidth, display: 'flex', flex: 0.25, position: 'fixed', top: 108, bottom: 56, left: 8 }}>

    <div style={{ display: 'flex', flex: 1, width: '100%', flexDirection: 'column' }}>

      <div style={{ display: 'flex', height: 117, backgroundColor: '#707070', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>
        <h3 style={{ fontWeight: 'bold', color: 'white', paddingTop: 15, paddingLeft: 15, fontSize: 18 }}>FUNCTIONS MENU</h3>

        <div style={{ paddingTop: 15, paddingRight: 15, display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: 30, height: 2, borderRadius: 1, backgroundColor: 'white', marginTop: 5 }}></div>
          <div style={{ width: 30, height: 2, borderRadius: 1, backgroundColor: 'white', marginTop: 5 }}></div>
          <div style={{ width: 7.5, height: 2, borderRadius: 1, backgroundColor: 'white', marginTop: 5 }}></div>
        </div>
      </div>

      <div style={{ display: "flex", height: "100%", backgroundColor: "#fff5", borderColor: 'black', overflowY: 'scroll' }}>
        <ul style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', marginTop: 10 }}>
          {listMenu && listMenu.map((e, i) => {
            return <BorderMenu><Link key={"link-menu-" + e.id} href={e.linkTo}>
              <span style={{ width: "100%", marginTop: 10, marginBottom: 0, marginRight: 10, fontSize: 12 }}><a style={{ color: e.color ? e.color : "#000000" }}>{e.name}</a></span>
            </Link></BorderMenu>
          })}
        </ul>
      </div>
    </div >

  </div >
}

export default AdminMenu

// 8% 8% 0% 0% / 8% 8% 0% 0%
















// import React from 'react'

// const AdminMenu = (props) => {
//     return <div style={{ width: 235, display: 'flex', flex: 0.25, backgroundColor: "lightgrey", position: 'fixed', top: 100, bottom: 40, left: 0 }}>

//         <div style={{ display: 'flex', flex: 1, width: '100%', flexDirection: 'column', justifyContent: 'center' }}>
//             <div style={{ height: 50 }}>
//             </div>
//             <div style={{ height: 50 }}>
//             </div>
//         </div >

//     </div >
// }

// export default AdminMenu
