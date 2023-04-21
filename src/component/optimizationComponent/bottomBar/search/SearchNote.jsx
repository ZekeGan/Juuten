import React, {useMemo} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {selectCollection} from "../../../../redux/slice/collectionSlice";
import {selectFolder} from "../../../../redux/slice/folderSlice";
import BottemBarTemplate from "../BottemBarTemplate.jsx";
import FoundData from "./FoundData.jsx";

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
    const {Juuten_Storage} = useSelector(selectCollection)
    const {Juuten_folderLists} = useSelector(selectFolder)
    const obj = useSelector(selectCollection)
    const allFolder = useMemo(() => {
        const newStorage = Juuten_Storage.map(item => ({...item, folderName: 'Storage'}))
        return Juuten_folderLists
            .map(item => {
                let _obj = obj[item.key]
                if (!!_obj) return _obj.map(item2 => ({...item2, folderName: item.name}))
                else return _obj
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