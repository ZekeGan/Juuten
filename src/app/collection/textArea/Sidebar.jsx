import React from 'react';
import styled from "styled-components";
import {addOpenEditToolbar} from "../../../redux/slice/collectionSlice";
import {useDispatch} from "react-redux";

import Icon from "../../../assets/svg.jsx";


const SideToolbar = styled.div`
    position: absolute;
    display: flex;
    right: 0;
    top: 0;
    overflow: hidden;
    width: 30px;
    height: 100%;
    > .ellipsis {
        height: 100%;
        margin-right: 10px; 
        display: flex;
        flex-direction: column;
        justify-content: center;
        transition: 0.2s ease-out ${p => p.open ? '' : '0.2s'};
        transform: translateX(${p => p.open ? '25px' : '5px'});
        
    }
    > .saveAndDel {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10px 0 5px 0;
        transition: 0.2s ease-out ${p => p.open ? '0.2s' : ''};
        transform: translateX(${p => p.open ? '-28px' : 0});
    }`


const App = (p) => {
    const {openEditId, item, setEditCount} = p
    const dispatch = useDispatch()

    const open = (payload) => {
        dispatch(addOpenEditToolbar(payload))
        setEditCount(0)
    }
    const save = (paload) => {
        dispatch(addOpenEditToolbar())
    }


    return (
        <SideToolbar open={openEditId === (item.key)}>
            <div className="ellipsis">
                {/*<Icon.Ellipsis/>*/}
            </div>


        </SideToolbar>
    );
};

export default App;
