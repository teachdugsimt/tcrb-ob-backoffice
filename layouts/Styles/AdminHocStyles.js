import React, { useContext } from 'react'
import styled from 'styled-components';
import VersatileStore from '../../mobx-store/VersatileStore'

const width = () => {
  const context = useContext(VersatileStore)
  return context.sidebarWidth
}

const FirstLayer = styled.div`
display: flex;
flex: 1;
flex-direction: column;
width: 100%;
height: 100%
`;

const EmptyDiv = styled.div`
padding-top: 100px;
`

const EmptySidebar = styled.div`
padding-left: ${width}px;
`

const SecondLayer = styled.div`
display: flex;
flex: 1;
flex-direction: row;
width: 100%
`;

const ContentPadding = styled.div`
  width: 100% ;
  height: 100%;
  margin-bottom: 42px;
  padding: ${({ theme }) => theme.spacing.large}px;
`

const MainContainerMenu = styled.div`
width: ${width}px;
display: flex;
flex: 0.25;
position: fixed;
top: 108px;
bottom: 56px;
left: 8px;
`

const SubMainContainer = styled.div`
display: flex;
flex: 1;
width: 100%;
flex-direction: column;
`

const MainTitleMenuDiv = styled.div`
display: flex;
min-height: 117px;
background-color: #707070;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
border-top-right-radius: 10px;
border-top-left-radius: 10px;
`

const TitleDiv = styled.div`
font-weight: bold;
color: white;
padding-top: 15px;
padding-left: 15px;
font-size: 18px;
`

const SpanText = styled.span`
width: 100%;
margin-right: 10px;
font-size: 12px;
`

const LinkColorMenu = styled.a`
color: #000000;
&:hover {
  color: #587FFF;
}
`

const MainUl = styled.ul`
display: flex;
flex: 1;
flex-direction: column;
justify-content: center;
align-items: flex-start;
margin-top: 20px;
`

const BorderMenu = styled.div`
display: flex;
flex: 1;
flex-direction: row;
justify-content: center;
align-items: center;
min-height: 48px;
width: 100%;
margin-left: -10px;
border-bottom: 1px solid lightgrey;
&:hover {
  border-bottom: 4px inset lightgrey;
}
&:hover ${LinkColorMenu} {
  color: #587FFF
}
`


const MainDivMenu = styled.div`
display: flex;
height: 100%;
padding-top: 10px;
background-color: #fff5;
border-color: black;
overflow-y: scroll;
border-bottom-right-radius: 10px;
border-bottom-left-radius: 10px;
`

const MenuIcon = styled.div`
width: 30px;
height: 2px;
border-radius: 1px;
background-color: white;
margin-top: 5px;
`
const MenuIcon2 = styled.div`
width: 7.5px;
height: 2px;
border-radius: 1px;
background-color: white;
margin-top: 5px;
`

const TitleDiv2 = styled.div`
padding-top: 15px;
padding-right: 15px;
display: flex;
flex-direction: column;
cursor: pointer;
&:hover ${MenuIcon} {
  height: 4px;
  border-radius: 2px;
  background-color: #587FFF;
}
&:hover ${MenuIcon2} {
  height: 4px;
  border-radius: 2px;
  background-color: #587FFF;
}
`


const MainHideDivMenu = styled.div`
display: flex;
height: 0%;
background-color: #fff5;
border-color: black;
border-bottom-right-radius: 10px;
border-bottom-left-radius: 10px;

`

// const WrapperMainDivMenu = (props) => {
//   console.log("Props. IS_SHOW : ", props)
//   if (props.isShow == true) {
//     return <MainDivMenu />
//   }
//   else {
//     return <MainHideDivMenu />
//   }
// }

export {
  FirstLayer,
  SecondLayer,
  EmptyDiv,
  EmptySidebar,
  ContentPadding,
  BorderMenu,
  MenuIcon,
  MenuIcon2,
  MainDivMenu,
  MainContainerMenu,
  SubMainContainer,
  MainTitleMenuDiv,
  TitleDiv,
  TitleDiv2,
  MainUl,
  SpanText,
  LinkColorMenu,
  MainHideDivMenu,
  // WrapperMainDivMenu,
}
