import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import Router, { withRouter } from 'next/router'
import {
  WrapperImageBackgroundSignin, TextFooter, FooterText, BorderMainDiv, MainInput, SideWrapperMain, WrapperImageLogo,
  WrapLogo, WrapperButtonAnt, HeaderLogin, ContentMiddle, RowWrapButtonHeader, ColumnButtonHeader, RowTextCenter
} from './styles/styles'
import { TcrbButton, TcrbPopconfirm, TcrbSpin } from '../antd-styles/styles'
import { Row, Col, Divider, Form, Input, Button, Checkbox } from 'antd';
import { Layout } from 'antd';
import { i18n, withTranslation } from '../../i18n'
const { Header, Footer, Sider, Content } = Layout;
import logo02 from '../../images/logo.png'
import background from './styles/background.png'
import login from '../../pages/login';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Signin =
  inject('authenStore', 'businessParametersSetupStore', 'loginStore')
    (observer((props) => {
      let customerMenu = [
        { key: 1, id: 1, name: "CUSTOMER SERVICES ENQUIRY", translate: "customerServicesEnquiry", linkTo: "/customer-service-enquiry", color: "#000000", typeLv: "42" },
        { key: 2, id: 2, name: "CUSTOMER SERVICES MENU", translate: "customerServiceMenu", linkTo: "/customer-service-menu", color: "#000000", typeLv: "38" },
        { key: 3, id: 3, name: "PARTNER MANAGEMENT", translate: "partnerManagement", linkTo: "/", color: "#000000", typeLv: "38" },
        { key: 4, id: 4, name: "CONSENT MANAGEMENT", translate: "consentManagement", linkTo: "/", color: "#000000", typeLv: "30" },
        { key: 5, id: 5, name: "TERM & CONDITION MANAGEMENT", translate: "term&conditionManagement", linkTo: "/", color: "#000000", typeLv: "30" },
        { key: 6, id: 6, name: "SECURITY CODE ENQUIRY", translate: "securityCodeEnquiry", linkTo: "/", color: "#000000", typeLv: "50" },
        { key: 7, id: 12, name: "BUSINESS PARAMETERS SETUP", translate: "businessParametersSetup", linkTo: "/parameters-setup", color: "#000000", typeLv: "42" },
        { key: 8, id: 13, name: "PENDING APPROVE", translate: "pendingApprove", linkTo: "/pending-approve", color: "#000000", typeLv: "42" },
      ]

      let adminMenu = [
        { key: 1, id: 1, name: "CUSTOMER SERVICES ENQUIRY", translate: "customerServicesEnquiry", linkTo: "/customer-service-enquiry", color: "#000000", typeLv: "42" },
        { key: 2, id: 2, name: "CUSTOMER SERVICES MENU", translate: "customerServiceMenu", linkTo: "/customer-service-menu", color: "#000000", typeLv: "38" },
        { key: 3, id: 3, name: "PARTNER MANAGEMENT", translate: "partnerManagement", linkTo: "/partner-mangement", color: "#000000", typeLv: "38" },
        { key: 4, id: 4, name: "PRODUCT ONBOARDING", translate: "productOnboarding", linkTo: "/product-onboarding", color: "#000000", typeLv: "38" },
        { key: 5, id: 5, name: "CONSENT MANAGEMENT", translate: "consentManagement", linkTo: "/", color: "#000000", typeLv: "30" },
        { key: 6, id: 6, name: "TERM & CONDITION MANAGEMENT", translate: "term&conditionManagement", linkTo: "/", color: "#000000", typeLv: "30" },
        { key: 7, id: 7, name: "SECURITY CODE ENQUIRY", translate: "securityCodeEnquiry", linkTo: "/", color: "#000000", typeLv: "50" },
        { key: 8, id: 8, name: "NOTIFICATION ENQUIRY", translate: "notificationEnquiry", linkTo: "/", color: "#000000", typeLv: "50" },
        { key: 9, id: 9, name: "BRANCH LOCATION ENQUIRY", translate: "branchLocation", linkTo: "/", color: "#000000", typeLv: "12" },
        { key: 10, id: 10, name: "LIVE CHAT ENQUIRY", translate: "liveChat", linkTo: "/", color: "#000000", typeLv: "12" },
        { key: 11, id: 11, name: "MARKETING ADS ENQUIRY", translate: "marketingAds", linkTo: "/", color: "#000000", typeLv: "12" },
        { key: 12, id: 12, name: "DASHBOARD & REPORTS", translate: "dashboardReports", linkTo: "/", color: "#000000", typeLv: "42" },
        { key: 13, id: 13, name: "BUSINESS PARAMETERS SETUP", translate: "businessParametersSetup", linkTo: "/parameters-setup", color: "#000000", typeLv: "42" },
        { key: 14, id: 14, name: "PENDING APPROVE", translate: "pendingApprove", linkTo: "/pending-approve", color: "#000000", typeLv: "42" },
        { key: 15, id: 15, name: "USER ACCESS MANAGEMENT ", translate: "useAccessManagementEnquiry", linkTo: "/user-access-management", color: "#000000", typeLv: "42" },
        { key: 16, id: 16, name: "DEVICE ENQUIRY", translate: "deviceEnquiry", linkTo: "/", color: "#000000", typeLv: "42" },
      ]

      let userMenu = [
        { key: 1, id: 1, name: "CUSTOMER SERVICES ENQUIRY", translate: "customerServicesEnquiry", linkTo: "/customer-service-enquiry", color: "#000000", typeLv: "42" },
        { key: 2, id: 2, name: "CUSTOMER SERVICES MENU", translate: "customerServiceMenu", linkTo: "/customer-service-menu", color: "#000000", typeLv: "38" },
        { key: 3, id: 12, name: "BUSINESS PARAMETERS SETUP", translate: "businessParametersSetup", linkTo: "/parameters-setup", color: "#000000", typeLv: "42" },
        { key: 4, id: 13, name: "PENDING APPROVE", translate: "pendingApprove", linkTo: "/pending-approve", color: "#000000", typeLv: "42" },
      ]

      // const { authenStore } = useStores()
      const { authenStore, businessParametersSetupStore, loginStore, t } = props
      const [id, setId] = useState("")
      const [password, setPassword] = useState("")
      const footName = authenStore.footName ? authenStore.footName : "IT SERVICE DESK CONTACT NUMBER IS 02-6xx-1234"
      const [colorID, setcolorID] = useState("#D3D3D3")
      const [colorPass, setcolorPass] = useState("#D3D3D3")
      const [visible, setvisible] = useState(false)
      useEffect(() => {
        i18n.changeLanguage("en")
        setcolorID("#D3D3D3")
        setcolorPass("#D3D3D3")
        return () => {
          // let newPropsLogin = JSON.parse(JSON.stringify(loginStore.data_login))
          // let newPropsLoginError = JSON.parse(JSON.stringify(loginStore.error_login))
          // if (newPropsLoginError && newPropsLoginError.code) {
          //   loginStore.clearCacheLogin("error")
          //   setvisible(true)
          // } else if (newPropsLogin && newPropsLogin.accessToken) {
          //   // Router.push("/")
          // }
          // cleanup
        }
      }, [])

      useEffect(() => {
        return () => {
        }
      }, [businessParametersSetupStore.dataAxios])

      useEffect(() => {
        let newPropsLogin = JSON.parse(JSON.stringify(loginStore.data_login))
        let newPropsLoginError = JSON.parse(JSON.stringify(loginStore.error_login))
        console.log("newPropsLogin", newPropsLogin)
        console.log("newPropsLoginError", newPropsLoginError)

        if (newPropsLoginError && newPropsLoginError.code) {
          setvisible(true)
        } else if (newPropsLogin) {
          setvisible(false)
          if (newPropsLogin.idToken) {
            authenStore.setMenu(adminMenu)
            console.log(JSON.parse(JSON.stringify(authenStore.menu)))
            Router.push("/")
          }
        }

        return () => {
          // if (newPropsLoginError && newPropsLoginError.code) {
          // console.log(":: CACHE WAS CLEAR :: ")
          // loginStore.clearCacheLogin("error")
          // loginStore.clearCacheLogin("success")
          //   setvisible(true)
          // } else if (newPropsLogin && newPropsLogin.accessToken) {
          //   Router.push("/")
          // }
        }
      }, [JSON.parse(JSON.stringify(loginStore.data_login)), JSON.parse(JSON.stringify(loginStore.error_login))])

      const _submitForm = async () => {
        if (!id || !password) {
          setcolorID("red")
          setcolorPass("red")
          alert("Please entry id & password")
        }
        else {
          authenStore.setProfile(id, password)
          authenStore.setType("50")
          let call_login = await loginStore.requestLogin({
            username: id, password
          })
          // if (id.includes("customer")) {
          //   authenStore.setMenu(customerMenu)
          // } else if (id.includes("admin")) {
          //   authenStore.setMenu(adminMenu)
          // } else {
          //   authenStore.setMenu(userMenu)
          // }
        }
      }

      return (

        <Layout style={{ width: "100%", height: "100%" }}>

          <Layout>
            <Row>
              <Col span={24}>
                <HeaderLogin>
                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Row justify="start" align="top">
                      <Col span="4" >
                        <WrapLogo>
                          <WrapperImageLogo src={logo02} />
                        </WrapLogo>
                      </Col>
                    </Row>
                    <RowWrapButtonHeader justify="end" align="center" >
                      <ColumnButtonHeader align="center">
                        <WrapperButtonAnt title={t("forNewWork")} />
                      </ColumnButtonHeader>
                      <Col align="center">
                        <WrapperButtonAnt title={t("support")} />
                      </Col>
                    </RowWrapButtonHeader>
                  </Row>
                </HeaderLogin>
              </Col>
            </Row>

            <ContentMiddle>

              <RowTextCenter justify={"center"}>
                <Col style={{ width: '100%', paddingTop: "5%" }}>
                  <Col><span style={{ fontSize: '3.3em', color: '#3C3A3A', marginLeft: '8%' }}>“Being human in the digital world</span></Col>
                  <Col><span style={{ fontSize: '3.3em', color: '#3C3A3A', marginLeft: '35%', position: 'absolute', zIndex: 100 }}>is about building a digital world for humans”</span></Col>
                </Col>
              </RowTextCenter>

              <Row justify={"center"} align={"bottom"} style={{ height: "100%", overflow: 'hidden' }}>

                <BorderMainDiv align={"bottom"} style={{ width: "70%", background: 'black' }}>
                  <Col span={24} style={{ height: '100%', marginTop: "2%" }}>

                    <Row style={{ height: 20 }}></Row>
                    <Row align={"middle"} justify={"center"} span={24} style={{ width: '100%' }}>
                      <Row span={24} style={{ width: '100%' }}>
                        <Col span={12} offset={6} >

                          <Row span={24}>
                            <Col span={24}>
                              <span style={{ marginLeft: 5, fontSize: '2em', color: colorID }}>{(id ? "" : "*") + " " + (t("username"))}</span>
                              <MainInput value={id} onChange={e => {
                                if (id) setcolorID("#D3D3D3")
                                else setPassword("red")
                                setId(e.target.value)
                              }}></MainInput>
                            </Col>
                          </Row>

                          <Row span={24} style={{ marginTop: "10%" }}>
                            <Col span={24}>
                              <span style={{ marginLeft: 5, fontSize: '2em', color: colorPass }}>{(password ? "" : "*") + " " + (t("password"))}</span>
                              <MainInput type="password" value={password} onChange={e => {
                                if (password) setcolorPass("#D3D3D3")
                                else setPassword("red")
                                setPassword(e.target.value)
                              }}></MainInput>
                            </Col>
                          </Row>

                          <Row span={24} justify={'center'} style={{ marginTop: "10%" }}>

                            <Button style={{ margin: 5, background: '#707070', color: 'white', borderRadius: 5, minHeight: 50, width: "50%", alignSelf: 'center', textAlign: 'center', fontSize: '2em' }} onClick={() => _submitForm()}>{t("submit")}</Button>
                            {visible && loginStore.error_login && loginStore.error_login.code && <TcrbPopconfirm placement="top" title={loginStore.error_login.message}
                              onCancel={() => setvisible(false)} onConfirm={() => setvisible(false)} >
                              <a>{loginStore.error_login.code}</a>
                            </TcrbPopconfirm>}
                          </Row>

                          <TcrbSpin spinning={loginStore.fetching_login} style={{ width: "100%", height: "100%" }} size="large" tip="Loading..." >
                          </TcrbSpin>

                        </Col>
                      </Row>
                    </Row>
                  </Col>
                </BorderMainDiv>

              </Row>
            </ContentMiddle>

            <Footer style={{ background: '#000000', minHeight: "5vh" }}>
              <FooterText>{footName}</FooterText>
            </Footer>

          </Layout>

          <SideWrapperMain width={"20%"} style={{ zIndex: 0, width: "100%", height: '100%' }}>
            <WrapperImageBackgroundSignin src={background} />
          </SideWrapperMain>

        </Layout>

      )
    }))
export default withTranslation('common')(Signin)




