import React, { Component, useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import Router, { withRouter } from 'next/router'
import {
  WrapperImageBackgroundSignin, TextFooter, FooterText, BorderMainDiv, MainInput, SideWrapperMain, WrapperImageLogo,
  WrapLogo, WrapperButtonAnt,
} from './styles/styles'
import { Row, Col, Divider, Form, Input, Button, Checkbox } from 'antd';
import { BusinessParameterSetupApi } from '../../services/'
import { Layout } from 'antd';
import { i18n, withTranslation } from '../../i18n'
const { Header, Footer, Sider, Content } = Layout;
import logo02 from './styles/logo02.png'
import background from './styles/background.png'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Signin =
  inject('authenStore', 'businessParametersSetupStore')
    (observer((props) => {
      let customerMenu = [
        { id: 1, name: "CUSTOMER SERVICES ENQUIRY", translate: "customerServicesEnquiry", linkTo: "/customer-service-enquiry", color: "#000000", typeLv: "42" },
        { id: 2, name: "CUSTOMER SERVICES MENU", translate: "customerServiceMenu", linkTo: "/customer-service-menu", color: "#000000", typeLv: "38" },
        { id: 3, name: "PARTNER MANAGEMENT", translate: "partnerManagement", linkTo: "/", color: "#000000", typeLv: "38" },
        { id: 4, name: "CONSENT MANAGEMENT", translate: "consentManagement", linkTo: "/", color: "#000000", typeLv: "30" },
        { id: 5, name: "TERM & CONDITION MANAGEMENT", translate: "term&conditionManagement", linkTo: "/", color: "#000000", typeLv: "30" },
        { id: 6, name: "SECURITY CODE ENQUIRY", translate: "securityCodeEnquiry", linkTo: "/", color: "#000000", typeLv: "50" },
        { id: 12, name: "BUSINESS PARAMETERS SETUP", translate: "businessParametersSetup", linkTo: "/parameters-setup", color: "#000000", typeLv: "42" },
      ]

      let adminMenu = [
        { id: 1, name: "CUSTOMER SERVICES ENQUIRY", translate: "customerServicesEnquiry", linkTo: "/customer-service-enquiry", color: "#000000", typeLv: "42" },
        { id: 2, name: "CUSTOMER SERVICES MENU", translate: "customerServiceMenu", linkTo: "/customer-service-menu", color: "#000000", typeLv: "38" },
        { id: 3, name: "PARTNER MANAGEMENT", translate: "partnerManagement", linkTo: "/", color: "#000000", typeLv: "38" },
        { id: 4, name: "CONSENT MANAGEMENT", translate: "consentManagement", linkTo: "/", color: "#000000", typeLv: "30" },
        { id: 5, name: "TERM & CONDITION MANAGEMENT", translate: "term&conditionManagement", linkTo: "/", color: "#000000", typeLv: "30" },
        { id: 6, name: "SECURITY CODE ENQUIRY", translate: "securityCodeEnquiry", linkTo: "/", color: "#000000", typeLv: "50" },
        { id: 7, name: "NOTIFICATION ENQUIRY", translate: "notificationEnquiry", linkTo: "/", color: "#000000", typeLv: "50" },
        { id: 8, name: "BRANCH LOCATION ENQUIRY", translate: "branchLocation", linkTo: "/", color: "#000000", typeLv: "12" },
        { id: 9, name: "LIVE CHAT ENQUIRY", translate: "liveChat", linkTo: "/", color: "#000000", typeLv: "12" },
        { id: 10, name: "MARKETING ADS ENQUIRY", translate: "marketingAds", linkTo: "/", color: "#000000", typeLv: "12" },
        { id: 11, name: "DASHBOARD & REPORTS", translate: "dashboardReports", linkTo: "/", color: "#000000", typeLv: "42" },
        { id: 12, name: "BUSINESS PARAMETERS SETUP", translate: "businessParametersSetup", linkTo: "/parameters-setup", color: "#000000", typeLv: "42" },
        { id: 13, name: "USER ACCESS MANAGEMENT ENQUIRY", translate: "useAccessManagementEnquiry", linkTo: "/", color: "#000000", typeLv: "42" },
        { id: 14, name: "DEVICE ENQUIRY", translate: "deviceEnquiry", linkTo: "/", color: "#000000", typeLv: "42" },
      ]

      let userMenu = [
        { id: 1, name: "CUSTOMER SERVICES ENQUIRY", translate: "customerServicesEnquiry", linkTo: "/customer-service-enquiry", color: "#000000", typeLv: "42" },
        { id: 2, name: "CUSTOMER SERVICES MENU", translate: "customerServiceMenu", linkTo: "/customer-service-menu", color: "#000000", typeLv: "38" },
        { id: 12, name: "BUSINESS PARAMETERS SETUP", translate: "businessParametersSetup", linkTo: "/parameters-setup", color: "#000000", typeLv: "42" },
      ]

      // const { authenStore } = useStores()
      const { authenStore, businessParametersSetupStore } = props
      const [id, setId] = useState("")
      const [password, setPassword] = useState("")
      const footName = authenStore.footName ? authenStore.footName : "IT SERVICE DESK CONTACT NUMBER IS 02-6xx-1234"

      useEffect(() => {
        const response = businessParametersSetupStore.getDataByAxios({
          otpParamsField: "OTP_EXPIRE_TIME,OTP_MAXIMUM_ENTERED,OTP_TOKEN_EXPIRE_TIME"
        })
        console.log("response axios :: ", response)
        return () => {
          // cleanup
        }
      }, [])

      useEffect(() => {
        // getDataByAxios
        return () => {
        }
      }, [businessParametersSetupStore.dataAxios])

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
        <Layout style={{ width: "100%", height: "100%" }}>
          <Layout>

            <Header style={{ height: 100, paddingLeft: 0, width: '100%', background: '#000000' }}>
              <Row style={{ width: '100%' }}>
                <Row justify="start" align="top">
                  <Col span="4" >
                    <WrapLogo>
                      <WrapperImageLogo src={logo02} />
                    </WrapLogo>
                  </Col>
                </Row>
                <Row justify="end" align="center" style={{ paddingLeft: "20%", width: '100%' }}>
                  <Col style={{ marginRight: 20 }} align="center">
                    <WrapperButtonAnt title={i18n.t("forNewWork")} />
                  </Col>
                  <Col align="center">
                    <WrapperButtonAnt title={i18n.t("support")} />
                  </Col>
                </Row>
              </Row>
            </Header>

            <Content style={{ height: "100%", background: "rgb(0,0,0)", backgroundImage: "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(62,62,62,1) 50%, rgba(112,112,112,1) 100%)" }}>

              <Row justify={"center"} style={{ position: 'absolute', left: 0, right: 0, marginLeft: 'auto', marginRight: 'auto', width: '100%' }}>
                <Col style={{ width: '100%' }}>
                  <Col><h1 style={{ fontSize: '3.3rem', color: '#3C3A3A', marginLeft: '4%' }}>“Being human in the digital world</h1></Col>
                  <Col><h1 style={{ fontSize: '3.3rem', color: '#3C3A3A', marginLeft: '25%', position: 'absolute', zIndex: 100 }}>is about building a digital world for humans”</h1></Col>
                </Col>
              </Row>

              <Row justify={"center"} align={"bottom"} style={{ height: "100%", overflow: 'hidden' }}>
                <BorderMainDiv align={"bottom"} style={{ width: "70%", background: 'black' }}>
                  <Col span={24} style={{ height: '100%', marginTop: "2%" }}>

                    <Row style={{ height: 20 }}></Row>
                    <Row align={"middle"} justify={"center"} span={24} style={{ width: '100%' }}>
                      <Row span={24} style={{ width: '100%' }}>
                        <Col span={12} offset={6} >

                          <Row span={24}>
                            <Col span={24}>
                              <h1 style={{ marginLeft: 5, fontSize: '2rem', color: id ? '#3E3E3E' : 'red' }}>{(id ? "" : "*") + " " + (i18n.t("username"))}</h1>
                              <MainInput value={id} onChange={e => setId(e.target.value)}></MainInput>
                            </Col>
                          </Row>

                          <Row span={24} style={{ marginTop: "10%" }}>
                            <Col span={24}>
                              <h1 style={{ marginLeft: 5, fontSize: '2rem', color: password ? '#3E3E3E' : 'red' }}>{(password ? "" : "*") + " " + (i18n.t("password"))}</h1>
                              <MainInput type="password" value={password} onChange={e => setPassword(e.target.value)}></MainInput>
                            </Col>
                          </Row>

                          <Row span={24} justify={'center'} style={{ marginTop: "15%" }}>
                            <Button style={{ margin: 5, background: '#707070', color: 'white', borderRadius: 5, minHeight: 50, width: "50%", alignSelf: 'center', textAlign: 'center', fontSize: '1.8rem' }} onClick={() => _submitForm()}>{i18n.t("submit")}</Button>
                          </Row>
                        </Col>
                      </Row>
                    </Row>
                  </Col>
                </BorderMainDiv>
              </Row>
            </Content>


            <Footer style={{ background: '#000000', minHeight: 60 }}>
              <FooterText>{footName}</FooterText>
            </Footer>
          </Layout>

          {/* <div style={{ minWidth: 320, maxWidth: 320, width: 320, zIndex: 0 }}> */}
          <SideWrapperMain width={"20%"} style={{ zIndex: 0, width: "100%", height: '100%' }}>
            <WrapperImageBackgroundSignin src={background} />
          </SideWrapperMain>
          {/* </div> */}
        </Layout>
      )
    }))
