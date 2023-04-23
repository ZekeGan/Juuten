import React, {useMemo} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {selectCollection} from "../../../../redux/slice/collectionSlice";
import {selectFolder} from "../../../../redux/slice/folderSlice";
import BottemBarTemplate from "../BottemBarTemplate.jsx";
import FoundData from "./FoundData.jsx";
import store from "../../../../redux/store";

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px 0 0 0;
`


const SearchNote = React.memo((
    {
        open = false,
        setOpen = () => {}
    }) => {

    const allFolder = useMemo(() => {
        const collectionData = store.getState().collection
        const folderData = store.getState().folder
        const newStorage = collectionData['Juuten_Storage'].map(item => ({...item, folderName: 'Storage'}))
        return folderData.Juuten_folderLists
            .map(item => {
                const _obj = collectionData[item.key]
                return !!_obj
                    ? _obj.map(item2 => ({...item2, folderName: item.name}))
                    : _obj
            })
            .concat(newStorage)
            .filter(item => item !== undefined)
            .flat(1)
    }, [open])


    console.log('searchPage')

    return (
        <BottemBarTemplate
            open={open}
            fullPage={true}
            closeCallback={() => setOpen(false)}
        >
            <Container>
                {open
                && <FoundData
                    data={allFolder}
                    open={open}
                />}
            </Container>
        </BottemBarTemplate>
    );
})

export default SearchNote;