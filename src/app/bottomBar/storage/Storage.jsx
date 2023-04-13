import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    addOpenStorage,
    selectCollection
} from "../../../redux/slice/collectionSlice";
import TextMain from "../../collection/textArea/TextMain.jsx";
import BottemBarTemplate from "../BottemBarTemplate.jsx";


function Storage(props) {
    const obj = useSelector(selectCollection)
    const dispatch = useDispatch()
    return (
        <BottemBarTemplate
            open={obj.openStorage}
            closeCallback={() => dispatch(addOpenStorage())}
            fullPage={true}
        >
            <TextMain
                obj={obj}
                id={'Juuten_Storage'}
                area={'storage'}
            />
        </BottemBarTemplate>
    );
}

export default Storage;
