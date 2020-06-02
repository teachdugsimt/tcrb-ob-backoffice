import React from 'react'
import styled from 'styled-components';

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
padding-left: 180px;
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

export {
  FirstLayer,
  SecondLayer,
  EmptyDiv,
  EmptySidebar,
  ContentPadding,
}

