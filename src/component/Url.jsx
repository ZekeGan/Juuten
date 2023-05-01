import React from 'react';
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectGlobal } from "slice/globalSlice";

const Page = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    font-size: ${({ config }) => config.font_size_s}px;
    > img {
        height: 12px;
        margin-right: 6px;
    }   
    > .url {
        font-size: ${({ config }) => config.font_size_s}px;
        color: ${({ config }) => config.quaternary};
        text-decoration: none;
        overflow: hidden;
        padding: 2% 0;
        cursor: pointer;
    }`

const Replace = styled.div`
    width: 100%;
    height: 10px;
`
const Url = React.memo((
    {
        item
    }) => {
    const { configuration: config } = useSelector(selectGlobal)

    function goTo(url) {
        chrome.tabs.create({ url })
    }

    return item.url
        ? <Page config={config}>

            {item.favIconUrl
                && <img src={item.favIconUrl} />}

            <div
                className="url"
                onClick={() => goTo(item.url)}
            >
                {item.url}
            </div>

        </Page>
        : <Replace />
},
    () => true
)

export default Url;