import React, { useContext } from 'react'
import styled from 'styled-components';
// import { useStores } from '../../hooks/use-stores'
import { inject, observer } from 'mobx-react'
import initializeStore from '../../stores/stores';
import { i18n } from '../../i18n'
// const width = inject('versatileStore')(observer((props) => {
//   console.log("Props : ",props)
//   let { versatileStore } = props
//   console.log("Width : ", versatileStore)
//   return versatileStore ? versatileStore : 329;
// }))

const width = () => {
  let store = initializeStore()
  return store.versatileStore.sidebarWidth
}

const size = () => {
  return i18n.language == "th" ? 18 : 14
}

// const width = () => {
//   const { versatileStore } = useStores()
//   return versatileStore.sidebarWidth
// }

const FirstLayer = styled.div`
display: flex;
flex: 1;
flex-direction: column;
width: 100%;
height: 100%;
overflow: hidden;
`;

const EmptyDiv = styled.div`
padding-top: 100px;
`

const EmptySidebar = styled.div` x
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
  z-index: 99;
  padding: ${({ theme }) => theme.spacing.large - 9}px;
  margin-left: ${({ theme }) => theme.spacing.tiny - 12}px;
  margin-bottom: 16px;
`

const MainContainerMenu = styled.div`
width: ${width}px;
display: flex;
flex: 0.25;
position: fixed;
top: 108px;
bottom: 56px;
left: 8px;
z-index: 999;
margin-top: ${({ theme }) => theme.spacing.medium - 9}px;
margin-left: ${({ theme }) => theme.spacing.medium - 9}px;
margin-bottom: ${({ theme }) => theme.spacing.medium - 9}px;
`

const SubMainContainer = styled.div`
display: flex;
flex: 1;
width: 100%;
flex-direction: column;
`

const ContentSubDiv = styled.div`
padding: ${({ theme }) => theme.spacing.large}px;
`

const MainTitleMenuDiv = styled.div`
display: flex;
min-height: 117px;
background-color: #707070;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
border-top-right-radius: 4px;
border-top-left-radius: 4px;
`

const TitleDiv = styled.div`
font-weight: bold;
color: white;
padding-top: 15px;
padding-left: 15px;
font-size: ${({ theme }) => theme.size.menu}px;
`

const SpanText = styled.span`
width: 100%;
margin-right: 10px;
font-size: ${size}px;
`

const LinkColorMenu = styled.a`
color: #000000;
&:hover {
  color: ${({ theme }) => theme.colors.palette.orange};
}
`

const MainUl = styled.ul`
display: flex;
flex: 1;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
margin-top: 1px;
margin-bottom: 10px;
`

const BorderMenu = styled.div`
display: flex;
flex: 1;
flex-direction: row;
justify-content: center;
align-items: center;
min-height: 48px;
max-height: 48px;
width: 100%;
margin-left: -10px;
border-bottom: 1px solid lightgrey;
&:hover {
  cursor: pointer;
  border-bottom: 4px inset lightgrey;
}
&:hover ${LinkColorMenu} {
  color: ${({ theme }) => theme.colors.palette.orange};
}
`

const MainDivMenu = styled.div`
display: flex;
height: 100%;
padding-top: 10px;
background-color: #ececec91;
border-color: black;
overflow-y: scroll;
border-bottom-right-radius: 4px;
border-bottom-left-radius: 4px;
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
  background-color: ${({ theme }) => theme.colors.palette.orange};;
}
&:hover ${MenuIcon2} {
  height: 4px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.palette.orange};;
}
`


const MainHideDivMenu = styled.div`
display: flex;
height: 0%;
background-color: #ececec91;
border-color: black;
border-bottom-right-radius: 4px;
border-bottom-left-radius: 4px;

`

const ImgBackground = styled.img`
z-index: 0;
position: fixed;
width: 100%;
height: 100%;
background-repeat: no-repeat;
`;

const WrapperImageBackground = (props) => {
  return <ImgBackground src={props.src} alt='background' id='backgorundImage' />
}

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
  ContentSubDiv,
  WrapperImageBackground,
}
