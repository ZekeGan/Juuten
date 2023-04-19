import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    addOpenStorage,
    selectCollection
} from "../../../../redux/slice/collectionSlice";
import TextMain from "../../../../page/collection/TextMain.jsx";
import BottemBarTemplate from "../BottemBarTemplate.jsx";


function Storage({where = 'collection'}) {
    const {openStorage, Juuten_Storage} = useSelector(selectCollection)
    const dispatch = useDispatch()
    return (
        <BottemBarTemplate
            open={openStorage}
            closeCallback={() => dispatch(addOpenStorage())}
            fullPage={true}
        >
            <TextMain
                data={Juuten_Storage}
                where={where}
                area={'storage'}
            />
        </BottemBarTemplate>
    );
}

export default Storage;
