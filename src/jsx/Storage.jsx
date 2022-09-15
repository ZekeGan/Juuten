import React from 'react';
import styled from "styled-components";
import {global} from "./global/global";
import {useDispatch, useSelector} from "react-redux";
import {addOpenStorage, selectCollection} from "./redux/slice/collectionSlice";
import {UrlBox, Msg, NoteArea} from "./Collection.jsx";
import Icon from '../../public/svg.js'
const {main, transition_speed1, primary_opacity, primary} = global

const Main = styled.div`
    position: absolute;
    right: -250px;
    top: 0;
    width: 250px;
    height: 600px;
    background-color: ${primary}; 
    transform: translateX(${props => props.open ? '-250px' : 0});
    ${transition_speed1}
`
const Navbar = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 48px;
    background-color: white;
    display: flex;
    align-items: center;
    > i {
        transform: scale(1.2);
        color: ${main};
    }
     
`
function Storage(props) {
    const {openStorage, storage} = useSelector(selectCollection)
    const dispatch = useDispatch()
    const {ellipsis, navbar} = props
    const close = () => dispatch(addOpenStorage())
    return (
        <Main open={openStorage}>
            <Navbar>
                <Icon.Right styled={navbar} onClick={() => close()}/>
            </Navbar>
            <NoteArea>
                {
                    storage.map(item => (
                        <div key={item.url + item.msg} className='note'>
                            <UrlBox>
                                <img src={item.favIconUrl} alt=""/>
                                <div className="url">{item.url}</div>
                            </UrlBox>
                            <Msg>{item.msg}</Msg>
                            <Icon.Ellipsis styled={ellipsis}/>
                        </div>
                    ))
                }
            </NoteArea>
        </Main>
    );
}

export default Storage;