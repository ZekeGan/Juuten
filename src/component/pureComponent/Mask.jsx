import React from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {selectGlobal} from "../../redux/slice/globalSlice";



const Mask = styled.div`
    transition: 0.2s ease-out;
    position: absolute;
    z-index: ${({open}) => open ? '3' : '0'};
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,${({open}) => open ? '0.5' : '0'});`

const App = React.memo(({open, onClick}) => {
    const {configuration: config} = useSelector(selectGlobal)
    return (
        <Mask
            config={config}
            open={open}
            onClick={onClick}
        />
    );
})

export default App;