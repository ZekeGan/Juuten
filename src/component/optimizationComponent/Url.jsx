import React from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {selectGlobal} from "../../redux/slice/globalSlice";

const Page = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    font-size: ${({config}) => config.font_size_s}px;
    > img {
        height: 12px;
        margin-right: 6px;
    }   
    > .url {
        font-size: ${({config}) => config.font_size_s}px;
        color: ${({config}) => config.quaternary};
        text-decoration: none;
        overflow: hidden;
        padding: 2% 0;
    }`
const Url = React.memo(({item}) => {
    const {configuration: config} = useSelector(selectGlobal)

    return (
        <Page config={config}>

            {item.favIconUrl
            && <img src={item.favIconUrl}/>}

            <a href={item.url} className="url">{item.url}</a>
        </Page>
    );
})

export default Url;