import React, { Component, useContext } from 'react'
import logo02 from '../images/logo02.png'
import account from '../images/account.png'

const AdminHeader = (props) => {

  return (
    <div style={{ display: "flex", flex: 1, flexDirection: 'column', height: 100, width: "100%", backgroundColor: '#1d1d1d', padding: 0, position: 'fixed', top: 0, left: 0, right: 0 }}>

      <div style={{ display: 'flex', width: "100%", flex: 1, height: "50%", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

        <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: 100, paddingTop: 10, paddingLeft: 5 }}>
          <img src={logo02} alt='logo' id='logoImage' style={{ aspectRatio: 0.1, height: 50 }} />
        </div>

        <div style={{ display: 'flex', flex: 0.8, flexDirection: 'row', justifyContent: 'flex-end', alignSelf: 'right', paddingRight: 10 }}>


          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', paddingTop: 5 }}>
            <h3 style={{ marginLeft: 10, color: '#ffffff' }}>Support</h3>
            <h3 style={{ marginLeft: 10, color: '#ffffff' }}>Signout</h3>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
              <img src={account} alt="account" id="accountImage" style={{ height: 40, width: 40, background: 'white', borderRadius: 20 }} />
              <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 10 }}>
                <span style={{ color: '#ffffff', fontWeight: 'bold' }}>Korkaew</span>
                <span style={{ color: '#ffffff', fontWeight: 'bold' }}>Tribamrongsuk</span>
              </div>
            </div>
          </div>


        </div>

      </div>

      <div style={{ display: 'flex', width: "100%", flex: 1, height: "50%", flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>

      </div>

    </div>
  )
}

export default AdminHeader
