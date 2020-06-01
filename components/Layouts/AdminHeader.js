import React, { Component, useContext } from 'react'
import Link from 'next/link'

const AdminHeader = (props) => {

    return (
        <div style={{ display: "flex", flex: 1, height: 100, backgroundColor: 'lightgrey', padding: 0, position: 'fixed', top: 0, left: 0, right: 0 }}>
            <div style={{ display: 'flex', flex: 1, height: "100%", flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <h1 style={{ marginLeft: 15 }}>Header Poc next JS</h1>
                <div style={{ display: 'flex', flex: 1, height: "100%", flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                    <li>
                        <Link href="/">
                            <a>Menu 1</a>
                        </Link>
                    </li>
                    <li style={{ paddingLeft: 10 }}>
                        <Link href="/">
                            <a>Menu 2</a>
                        </Link>
                    </li>

                </div>

            </div>
        </div>
    )
}
export default AdminHeader