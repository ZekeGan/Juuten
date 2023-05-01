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

export default React.memo(({ mRef, callback, }) =>
    <NormalInput ref={mRef} onChange={callback} />,
    (prevProps, nextProps) => prevProps.mRef === nextProps.mRef
)