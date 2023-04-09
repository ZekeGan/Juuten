import React from 'react';
import styled from "styled-components";
import {global} from "../../assets/global";

const {tertiary, font_size_s, font_size_m} = global
const Page = styled.div`
    display: flex;
    align-items: center;
    font-size: ${font_size_s}px;
    > img {
        height: 12px;
        margin-right: 6px;
    }   
    > .url > a {
        font-size: ${font_size_s}px;
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