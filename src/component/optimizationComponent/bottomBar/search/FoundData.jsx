import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { convertFromRaw, convertToRaw, EditorState, RichUtils } from "draft-js";
import { selectGlobal } from "../../../../redux/slice/globalSlice";
import styled from "styled-components";
import DraftComponent from "../../DraftComponent.jsx";
import Url from "../../Url.jsx";
import Comment from "../../collection/Comment.jsx";
import JInput from "../../pureComponent/JInput.jsx";

const TextContainer = styled.div`
  width: 90%;
  margin: 2% 0;
  .folder-name {
    margin-bottom: 2%;
  }
  .search-note-folder-container {
    background-color: white;
    border-radius: 10px;
  }
`;

const NoteContainer = styled.div`
  padding: 2%;
  ${({ isBottom, config }) =>
    isBottom ? "" : `border-bottom: 3px solid ${config.primary}`}
`;

const MyComponent = React.memo(({ data, open = false }) => {
  const { configuration: config } = useSelector(selectGlobal);
  const inputRef = useRef(null);
  const [foundData, setFoundData] = useState([]);

  console.log("foundData");

  useEffect(() => {
    if (!inputRef.current || !open) return;
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  function findData() {
    const target = inputRef.current?.value.toUpperCase();
    if (!target) {
      setFoundData([]);
      return;
    }
    const newData = data
      .map((item) => {
        // 先篩選符合條件的註解，並加上 highlight 的樣式
        const comment = item.comment
          .filter((item2) => isMsgHas(item2.msg, target))
          .map((comm) => ({ ...comm, msg: highlightMsg(comm.msg, target) }));

        // 如果主要文字也符合搜尋條件，也要加上 highlight 的樣式
        const _data = {
          ...item,
          comment: comment,
          msg: isMsgHas(item.msg, target)
            ? highlightMsg(item.msg, target)
            : comment.length
            ? highlightMsg(item.msg, target)
            : "",
        };
        // 排除沒有搜尋結果的資料
        return !!_data.msg || !!_data.comment.length ? _data : null;
      })
      .filter((item) => item !== null)
      // 將結果依照資料夾分類
      .reduce((outputObject, { folderName, ...rest }) => {
        if (!outputObject[folderName]) outputObject[folderName] = [];
        outputObject[folderName].push({ ...rest });
        return outputObject;
      }, {});
    // 更新搜尋結果
    setFoundData(newData);
  }

  function isMsgHas(msg, target) {
    /**
     * 檢查 `msg` 是否包含 `target` 字符串
     * @param {string} msg - 要檢查的消息
     * @param {string} target - 要搜索的目標字符串
     * @returns {boolean} - 如果 `msg` 包含 `target` 字符串，返回 `true`；否則，返回 `false`
     */
    const contentState = convertFromRaw(JSON.parse(msg));
    const plainText = contentState.getPlainText().toUpperCase();
    return plainText.includes(target);
  }

  function highlightMsg(msg, target) {
    /**
     * 將給定的消息中的目標文本高亮
     * @param {string} msg - 原始訊息
     * @param {string} target - 要高亮的目標文本
     * @returns {string} JSON格式的高亮消息
     */

    let editorState = EditorState.createWithContent(
      convertFromRaw(JSON.parse(msg))
    );
    const blocks = editorState.getCurrentContent().getBlockMap();
    const regex = new RegExp(target, "g");
    console.log(editorState.getCurrentContent().getPlainText());

    blocks.forEach((block) => {
      const text = block.getText().toUpperCase();
      let matchArr = regex.exec(text);

      while (matchArr !== null) {
        console.log(matchArr);
        editorState = RichUtils.toggleInlineStyle(
          EditorState.forceSelection(
            editorState,
            editorState.getSelection().merge({
              anchorKey: block.getKey(),
              focusKey: block.getKey(),
              anchorOffset: matchArr.index,
              focusOffset: matchArr.index + target.length,
            })
          ),
          "HIGHLIGHT"
        );
        matchArr = regex.exec(text);
      }
    });
    return JSON.stringify(convertToRaw(editorState.getCurrentContent()));
  }

  return (
    <>
      <JInput mRef={inputRef} callback={findData} />
      {Object.keys(foundData).map((item) => (
        <TextContainer key={item}>
          <div className={"folder-name"}>{item}</div>
          <div className="search-note-folder-container">
            {foundData[item].map((item2, idx2) => (
              <NoteContainer
                config={config}
                key={item2.key}
                isBottom={!foundData[item][idx2 + 1]}
              >
                <DraftComponent item={item2.msg} />
                <Url item={item2} />

                {item2.comment.length > 0 &&
                  item2.comment.map((item3) => (
                    <Comment key={item3.key} item={item3} showToolbar={false} />
                  ))}
              </NoteContainer>
            ))}
          </div>
        </TextContainer>
      ))}
    </>
  );
});

export default MyComponent;
