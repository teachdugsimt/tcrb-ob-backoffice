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
border-top-left-radius: 36px !important;
border-top-right-radius: 36px !important;
border-style: solid !important;
border-width: 1px 1px 0px 1px !important;
border-color: #707070 !important;
overflow: scroll !important;
width: 70% !important;
background: black !important;
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

const RowTextCenter =styled(Row)`
position: absolute !important;
left: 0 !important;
right: 0 !important;
margin-left: auto !important;
margin-right: auto !important;
width: 100% !important;
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
z-index: 1;
width: 100% !important;
height: 100% !important;

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
margin-right: 2% !important;;
`

const ContentMiddle = styled(Content)`
height: 100% !important;
background: rgb(0,0,0) !important;
background-image: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(62,62,62,1) 50%, rgba(112,112,112,1) 100%) !important;`

const SpanFirstLine = styled.span`
font-size: 3.3em;
color: #3C3A3A;
margin-left: 8% ;
`

const SpanSecondLine = styled.span`
font-size: 3.3em;
color: #3C3A3A;
margin-left: 35%;
position: absolute;
z-index: 100 ;
`

const ColWidthMax = styled(Col)`
width: 100% !important;
`

const ColWidthMaxAndPaddingTop = styled(ColWidthMax)`
padding-top: 5% !important;
`

const ColMainInput = styled(Col)`
height: 100% !important;
margin-top: 2% !important;
`

const RowPadding = styled(Row)`
height: 20px !important;
`

const RowWidthMax = styled(Row)`
height: 100% !important;
width: 100% !important;
`

const RowWidthMaxAndHidden = styled(Row)`
height: 100% !important;
overflow: hidden !important;
`

const SpanInputText = styled.span`
margin-left: 5px;
font-size: 2em;
`

const RowMarginTop = styled(Row)`
margin-top: 10% !important;
`

const ButtonLogin = styled(Button)`
margin: 5px !important;
background: #707070 !important;
color: white !important;
border-radius: 5px !important;
min-height: 50px !important;
width: 50% !important;
align-self: center !important;
text-align: center !important;
font-size: 2em  !important;
`

const FooterMy = styled(Footer)`
background-color: #000000 !important;
min-height: 50px !important;
z-index: 100 !important;
position: absolute !important;
right: 0 !important;
bottom: 0 !important;
left: 0 !important;
`

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
  RowTextCenter,
  SpanFirstLine,
  SpanSecondLine,
  ColMainInput,
  RowPadding,
  RowWidthMax,
  RowWidthMaxAndHidden,
  ColWidthMaxAndPaddingTop,
  ColWidthMax,
  SpanInputText,
  RowMarginTop,
  ButtonLogin,
  FooterMy
}
