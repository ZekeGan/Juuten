import React from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addSetConfiguration, selectGlobal } from "slice/globalSlice";


const Element = styled.div`
    display: flex;
    align-items: center;
    input[type=checkbox] {
      height: 0;
      width: 0;
      visibility: hidden;
    }
    
    label {
      cursor: pointer;
      check: checked;
      text-indent: -9999px;
      width: 60px;
      height: 32px;
      display: block;
      background: ${({ config }) => config.secondary};
      border-radius: 20px;
      position: relative;
      &:after {
        content: '';
        position: absolute;
        left: 2.5px;
        top: 2.5px;
        width: 27px;
        height: 27px;
        background: white;
        border-radius: 50%;
        transition: 0.2s ease-out;
      }
      &:active:after {
        width: 30px;
      }
    }
    
    input:checked + label {
      background: ${({ config }) => config.main};
      &:after {
        left: calc(100% - 2.5px);
        transform: translateX(-100%);
      }
    }`

export default React.memo((
  {
    id,
    ratioValue,
    current,
  }) => {
  const { configuration: config } = useSelector(selectGlobal)
  const dispatch = useDispatch()

  function fn(e) {
    ratioValue.forEach(item => {
      dispatch(addSetConfiguration({
        key: item.key,
        value: e.target.checked
      }))
    })

  }

  return (
    <Element config={config}>
      <input type="checkbox"
        id={id}
        checked={current}
        onChange={(e) => fn(e)}
      />
      <label htmlFor={id} />
    </Element>
  )
})