import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    addOpenStorage,
    selectCollection
} from "../../../redux/slice/collectionSlice";
import {TextMain} from "../../collection/textArea/TextMain.jsx";
import Textarea from "../../../component/note/Textarea.jsx";
import Url from "../../../component/note/Url.jsx";
import Note from '../../../component/note/Note.jsx'
import ThisIsBottom from "../../../component/ThisIsBottom.jsx";
import BottemBarTemplate from "../../../component/BottemBarTemplate.jsx";


function Storage(props) {
    const {openStorage, Juuten_Storage} = useSelector(selectCollection)
    const dispatch = useDispatch()

    useEffect(() => {
        document.querySelectorAll('textarea').forEach(item => {
            item.style.height = item.scrollHeight + 'px'
        })
    }, [Juuten_Storage]);

    return (
        <BottemBarTemplate
            open={openStorage}
            closeCallback={() => dispatch(addOpenStorage())}
        >

            <TextMain>
                {
                    Juuten_Storage.map(item => (
                        <Note
                            key={item.key}
                            item={item}
                        >
                            <Textarea item={item}/>
                            <Url item={item}/>
                        </Note>
                    ))
                }
                <ThisIsBottom/>
            </TextMain>

        </BottemBarTemplate>
    );
}

export default Storage;
