import React from 'react';
import styled from "styled-components";


const Icon = styled.div`
    cursor: pointer;
    user-select: none;
    height: 30px;
    border-radius: 15px;
    text-align: center;
    line-height: 30px;
    font-family: SourceHanSansHWTC-Regular;
    width: 30px;
    margin-right: 10px;
    ${({ stylePros }) => stylePros}
`



const MyComponent = React.memo((
    {
        style,
        icon,
        fn = () => { },
    }) => {

    return (
        <Icon
            stylePros={style}
            onMouseDown={fn}
        >
            {icon}
        </Icon>
    )
},
    (prevProps, nextProps) => {
        if (!nextProps.curr) return true
        return prevProps.style === nextProps.style
    }
)

export default MyComponent;
