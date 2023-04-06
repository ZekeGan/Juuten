import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    addOpenStorage,
    selectCollection
} from "../../../redux/slice/collectionSlice";
import {TextMain} from "../textArea/TextMain.jsx";
import Toolbar from "../../component/Toolbar.jsx";
import TextareaOfTextarea from "../../component/TextareaOfTextarea.jsx";
import Url from "../../component/Url.jsx";
import Note from '../../component/Note.jsx'
import ThisIsBottom from "../../component/ThisIsBottom.jsx";
import BottemBarTemplate from "../../component/BottemBarTemplate.jsx";


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
                            TextareaOfTextarea={
                                <TextareaOfTextarea
                                    item={item}/>
                            }
                            Url={
                                <Url
                                    item={item}/>
                            }
                        />
                    ))
                }
                <ThisIsBottom/>
            </TextMain>

        </BottemBarTemplate>
    );
}

export default Storage;
