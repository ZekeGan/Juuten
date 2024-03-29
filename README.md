## Jutten 介紹

![Juuten_Icon](public/icon/Juuten_Icon_128.png)

[Chrome Web Store](https://chromewebstore.google.com/detail/fnhndlacbnkkdlgladhkcgoflchnhifb?hl=zh-TW)

[Demo](https://drive.google.com/file/d/1zYdZe_0dbDFHZ9wPQDD2CAmf9IV_dOHN/view?usp=share_link)

如果你需要一個可以隨時快速筆記，快速把中意的句子或文章記錄起來，Juuten 可以滿足你的需求

### 未來預計新增
- 黑暗模式
- 更改字體大小
- 更改字體顏色

### 隨時記錄

隨時把所需的文字加入至 Juuten

![gif1](public/gif/1.gif)

### 隨時筆記

可以隨時記錄你所想的東西

![gif2](public/gif/2.gif)

### 自由的創建編輯和排序

照你所想自由地進行分類和排序

![gif3](public/gif/3.gif)

## 使用技術

- `React` 前端框架
- `Redux` 狀態管理
- `React Router` 路由工具
- `styled-components` css-in-js
- `Redux-Thunk` 處理非同步狀態
- `Draftjs` 筆記文本編輯器
- `React-beautiful-dnd` dnd(拖移)組件
- `webpack` 打包整合工具

## 代碼簡介

> 以下代碼皆為精簡後的版本

### Draft.js

使用 Draft.js 創立組件後利用 `forwardRef` 配合 `useImperativeHandle` 將函式和 State 向前傳送，讓父組件也能使用，之後要新增函數或進行改動也相當容易

```jsx
/* DraftComponent.jsx */
const DraftComponent = memo(
  forwardRef(
    (
      {
        item = "",
        readOnly = false,
        setInlineStyle,
        open = false,
        autoSave = {},
      },
      ref
    ) => {
      const mainRef = useRef(null);
      const [editorState, setEditorState] = useState(() => {
        if (item)
          return EditorState.createWithContent(
            convertFromRaw(JSON.parse(item))
          );
        else return EditorState.createEmpty();
      });

      function onChange(state) {
        setEditorState(state);
      }

      useImperativeHandle(
        ref,
        () => ({
          editorState: editorState,
          toggleStyle: (style, e) => {
            e.preventDefault();
            const newState = RichUtils.toggleInlineStyle(editorState, style);
            nowInlineStyle(newState);
            onChange(newState);
          },
          autoFocus: () => {
            onChange(EditorState.moveFocusToEnd(editorState));
          },
        }),
        [editorState]
      );
      return (
        <Editor editorState={editorState} onChange={onChange} ref={mainRef} />
      );
    }
  )
);
```

### React Thunk

使用`React Thunk` 利用 Goole API `Chrome storage local` 獲取資料，之後使用回調進行畫面跳轉

```javascript
/* FolderBlock.jsx */
function goIntoFolder(e, item) {
  e.stopPropagation();
  const fn = () => navigate(`/collection/${item.key}`);
  dispatch(
    addFetchData({
      item,
      fn,
    })
  );
}

/* collectionSlice.js */
const thunkData = createAsyncThunk(
  "folder/fetchFolderData",
  async ({ item, fn }) => {
    const value = await fetchData(item.key, []);
    return { item, value, fn };
  }
);
export const CollectionSlice = createSlice({
  name: "collection",
  initialState: {
    /* ... */
  },
  reducers: {
    /* ... */
  },
  extraReducers: {
    [thunkData.fulfilled]: (state, action) => {
      const { item, value, fn = () => {} } = action.payload;
      setDataToLocal("Juuten_Navigate_History", item);
      fn();
      return {
        ...state,
        folderData: item,
        folderId: item.key,
        isHistoryLoad: true,
        [item.key]: value,
      };
    },
  },
});
```

### Search Note

在所有的筆記內查找是否有符合輸入的文字，如果有把所有相同的文字打上 Highlight

```javascript
/* FoundData.jsx */
function findData() {
  const target = inputRef.current?.value.toUpperCase();
  if (!target) {
    setFoundData([]);
    return;
  }
  const newData = data
    .map((item) => {
      // 先篩選符合條件的註解(comment)，並加上 highlight 的樣式
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
   */
  const contentState = convertFromRaw(JSON.parse(msg));
  const plainText = contentState.getPlainText().toUpperCase();
  return plainText.includes(target);
}

function highlightMsg(msg, target) {
  /**
   * 將給定的消息中的目標文本高亮
   */
  let editorState = EditorState.createWithContent(
    convertFromRaw(JSON.parse(msg))
  );
  const blocks = editorState.getCurrentContent().getBlockMap();
  const regex = new RegExp(target, "g");

  // 每個Block檢測是否有相同文字，如果有打上Highlight
  blocks.forEach((block) => {
    const text = block.getText().toUpperCase();
    let matchArr = regex.exec(text);
    while (matchArr !== null) {
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
```

## 聲明

此軟體完全由 Zeke 進行開發 如有 Bug 歡迎通知我

Github: [Zeke](https://github.com/JikeLuo)

E-Mail: traveller87072@gmail.com

Version: 0.22.3

