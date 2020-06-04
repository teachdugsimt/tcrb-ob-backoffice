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
  padding: ${({ theme }) => theme.spacing.large}px;
`

const BorderMenu = styled.div`
display: flex;
flex: 1;
min-height: 40px;
width: 100%;
border-bottom: 1px solid lightgrey;
margin-left: -15px;
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

const MainDivMenu = styled.div`
display: flex;
height: 100%;
background-color: #fff5;
border-color: black;
overflow-y: scroll;
border-bottom-right-radius: 10px;
border-bottom-left-radius: 10px;
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
}

