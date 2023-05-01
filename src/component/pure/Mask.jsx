import React from 'react';
import styled from "styled-components";

const Mask = styled.div`
    transition: 0.2s ease-out;
    position: absolute;
    left: 0;
    top: 0;
    z-index: ${({ open }) => open ? '3' : '-1'};
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,${({ open }) => open ? '0.5' : '0'});`

const App = React.memo((
    {
        open = false,
        onClick = () => { }
    }) => {
        
    return (
        <Mask
            open={open}
            onClick={onClick}
        />
    );
},
    (prev, next) => prev.open === next.open
)

export default App;