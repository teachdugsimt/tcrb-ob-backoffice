import React from 'react'
import styled from 'styled-components';

const MainFooter = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-end;
flex: 1;
height: 60px;
background-color: #1d1d1d;
position: fixed;
bottom: 0;
left: 0;
right: 0;
`;

const SubFooter = styled.div`
display: flex;
flex: 1;
flex-direction: row;
justify-content: flex-start;
align-items: center;
height: 100%;
`;

const TextFooter = styled.h1`
color: #ffffff;
padding-left: 10px;
`

export {
  MainFooter,
  SubFooter,
  TextFooter
}

