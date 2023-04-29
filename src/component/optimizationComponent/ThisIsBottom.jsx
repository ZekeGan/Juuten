import React from 'react';
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectGlobal } from "../../redux/slice/globalSlice";
const Bottom = styled.div`
    width: 80%;
    padding: 2%;
    text-align: center;
    color: ${({ config }) => config.quaternary};
    border-bottom: 1px solid ${({ config }) => config.quaternary}; 
`
const ThisIsBottom = React.memo((props) => {
    const { configuration: config } = useSelector(selectGlobal)
    return <Bottom config={config}>已經到最底</Bottom>
})

export default ThisIsBottom;