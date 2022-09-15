import React from 'react';
import styled from "styled-components";
import {global} from "./global/global";
import {useSelector} from "react-redux";
import {selectCollection} from "./redux/slice/collectionSlice";
import {Link} from "react-router-dom";

const {primary, secondary} = global

const Folder = styled.div`
    width: 450px;
    height: 600px;
    overflow: hidden;    
    background-color: ${primary};
    > .navbar {
        width: 100%;
        height: 48px;
        background-color: white;
        
    }  
    > .folderContainer {
        display: flex;
        flex-wrap: wrap;
        padding: 0px 38px;
        > .folder {
        width: 100px;
        height: 80px;
        border-radius: 5px;
        background-color: ${secondary};
        margin: 25px 12px;
    }
    
`

export default function App(props) {
    const {simFolderName} = useSelector(selectCollection)
    return (
        <Folder>
            <div className='navbar'/>
            <div className="folderContainer">
                {
                    simFolderName.map(item =>
                        <Link to={`/collection/${item}`}
                              className='folder'
                              key={item}
                        >{item}</Link>
                    )
                }
            </div>



        </Folder>
    );
}
