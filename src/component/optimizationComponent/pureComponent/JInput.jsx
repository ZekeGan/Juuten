import React from 'react';
import styled from "styled-components";




const NormalInput = styled.input`
    height: 40px;
    width: 90%;
    border-radius: 10px;
    background-color: white;
    outline: none;
    border: none;
    overflow: hidden;
    padding: 0 3%`


const isEqual = (prevProps, nextProps) => {
    return prevProps.mRef === nextProps.mRef
}

const JInput = React.memo(({ mRef, callback}) => {
    console.log('jinput')
    return (
        <NormalInput
            ref={mRef}
            onChange={callback}
        />
    )
}, isEqual)

export default JInput;