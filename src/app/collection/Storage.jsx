import React from 'react';
import styled from "styled-components";
import {global} from "../../assets/global";
import {useDispatch, useSelector} from "react-redux";
import {addOpenStorage, selectCollection} from "../../redux/slice/collectionSlice";
import {NoteArea, Msg, Note} from "./NoteArea.jsx";
import Icon from '../../assets/svg.jsx'
const {main, transition_speed1, primary_opacity, primary, tertiary} = global

const Main = styled.div`
    position: absolute;
    z-index: 3;
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

const UrlBox = styled.div`
    > .url {
        font-size: 10px;
        color: ${tertiary};
        margin-top: 5px;
    }`


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
                        <Note key={item.url + item.msg}>
                            <UrlBox>
                                <div className="url">{item.url}</div>
                            </UrlBox>
                            <Msg>{item.msg}</Msg>
                            <Icon.Delete styled={ellipsis}/>
                        </Note>
                    ))
                }
            </NoteArea>
        </Main>
    );
}

export default Storage;
export {Main, Navbar}