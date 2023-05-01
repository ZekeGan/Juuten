import React from 'react';
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectGlobal } from "slice/globalSlice";


const NewFolderInput = styled.input`
    height: 50%;
    width: 100%;
    background-color: transparent;
    outline: none;
    border: none;
    overflow: hidden;
    border-bottom: 2px solid ${({ config }) => config.main};
    resize: none;
    padding-bottom: 3px;
    margin: 0 5%;
`


export default React.memo((
    {
        mRef,
        onInput = () => { }
    }) => {
    const { configuration: config } = useSelector(selectGlobal)

    return (
        <NewFolderInput
            config={config}
            ref={mRef}
            onInput={onInput}
        />
    );
},
    (prevProps, nextProps) => prevProps.mRef === nextProps.mRef
)
