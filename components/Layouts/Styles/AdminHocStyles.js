import React from 'react'
import styled from 'styled-components';

const FirstLayer = styled.div`
display: flex;
flex: 1;
flex-direction: column;
width: 100%;
height: 100%
`;

// const SecondLayer = styled.div`
// display: flex;
// flex: 1;
// flex-direction: row;
// justify-content: center;
// width: 100%
// `;

const SecondLayer = styled.div`
display: flex;
flex: 1;
flex-direction: row;
justify-content: center;
width: 100%
`;
// const WrapperInput = (props) => {
//   return <SecondLayer value={props.value} onChange={props.onChange} />
// }

// const WrapperInput = (props) => {
//   return <SecondLayer value={props.value} onChange={props.onChange} />
// }
export {
    FirstLayer,
    SecondLayer,
    //   WrapperInput,
}

