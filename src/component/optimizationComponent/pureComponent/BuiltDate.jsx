import React from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {selectGlobal} from "../../../redux/slice/globalSlice";

const DateBox = styled.div`
    margin-right: auto;
    font-size: ${({config}) => config.font_size_m}px;`

const BuiltDate = React.memo(({date}) => {
    const {configuration: config} = useSelector(selectGlobal)
    return (
        <DateBox config={config}>{date}</DateBox>
    );
})

export default BuiltDate;