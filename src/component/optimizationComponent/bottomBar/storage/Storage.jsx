import React from 'react';
import { useSelector } from "react-redux";
import {
    selectCollection
} from "../../../../redux/slice/collectionSlice";
import TextMain from "../../../../page/collection/TextMain.jsx";
import BottemBarTemplate from "../BottemBarTemplate.jsx";


function Storage(
    {
        barArea = 'collection',
        open = false,
        setOpen = () => { }
    }) {
    const { Juuten_Storage } = useSelector(selectCollection)
    return (
        <BottemBarTemplate
            useContainer={false}
            open={open}
            closeCallback={() => setOpen(false)}
            fullPage
        >
            <TextMain
                data={Juuten_Storage}
                barArea={barArea}
                area={'storage'}
            />
        </BottemBarTemplate>
    );
}

export default Storage;
