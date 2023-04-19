import React from 'react';
import styled from "styled-components";

const DateBox = styled.div`
    margin-right: auto;`

const BuiltDate = React.memo(({date}) => {
    return (
        <DateBox>{date}</DateBox>
    );
})

export default BuiltDate;