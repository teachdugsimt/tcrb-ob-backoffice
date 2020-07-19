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
// import jsCookie from 'js-cookie';
import { Cookies } from 'react-cookie';

const Signin =
  inject('authenStore', 'businessParametersSetupStore', 'loginStore')
    (observer((props) => {

      // const { authenStore } = useStores()
      const { authenStore, businessParametersSetupStore, loginStore, t } = props
      const [id, setId] = useState("")
      const [password, setPassword] = useState("")
      const footName = authenStore.footName ? authenStore.footName : "IT SERVICE DESK CONTACT NUMBER IS 02-6xx-1234"
      const [colorID, setcolorID] = useState("#D3D3D3")
      const [colorPass, setcolorPass] = useState("#D3D3D3")
      const [visible, setvisible] = useState(false)
      const cookies = new Cookies();
      const token = cookies.get('token') || null


      useEffect(() => {
        i18n.changeLanguage("en")
        setcolorID("#D3D3D3")
        setcolorPass("#D3D3D3")
        return () => {

        }
      }, [])

      useEffect(() => {
        let newPropsLogin = JSON.parse(JSON.stringify(loginStore.data_signin))
        let newPropsLoginError = JSON.parse(JSON.stringify(loginStore.error_login))
        let newPropsProfile = JSON.parse(JSON.stringify(loginStore.profile))
        if (newPropsLoginError && newPropsLoginError.code) {
          setvisible(true)
        } else if (newPropsLogin) {
          setvisible(false)
          if (newPropsLogin.idToken) {

            // jsCookie.set('token', newPropsLogin.idToken)
            cookies.set('token', newPropsLogin.idToken);
            if (newPropsProfile) {
              cookies.set('menus', JSON.stringify(newPropsProfile))
            }
            console.log(cookies.get('token'))
            Router.push("/")
          }
        }

        return () => {

        }
      }, [JSON.parse(JSON.stringify(loginStore.data_signin)), JSON.parse(JSON.stringify(loginStore.error_login))])

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
        }
      }

      return (

        // <Row style={{ width: "100%", height: "100%" }}>

        //   {/* // ************************ HEADER ZONE  */}
        //   <Row style={{ width: "100%", background: 'red', height: '9%' }}>
        //     <Col span={24}>
        //       Header
        //     </Col>
        //   </Row>
        //   {/* // ************************ HEADER ZONE  */}


        //   <Row style={{ width: "100%", height: '87%' }}>


        //     {/* // ************************ BODY ZONE */}
        //     <Col span={19} style={{ background: 'blue', height: '100%' }}>

        //       <Row style={{ height: '100%' }} align={'middle'}>
        //         <Col span={6} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 4 }}>
        //           1 col-order-esponsive
        //         </Col>
        //         <Col span={6} xs={{ order: 2 }} sm={{ order: 1 }} md={{ order: 4 }} lg={{ order: 3 }}>
        //           2 col-order-esponsive
        //       </Col>
        //         <Col span={6} xs={{ order: 3 }} sm={{ order: 4 }} md={{ order: 2 }} lg={{ order: 1 }}>
        //           3 col-order-esponsive
        //       </Col>
        //         <Col span={6} xs={{ order: 4 }} sm={{ order: 3 }} md={{ order: 1 }} lg={{ order: 2 }}>
        //           4 col-order-esponsive
        //       </Col>

        //       </Row>
        //     </Col>
        //     {/* // ************************ BODY ZONE */}


        //     {/* // ************************ Right Bar ZONE */}
        //     <Col span={5} style={{ background: 'green' }}>
        //       col-18 col-push-6
        //     </Col>
        //     {/* // ************************ Right Bar ZONE */}


        //   </Row>


        //   {/* // ************************ BOTTOM ZONE  */}
        //   <Row style={{ width: "100%", background: 'red', height: '4%' }}>
        //     <Row style={{ width: "100%", background: 'red', height: '100%' }} align={'middle'}>
        //       <Col span={24}  style={{ background: '#000000', paddingTop: '2%', paddingBottom: '2%', paddingLeft: '2%' }}>
        //         <FooterText>{footName}</FooterText>
        //       </Col>
        //     </Row>
        //   </Row>
        //   {/* // ************************ BOTTOM ZONE  */}

        // </Row>


















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
                              <SpanInputText style={{ color: colorID }}>{t("username")}</SpanInputText>
                              <MainInput value={id} onChange={e => {
                                // if (id) setcolorID("#D3D3D3")
                                // else setPassword("red")
                                setId(e.target.value)
                              }}></MainInput>
                            </Col>
                          </Row>

                          <RowMarginTop span={24}>
                            <Col span={24}>
                              <SpanInputText style={{ color: colorPass }}>{(t("password"))}</SpanInputText>
                              <MainInput type="password" value={password} onChange={e => {
                                // if (password) setcolorPass("#D3D3D3")
                                // else setPassword("red")
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










































// import React, { useState, useEffect } from 'react'
// import { inject, observer } from 'mobx-react'
// import Router, { withRouter } from 'next/router'
// import {
//   WrapperImageBackgroundSignin, TextFooter, FooterText, BorderMainDiv, MainInput, SideWrapperMain, WrapperImageLogo,
//   WrapLogo, WrapperButtonAnt, HeaderLogin, ContentMiddle, RowWrapButtonHeader, ColumnButtonHeader, RowTextCenter,
//   SpanFirstLine, SpanSecondLine, ColMainInput, RowPadding, RowWidthMax, RowWidthMaxAndHidden, ColWidthMaxAndPaddingTop,
//   ColWidthMax, SpanInputText, RowMarginTop, ButtonLogin, FooterMy
// } from './styles/styles'
// import { TcrbButton, TcrbPopconfirm, TcrbSpin } from '../antd-styles/styles'
// import { Row, Col, Divider, Form, Input, Button, Checkbox } from 'antd';
// import { Layout } from 'antd';
// import { i18n, withTranslation } from '../../i18n'
// import logo02 from '../../images/logo.png'
// import background from './styles/background.png'
// // import jsCookie from 'js-cookie';
// import { Cookies } from 'react-cookie';
// const Signin =
//   inject('authenStore', 'businessParametersSetupStore', 'loginStore')
//     (observer((props) => {

//       // const { authenStore } = useStores()
//       const { authenStore, businessParametersSetupStore, loginStore, t } = props
//       const [id, setId] = useState("")
//       const [password, setPassword] = useState("")
//       const footName = authenStore.footName ? authenStore.footName : "IT SERVICE DESK CONTACT NUMBER IS 02-6xx-1234"
//       const [colorID, setcolorID] = useState("#D3D3D3")
//       const [colorPass, setcolorPass] = useState("#D3D3D3")
//       const [visible, setvisible] = useState(false)
//       const cookies = new Cookies();
//       const token = cookies.get('token') || null
//       useEffect(() => {
//         i18n.changeLanguage("en")
//         setcolorID("#D3D3D3")
//         setcolorPass("#D3D3D3")
//         return () => {

//         }
//       }, [])

//       useEffect(() => {
//         let newPropsLogin = JSON.parse(JSON.stringify(loginStore.data_signin))
//         let newPropsLoginError = JSON.parse(JSON.stringify(loginStore.error_login))
//         let newPropsProfile = JSON.parse(JSON.stringify(loginStore.profile))
//         if (newPropsLoginError && newPropsLoginError.code) {
//           setvisible(true)
//         } else if (newPropsLogin) {
//           setvisible(false)
//           if (newPropsLogin.idToken) {

//             // jsCookie.set('token', newPropsLogin.idToken)
//             cookies.set('token', newPropsLogin.idToken);
//             if(newPropsProfile){
//               cookies.set('menus', JSON.stringify(newPropsProfile))
//             }
//             console.log(cookies.get('token'))
//             Router.push("/")
//           }
//         }

//         return () => {

//         }
//       }, [JSON.parse(JSON.stringify(loginStore.data_signin)), JSON.parse(JSON.stringify(loginStore.error_login))])

//       const _submitForm = async () => {
//         if (!id || !password) {
//           setcolorID("red")
//           setcolorPass("red")
//           alert("Please entry id & password")
//         }
//         else {
//           authenStore.setProfile(id, password)
//           authenStore.setType("50")
//           let call_login = await loginStore.requestLogin({
//             username: id, password
//           })
//         }
//       }

//       return (

//         <Layout style={{ width: "100%", height: "100%" }}>

//           <Layout>
//             <Row>
//               <Col span={24}>
//                 <HeaderLogin>
//                   <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
//                     <Row justify="start" align="top">
//                       <Col span="4" >
//                         <WrapLogo>
//                           <WrapperImageLogo src={logo02} />
//                         </WrapLogo>
//                       </Col>
//                     </Row>
//                     <RowWrapButtonHeader justify="end" align="center" >
//                       <ColumnButtonHeader align="center">
//                         <WrapperButtonAnt title={t("forNewWork")} />
//                       </ColumnButtonHeader>
//                       <Col align="center">
//                         <WrapperButtonAnt title={t("support")} />
//                       </Col>
//                     </RowWrapButtonHeader>
//                   </Row>
//                 </HeaderLogin>
//               </Col>
//             </Row>

//             <ContentMiddle>

//               <RowTextCenter justify={"center"}>
//                 <ColWidthMaxAndPaddingTop>
//                   <Col><SpanFirstLine>“Being human in the digital world</SpanFirstLine></Col>
//                   <Col><SpanSecondLine>is about building a digital world for humans”</SpanSecondLine></Col>
//                 </ColWidthMaxAndPaddingTop>
//               </RowTextCenter>

//               <RowWidthMaxAndHidden justify={"center"} align={"bottom"} >

//                 <BorderMainDiv align={"bottom"}>
//                   <ColMainInput span={24} >

//                     <RowPadding />
//                     <RowWidthMax align={"middle"} justify={"center"} span={24}>
//                       <RowWidthMax span={24}>
//                         <Col span={12} offset={6} >

//                           <Row span={24}>
//                             <Col span={24}>
//                               <SpanInputText style={{ color: colorID }}>{t("username")}</SpanInputText>
//                               <MainInput value={id} onChange={e => {
//                                 // if (id) setcolorID("#D3D3D3")
//                                 // else setPassword("red")
//                                 setId(e.target.value)
//                               }}></MainInput>
//                             </Col>
//                           </Row>

//                           <RowMarginTop span={24}>
//                             <Col span={24}>
//                               <SpanInputText style={{ color: colorPass }}>{(t("password"))}</SpanInputText>
//                               <MainInput type="password" value={password} onChange={e => {
//                                 // if (password) setcolorPass("#D3D3D3")
//                                 // else setPassword("red")
//                                 setPassword(e.target.value)
//                               }}></MainInput>
//                             </Col>
//                           </RowMarginTop>

//                           <RowMarginTop span={24} justify={'center'}>

//                             {!loginStore.fetching_login && <ButtonLogin onClick={() => _submitForm()}>{t("submit")}</ButtonLogin>}
//                             <TcrbSpin spinning={loginStore.fetching_login} size="large" tip="Loading..." >
//                             </TcrbSpin>
//                           </RowMarginTop>

//                           <Row span={24} justify={'center'}>
//                             <Col gutter={[8, 8]}>

//                               {visible && loginStore.error_login && loginStore.error_login.code && <TcrbPopconfirm placement="top" title={loginStore.error_login.message}
//                                 onCancel={() => setvisible(false)} onConfirm={() => setvisible(false)} >
//                                 <a>{loginStore.error_login.code}</a>
//                               </TcrbPopconfirm>}
//                             </Col>
//                           </Row>

//                         </Col>
//                       </RowWidthMax>
//                     </RowWidthMax>
//                   </ColMainInput>
//                 </BorderMainDiv>

//               </RowWidthMaxAndHidden>
//             </ContentMiddle>

//             <FooterMy>
//               <FooterText>{footName}</FooterText>
//             </FooterMy>

//           </Layout>

//           <SideWrapperMain width={"20%"}>
//             <WrapperImageBackgroundSignin src={background} />
//           </SideWrapperMain>

//         </Layout>

//       )
//     }))
// export default withTranslation('common')(Signin)












