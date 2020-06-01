import React, { Component } from 'react'

const AdminFooter = (props) => {
    return (
        <div style={{ display: "flex", flexDirection: 'column', justifyContent: 'flex-end', flex: 1, height: 60, background: 'lightgrey', position: "fixed", bottom: 0, left: 0,right: 0 }}>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: "100%" }}>
                Footer next JS Co.,Ltd since 1998
        </div>
        </div>
    )
}
export default AdminFooter