export default (Signin)









// HTTPS=true SSL_CRT_FILE=Certificate_chain.txt SSL_KEY_FILE=private_key.txt npm run dev

 // <Row span={24} justify={"center"} align={"middle"} style={{ height: "100%" }}>
        //   {/* <WrapperImageBackgroundSignin src={Background} /> */}

        //   <DivBackground>
        //     <linearGradient id="linear-gradient" gradientUnits="userSpaceOnUse" x1="1041.6901" y1="169.485" x2="1383.9301" y2="169.485" gradientTransform="matrix(1 0 0 -1 -761.14 398.97)">
        //       <stop offset="14%" stopColor="#2f343b" stopOpacity="0%" />
        //       <stop offset="43%" stopColor="#337082" stopOpacity="41%" />
        //       <stop offset="67%" stopColor="#369fb9" stopOpacity="73%" />
        //       <stop offset="79%" stopColor="#37b1cf" stopOpacity="85%" />
        //     </linearGradient>
        //   </DivBackground>

        //   <BorderMainDiv style={{ height: "55%", width: "70%", background: 'black', overflow: 'scroll' }}>

            // <Col span={24} style={{ height: '100%', marginTop: "7%" }}>
            //   <h1 style={{ color: 'white', textAlign: 'center' }}>“Being human in the digital world</h1>
            //   <h1 style={{ color: 'white', textAlign: 'center' }}>
            //     is about building a digital world for humans”
            //   </h1>
            //   <Row style={{ height: 20 }}></Row>
            //   <Row align={"middle"} justify={"center"} span={24} style={{ width: '100%' }}>
            //     <Row span={24} style={{ width: '100%' }}>
            //       <Col span={12} offset={6} >

            //         <Row span={24}>
            //           <Col span={24}>
            //             <h2 style={{ marginLeft: 5, color: id ? 'lightgrey' : 'red' }}>{(id ? "" : "*") + " " + "username"}</h2>
            //             <MainInput value={id} onChange={e => setId(e.target.value)}></MainInput>
            //           </Col>
            //         </Row>

            //         <Row span={24} style={{ marginTop: 20 }}>
            //           <Col span={24}>
            //             <h2 style={{ marginLeft: 5, color: password ? 'lightgrey' : 'red' }}>{(password ? "" : "*") + " " + "password"}</h2>
            //             <MainInput type="password" value={password} onChange={e => setPassword(e.target.value)}></MainInput>
            //           </Col>
            //         </Row>

            //         <Row span={24} justify={'center'} style={{ marginTop: 20 }}>
            //           <Button style={{ margin: 5, background: '#707070', color: 'white', borderRadius: 5, width: "50%", alignSelf: 'center', textAlign: 'center' }} onClick={() => _submitForm()}>Login</Button>
            //         </Row>
            //       </Col>
            //     </Row>

            //   </Row>
            // </Col>

        //   </BorderMainDiv>

        // </Row >



















