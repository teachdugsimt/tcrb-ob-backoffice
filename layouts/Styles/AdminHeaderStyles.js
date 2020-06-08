import React, { useContext } from 'react'
import styled from 'styled-components';
import { Button } from 'antd';

const MainHeader = styled.div`
display: flex;
flex: 1;
flex-direction: column;
height: 100px;
width: 100%;
background-color: ${({ theme }) => theme.colors.palette.black};
padding: 0;
position: fixed;
top: 0;
left: 0;
right: 0;
`;

const SubHeader = styled.div`
display: flex;
width: 100%;
flex: 1;
height: 50%;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

const SubHeader2 = styled.div`
display: flex;
width: 100%;
flex: 1;
height: 50%;
flex-direction: row;
justify-content: flex-end;
align-items: center;
`;

const DivImageLogo = styled.div`
display: flex;
flex: 1;
flex-direction: row;
justify-content: flex-start;
align-items: center;
height: 100px;
padding-top: 10px;
padding-left: 5px;
`;

const ImgLogo = styled.img`
aspect-ratio: 0.1;
height: 50px;
`;

const InsideTopRightDiv = styled.div`
display: flex;
flex: 0.8;
flex-direction: row;
justify-content: flex-end;
align-self: right;
padding-right: 10px ;
`;

const ContentMainDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
width: 100%;
padding-top: 5px;
padding-right: 5px;
`;

const TextMenu = styled.h3`
margin-left: 10;
color: ${({ theme }) => theme.colors.palette.white};
`;

const DivAccount = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
padding-left: 10px;
width: 32%
`;

const DivName = styled.div`
display: flex;
flex-direction: column;
`;

const TextName = styled.div`
color: ${({ theme }) => theme.colors.palette.white};
font-weight: bold;
`;

const ImgAccount = styled.img`
height: 40px;
width: 40px;
background: ${({ theme }) => theme.colors.palette.white};
border-radius: 20px;
`;

const WrapperImageLogo = (props) => {
  return <ImgLogo src={props.src} alt='logo' id='logoImage' />
}
const WrapperImageAccount = (props) => {
  return <ImgAccount src={props.src} alt="account" id="accountImage" />
}
const WrapperButtonAnt = (props) => {
  return <Button onClick={props.onClick} style={{ borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, backgroundColor: "#1d1d1d", color: 'white', width: "25%", fontSize: 18, fontWeight: 'bold' }} > {props.title}</Button >
}

export {
  MainHeader,
  SubHeader,
  SubHeader2,
  DivImageLogo,
  InsideTopRightDiv,
  ContentMainDiv,
  TextMenu,
  DivAccount,
  DivName,
  TextName,
  WrapperImageLogo,
  WrapperImageAccount,
  WrapperButtonAnt,
  //   WrapperInput,
}

