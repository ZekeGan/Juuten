import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addOpenBar, addOpenStorage, selectCollection} from "../../../redux/slice/collectionSlice.js";
import BottemBarTemplate from "../../../component/BottemBarTemplate.jsx";



function Bar(props) {
    const dispatch = useDispatch()
    const {openBar} = useSelector(selectCollection)

    return (
            <BottemBarTemplate
                open={openBar}
                closeCallback={() => dispatch(addOpenBar())}>
                <div>aaa</div>
                <div>aaa</div>
                <div>aaa</div>

            </BottemBarTemplate>

    );
}

export default Bar;