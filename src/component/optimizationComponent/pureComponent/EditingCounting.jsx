import React, { useLayoutEffect, useState } from 'react';
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectGlobal } from "../../../redux/slice/globalSlice";


const Counting = styled.div`
    user-select: none;
    color: ${({ config }) => config.quaternary};
    font-size: ${({ config }) => config.font_size_m}px;`


const EditingCounting = React.memo((
    {
        open
    }) => {
    const [editCount, setEditCount] = useState(0)
    const { configuration: config } = useSelector(selectGlobal)

    useLayoutEffect(() => {
        if (!open) return
        const count = setInterval(() => {
            setEditCount((prev) => {
                if (prev < 5) return ++prev
                else return 0
            })
        }, 1000)
        return () => clearInterval(count)
    }, [open])

    return (
        <Counting config={config}>
            {editCount === 0 && 'Editing'}
            {editCount === 1 && 'Editing .'}
            {editCount === 2 && 'Editing . .'}
            {editCount === 3 && 'Editing . . .'}
            {editCount === 4 && 'Editing . . . .'}
            {editCount === 5 && 'Editing . . . . .'}
        </Counting>
    )
},
    (p, n) => p.open === n.open 
)

export default EditingCounting;
