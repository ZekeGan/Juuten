import React from 'react';
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectGlobal } from "slice/globalSlice";

const Page = styled.div`
    position: fixed;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    position: absolute;
    left: 50%;
    transform: translateX(-50%) translateY(${({ delCheck }) => delCheck ? '10%' : '-110%'});
    width: 400px;
    height: 100px;  
    text-align: center; 
    background-color: ${({ config }) => config.warning};
    color: white;
    z-index: 60;
    border-radius: 10px;
    transition: 0.2s ease-out;
    font-size: ${({ config }) => config.font_size_m};
    user-select: none;
    > span {
        display: block;
        width: 100%;
        height: 20px;
        margin-top: 10px;
    }
    > button {
        width: 30%;
        height: 40%;
        border: none;
        border-radius: 8px;
        cursor: pointer;
    }
    > .JuutenDel-yes {
        background-color: black;
        color: white;
    }
    > .JuutenDel-no {
        background-color: ${({ config }) => config.primary};
    }
`

export default React.memo((
    {
        delCheck,
        setDelCheck,
        doubleDelCheck,
    }) => {
    const { configuration: config } = useSelector(selectGlobal)

    function stop(e) {
        e.stopPropagation()
        e.preventDefault()
    }

    console.log('del');

    return (
        <Page
            config={config}
            delCheck={delCheck}
            onMouseUp={stop}
        >
            <span>請注意： 如果刪除資料夾，資料夾內資料將會永久消失</span>
            <button
                className='JuutenDel-yes'
                onClick={doubleDelCheck}
            >
                確認
            </button>
            <button
                className='JuutenDel-no'
                onClick={() => setDelCheck(false)}
            >
                取消
            </button>
        </Page>
    );
},
    (prevProps, nextProps) => prevProps.delCheck === nextProps.delCheck
)