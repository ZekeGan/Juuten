import React from 'react';
import styled from "styled-components";
import {global} from "../../assets/global";

const {tertiary} = global
const Page = styled.div`
    display: flex;
    align-items: center;
    font-size: 9px;
    > img {
        height: 12px;
        margin-right: 6px;
    }   
    > .url > a {
        font-size: 9px;
        transform: scale(0.9);
        color: ${tertiary};
        text-decoration: none;
    }`
function Url(props) {
    const {item} = props
    return (
        <Page>
            {
                item.favIconUrl
                    ? <img
                        src={item.favIconUrl}/>
                    : ''
            }
            <div
                className="url">
                <a
                    href={item.url}>
                    {item.url}
                </a>
            </div>
        </Page>
    );
}

export default Url;