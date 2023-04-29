import React from 'react';
import { useSelector } from "react-redux";
import {
    selectCollection
} from "../../../../redux/slice/collectionSlice";
import TextMain from "../../../../page/collection/TextMain.jsx";
import BottemBarTemplate from "../BottemBarTemplate.jsx";


export default React.memo((
    {
        barArea,
        open = false,
        setOpen = () => { }
    }) => {
    const { Juuten_Storage } = useSelector(selectCollection)

    console.log(Juuten_Storage);

    console.log('storage');
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
},
    (p, n) => p.open === n.open
)