// import React, { Component, useState, useContext } from 'react'
// import { inject, observer } from 'mobx-react'
// import Router, { withRouter } from 'next/router'
// import Background from '../../images/background.png'
// import Logo from '../../images/logo02.png'
// import { WrapperImageBackgroundSignin } from './styles/styles'
// import { Row, Col, Divider, Form, Input, Button, Checkbox } from 'antd';

// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 16 },
// };
// const tailLayout = {
//   wrapperCol: { offset: 8, span: 16 },
// };

// const Signin =
//   inject('authenStore')
//     (observer((props) => {

//       let customerMenu = [
//         { id: 1, name: "CUSTOMER SERVICES ENQUIRY", translate: "customerServicesEnquiry", linkTo: "/customer-service-enquiry", color: "#000000", typeLv: "42" },
//         { id: 2, name: "CUSTOMER SERVICES MENU", translate: "customerServiceMenu", linkTo: "/customer-service-menu", color: "#000000", typeLv: "38" },
//         { id: 3, name: "PARTNER MANAGEMENT", translate: "partnerManagement", linkTo: "/", color: "#000000", typeLv: "38" },
//         { id: 4, name: "CONSENT MANAGEMENT", translate: "consentManagement", linkTo: "/", color: "#000000", typeLv: "30" },
//         { id: 5, name: "TERM & CONDITION MANAGEMENT", translate: "term&conditionManagement", linkTo: "/", color: "#000000", typeLv: "30" },
//         { id: 6, name: "SECURITY CODE ENQUIRY", translate: "securityCodeEnquiry", linkTo: "/", color: "#000000", typeLv: "50" },
//         { id: 12, name: "BUSINESS PARAMETERS SETUP", translate: "businessParametersSetup", linkTo: "/parameters-setup", color: "#000000", typeLv: "42" },
//       ]

