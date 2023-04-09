import React, {useLayoutEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {selectCollection} from "../../redux/slice/collectionSlice";
import styled from "styled-components";
import {global} from "../../assets/global";

const {font_size_m} = global

const Counting = styled.div`
    font-size: ${font_size_m}px;`

function EditingCounting(props) {
    const [editCount, setEditCount] = useState(0)
    const {openEditId} = useSelector(selectCollection)

    useLayoutEffect(() => {
        if (!openEditId) return
        if (editCount > 3) setEditCount(0)
        let timer = setInterval(() => setEditCount((oldCount) => ++oldCount), 1000)
        return () => clearInterval(timer)
    }, [openEditId, editCount])


    return(
        <Counting>
            {editCount === 0 && 'Editing'}
            {editCount === 1 && 'Editing .'}
            {editCount === 2 && 'Editing . .'}
            {editCount === 3 && 'Editing . . .'}
        </Counting>
    )
}

export default EditingCounting;
