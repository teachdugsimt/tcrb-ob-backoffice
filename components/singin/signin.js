import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import Router, { withRouter } from 'next/router'
import {
  WrapperImageBackgroundSignin, TextFooter, FooterText, BorderMainDiv, MainInput, SideWrapperMain, WrapperImageLogo,
  WrapLogo, WrapperButtonAnt, HeaderLogin, ContentMiddle, RowWrapButtonHeader, ColumnButtonHeader, RowTextCenter,
  SpanFirstLine, SpanSecondLine, ColMainInput, RowPadding, RowWidthMax, RowWidthMaxAndHidden, ColWidthMaxAndPaddingTop,
  ColWidthMax, SpanInputText, RowMarginTop, ButtonLogin, FooterMy
} from './styles/styles'
import { TcrbButton, TcrbPopconfirm, TcrbSpin } from '../antd-styles/styles'
import { Row, Col, Divider, Form, Input, Button, Checkbox } from 'antd';
import { Layout } from 'antd';
import { i18n, withTranslation } from '../../i18n'
import logo02 from '../../images/logo.png'
import background from './styles/background.png'
import login from '../../pages/login';

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
            // if (newPropsLogin.userProfile && newPropsLogin.userProfile.menus) {
            //   authenStore.setMenu(newPropsLogin.userProfile.menus)
            // } else { authenStore.setMenu(adminMenu) }
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
                <ColWidthMaxAndPaddingTop>
                  <Col><SpanFirstLine>“Being human in the digital world</SpanFirstLine></Col>
                  <Col><SpanSecondLine>is about building a digital world for humans”</SpanSecondLine></Col>
                </ColWidthMaxAndPaddingTop>
              </RowTextCenter>

              <RowWidthMaxAndHidden justify={"center"} align={"bottom"} >

                <BorderMainDiv align={"bottom"}>
                  <ColMainInput span={24} >

                    <RowPadding />
                    <RowWidthMax align={"middle"} justify={"center"} span={24}>
                      <RowWidthMax span={24}>
                        <Col span={12} offset={6} >

                          <Row span={24}>
                            <Col span={24}>
                              <SpanInputText style={{ color: colorID }}>{((t("username"))}</SpanInputText>
                              <MainInput value={id} onChange={e => {
                                if (id) setcolorID("#D3D3D3")
                                else setPassword("red")
                                setId(e.target.value)
                              }}></MainInput>
                            </Col>
                          </Row>

                          <RowMarginTop span={24}>
                            <Col span={24}>
                              <SpanInputText style={{ color: colorPass }}>{(t("password"))}</SpanInputText>
                              <MainInput type="password" value={password} onChange={e => {
                                if (password) setcolorPass("#D3D3D3")
                                else setPassword("red")
                                setPassword(e.target.value)
                              }}></MainInput>
                            </Col>
                          </RowMarginTop>

                          <RowMarginTop span={24} justify={'center'}>

                            {!loginStore.fetching_login && <ButtonLogin onClick={() => _submitForm()}>{t("submit")}</ButtonLogin>}
                            <TcrbSpin spinning={loginStore.fetching_login} size="large" tip="Loading..." >
                            </TcrbSpin>
                          </RowMarginTop>

                          <Row span={24} justify={'center'}>
                            <Col gutter={[8, 8]}>

                              {visible && loginStore.error_login && loginStore.error_login.code && <TcrbPopconfirm placement="top" title={loginStore.error_login.message}
                                onCancel={() => setvisible(false)} onConfirm={() => setvisible(false)} >
                                <a>{loginStore.error_login.code}</a>
                              </TcrbPopconfirm>}
                            </Col>
                          </Row>

                        </Col>
                      </RowWidthMax>
                    </RowWidthMax>
                  </ColMainInput>
                </BorderMainDiv>

              </RowWidthMaxAndHidden>
            </ContentMiddle>

            <FooterMy>
              <FooterText>{footName}</FooterText>
            </FooterMy>

          </Layout>

          <SideWrapperMain width={"20%"}>
            <WrapperImageBackgroundSignin src={background} />
          </SideWrapperMain>

        </Layout>

      )
    }))
export default withTranslation('common')(Signin)




