import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import CircleButton from '../components/button-circle/circle-button'
// import Link from 'next/link'
import { TcrbButton } from '../components/antd-styles/styles'
import { i18n, Link, withTranslation } from '../i18n'

const index =
  inject('counterStore', 'authenStore', 'loginStore')
    (observer((props) => {
      const [id, setId] = useState("")
      const [password, setPassword] = useState("")
      const { authenStore, loginStore, t } = props

      useEffect(() => {
        let loginProps = JSON.parse(JSON.stringify(loginStore.data_signin))
        console.log("Index Props screen :: ", loginProps)
        console.log(JSON.parse(JSON.stringify(authenStore.menu)))
      }, [JSON.parse(JSON.stringify(loginStore.data_signin))])

      return <div>
        <h1 style={{ color: 'red' }}>{authenStore.id ? "ID :" + authenStore.id : ""}</h1>
        <h1 style={{ color: 'red' }}>{authenStore.password ? "Password : " + authenStore.password : ""}</h1>
      </div>
    }))

index.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withTranslation('common')(index)







// import React from 'react';
// import Link from 'next/link.js';
// import axios from 'axios';
// import { Cookies } from 'react-cookie';
// const domain = `https://${api_gw_id || "dwl8p0fxml"}-${vpc_id || "vpce-03ae60b10934425db"}.execute-api.ap-southeast-1.amazonaws.com/`
// const pathApi = 'api/backoffice/v1/signin'
// const serverUrl = 'http://localhost:3001';

// // set up cookies
// const cookies = new Cookies();
// class Index extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       token: cookies.get('token') || null
//     }
//   }

//   onLoginClick = async () => {
//     console.log("Login called");
//     const response = await axios.get(domain + pathApi)
//     const token = response.data.responseData.idToken;
//     cookies.set('token', token);
//     this.setState({
//       token: token
//     })
//   }

//   render() {
//     return (
//       <div>
//         <h2>Main page</h2>
//         <br></br>
//         <button onClick={() => this.onLoginClick()}>Get Token</button>
//         <br></br>
//         <p>Token: {this.state.token}</p>
//         <br></br>
//         <Link href="/secret">
//           <a>Secret page</a>
//         </Link>
//       </div >
//     )
//   }
// }

// export default Index;
