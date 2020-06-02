import React from 'react'
import styled from 'styled-components';

const MainFooter = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-end;
flex: 1;
height: 48px;
background-color: #1d1d1d;
position: fixed;
bottom: 0;
left: 0;
right: 0;
`;

const SubFooter = styled.div`
display: flex !important;
flex: 1 !important;
flex-direction: row !important;
justify-content: flex-start !important;
align-items: center !important;
height: 100% !important;
`;

const TextFooter = styled.span`
color: #ffffff;
padding-left: 10px;
font-weight: bold;
font-size: 20px
`

export {
  MainFooter,
  SubFooter,
  TextFooter
}

