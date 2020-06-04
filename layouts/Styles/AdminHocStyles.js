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

export {
  FirstLayer,
  SecondLayer,
  EmptyDiv,
  EmptySidebar,
  ContentPadding,
  BorderMenu,
}

