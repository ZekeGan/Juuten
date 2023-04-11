import React from 'react';
import BottemBarTemplate from "../BottemBarTemplate.jsx";
import {addOpenAddNewNote, addOpenSearchPage, selectCollection} from "../../../redux/slice/collectionSlice";
import {useDispatch, useSelector} from "react-redux";

function SearchNote(props) {
    const {openSearchPage} = useSelector(selectCollection)
    const dispatch = useDispatch()
    return (
        <BottemBarTemplate
            open={openSearchPage}
            fullPage={true}
            closeCallback={() => dispatch(addOpenSearchPage(''))}
        >
            <input type="text"/>

        </BottemBarTemplate>
    );
}

export default SearchNote;