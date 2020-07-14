import styled from 'styled-components';
import { Row, Col, Divider, Form, Input, Button, Checkbox, Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const ImgBackgroundSignin = styled.img`
z-index: -1 !important;
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
width: 100%;
height: 100%;
background-repeat: no-repeat;
`;

const DivBackground = styled.div`
z-index: -1;
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
width: 100%;
height: 100%;
background-repeat: no-repeat;
`

const BorderMainDiv = styled(Row)`
height: 60% !important;
width: 70% !important;
background: black !important;
border-top-left-radius: 36px;
border-top-right-radius: 36px;
border-style: solid !important;
border-width: 1px 1px 0px 1px !important;
border-color: #707070 !important;
overflow: scroll;
`

const MainInput = styled.input`
margin: 5;
width: 100%;
color: white;
background: #707070;
background-color: #707070;
border-width: 0px 0px 1px 0px !important;
border-color: lightgrey !important;
min-height: 45px;
`

const MainWrapLogo = styled.div`
position: relative;
`

const WrapLogo = styled.div`
min-height: 7vh;
position: absolute;
top: 0;
left: 0;
bttom: 0;
`

const TextFooter = styled.span`
color: #ffffff;
padding-left: 10px;
font-weight: bold;
font-size: ${({ theme }) => theme.size.header}px;
`

const ImgLogo = styled.img`
aspect-ratio: 0.1;
height: 7vh;
`;

const FooterText = styled.span`
color: #ffffff;
padding-left: 0.5em;
font-weight: bold;
font-size: ${({ theme }) => theme.size.header}px;
`

const RowWrapButtonHeader = styled(Row)`
padding-left: 20% !important;
width: 100% !important;
`

const HeaderLogin = styled(Header)`
height: 8vh !important;
padding-left: 1.5% !important;
width: 100% !important;
background: #000000 !important;
`

const SideWrapperMain = styled(Sider)`
  .ant-layout-sider {
    min-width: 280px !important;
    max-width: 320px !important;
    width: 295px !important;
  }
  .ant-layout-sider-dark {
    min-width: 280px !important;
    max-width: 320px !important;
    width: 295px !important;
  }
`

const ColumnButtonHeader = styled(Col)`
margin-right: 2%;
`

const ContentMiddle = styled(Content)`

height: 100% !important;
background: rgb(0,0,0) !important;
background-image: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(62,62,62,1) 50%, rgba(112,112,112,1) 100%) !important;`

const WrapperImageLogo = (props) => {
  return <ImgLogo src={props.src} alt='logo' id='logoImage' />
}

const WrapperImageBackgroundSignin = (props) => {
  return <ImgBackgroundSignin src={props.src} alt='background-signin' id='backgorund-signin-image' />
}

const WrapperButtonAnt = (props) => {
  return <Button onClick={props.onClick} style={{ borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderRadius: 2.5, backgroundColor: "#1d1d1d", color: 'white', width: "100%", fontSize: 18, fontWeight: 'bold' }} > {props.title}</Button >
}

export {
  ImgBackgroundSignin,
  WrapperImageBackgroundSignin,
  BorderMainDiv,
  MainInput,
  DivBackground,
  WrapperImageLogo,
  WrapLogo,
  MainWrapLogo,
  WrapperButtonAnt,
  TextFooter,
  FooterText,
  SideWrapperMain,
  HeaderLogin,
  ContentMiddle,
  RowWrapButtonHeader,
  ColumnButtonHeader,
}