//       let adminMenu = [
//         { id: 1, name: "CUSTOMER SERVICES ENQUIRY", translate: "customerServicesEnquiry", linkTo: "/customer-service-enquiry", color: "#000000", typeLv: "42" },
//         { id: 2, name: "CUSTOMER SERVICES MENU", translate: "customerServiceMenu", linkTo: "/customer-service-menu", color: "#000000", typeLv: "38" },
//         { id: 3, name: "PARTNER MANAGEMENT", translate: "partnerManagement", linkTo: "/", color: "#000000", typeLv: "38" },
//         { id: 4, name: "CONSENT MANAGEMENT", translate: "consentManagement", linkTo: "/", color: "#000000", typeLv: "30" },
//         { id: 5, name: "TERM & CONDITION MANAGEMENT", translate: "term&conditionManagement", linkTo: "/", color: "#000000", typeLv: "30" },
//         { id: 6, name: "SECURITY CODE ENQUIRY", translate: "securityCodeEnquiry", linkTo: "/", color: "#000000", typeLv: "50" },
//         { id: 7, name: "NOTIFICATION ENQUIRY", translate: "notificationEnquiry", linkTo: "/", color: "#000000", typeLv: "50" },
//         { id: 8, name: "BRANCH LOCATION ENQUIRY", translate: "branchLocation", linkTo: "/", color: "#000000", typeLv: "12" },
//         { id: 9, name: "LIVE CHAT ENQUIRY", translate: "liveChat", linkTo: "/", color: "#000000", typeLv: "12" },
//         { id: 10, name: "MARKETING ADS ENQUIRY", translate: "marketingAds", linkTo: "/", color: "#000000", typeLv: "12" },
//         { id: 11, name: "DASHBOARD & REPORTS", translate: "dashboardReports", linkTo: "/", color: "#000000", typeLv: "42" },
//         { id: 12, name: "BUSINESS PARAMETERS SETUP", translate: "businessParametersSetup", linkTo: "/parameters-setup", color: "#000000", typeLv: "42" },
//         { id: 13, name: "USER ACCESS MANAGEMENT ENQUIRY", translate: "useAccessManagementEnquiry", linkTo: "/", color: "#000000", typeLv: "42" },
//         { id: 14, name: "DEVICE ENQUIRY", translate: "deviceEnquiry", linkTo: "/", color: "#000000", typeLv: "42" },
//       ]

