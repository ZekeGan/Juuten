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
    a {
        font-size: ${({config}) => config.font_size_s}px;
        color: ${({config}) => config.quaternary};
        text-decoration: none;
    }
    > .url {
        width: 100%;
    }`
const Url = React.memo((props) => {
    const {item} = props
    const {configuration: config} = useSelector(selectGlobal)

    return (
        <Page config={config}>

            {item.favIconUrl
            && <img src={item.favIconUrl}/>}

            <div className="url">
                <a href={item.url}>{item.url}</a>
            </div>
        </Page>
    );
})

export default Url;