//       let userMenu = [
//         { id: 1, name: "CUSTOMER SERVICES ENQUIRY", translate: "customerServicesEnquiry", linkTo: "/customer-service-enquiry", color: "#000000", typeLv: "42" },
//         { id: 2, name: "CUSTOMER SERVICES MENU", translate: "customerServiceMenu", linkTo: "/customer-service-menu", color: "#000000", typeLv: "38" },
//         { id: 12, name: "BUSINESS PARAMETERS SETUP", translate: "businessParametersSetup", linkTo: "/parameters-setup", color: "#000000", typeLv: "42" },
//       ]

//       // const { authenStore } = useStores()
//       const { authenStore } = props
//       const [id, setId] = useState("")
//       const [password, setPassword] = useState("")

//       const _submitForm = () => {
//         if (!id && !password) alert("Please entry id & password")
//         else {
//           authenStore.setProfile(id, password)
//           authenStore.setType("50")
//           if (id.includes("customer")) {
//             authenStore.setMenu(customerMenu)
//           } else if (id.includes("admin")) {
//             authenStore.setMenu(adminMenu)
//           } else {
//             authenStore.setMenu(userMenu)
//           }
//           Router.push("/")
//         }
//       }

//       const onFinish = values => {
//         console.log('Success:', values);
//       };

//       const onFinishFailed = errorInfo => {
//         console.log('Failed:', errorInfo);
//       };

//       return (
//         <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: "100%", height: "100%" }}>
//           <WrapperImageBackgroundSignin src={Background} />

//           <Row style={{ height: "55%", width: "70%", background: 'white' }}>

//             <Col span={16} style={{ height: '100%' }}>
//               <h1 style={{ color: '#333', fontWeight: 'bold', fontSize: 24, textAlign: 'center', alignSelf: 'center', marginTop: 20 }}>
//                 Partner Portal
//               </h1>
//               <Row style={{ height: 20 }}></Row>
//               <Row align={"middle"} justify={"center"} span={24} style={{ width: '100%' }}>
//                 <Row span={24} style={{ width: '100%' }}>
//                   <Col span={12} offset={6} >

//                     <Row span={24}>
//                       <Col span={24}>
//                         <h2 style={{ marginLeft: 5, color: id ? "black" : "red" }}>{(id ? "" : "*") + " " + "Username"}</h2>
//                         <input style={{ margin: 5, width: '100%', marginTop: -7.5 }} value={id} onChange={e => setId(e.target.value)}></input>
//                       </Col>
//                     </Row>

//                     <Row span={24} style={{ marginTop: 20 }}>
//                       <Col span={24}>
//                         <h2 style={{ marginLeft: 5, color: password ? 'black' : 'red' }}>{(password ? "" : "*") + " " + "Password"}</h2>
//                         <input type="password" style={{ margin: 5, width: '100%', marginTop: -7.5 }} value={password} onChange={e => setPassword(e.target.value)}></input>
//                       </Col>
//                     </Row>

//                     <Row span={24} justify={'center'} style={{ marginTop: 20 }}>
//                       <Button style={{ margin: 5, background: 'black', color: 'white', borderRadius: 5, width: "50%", alignSelf: 'center', textAlign: 'center' }} onClick={() => _submitForm()}>Login</Button>
//                     </Row>
//                   </Col>
//                 </Row>

//               </Row>
//             </Col>

//             <Col span={8} style={{ background: 'black' }}>

//             </Col>

//           </Row>

//         </div >
//       )
//     }))
// export default (Signin)
