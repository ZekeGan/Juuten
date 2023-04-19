import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Icon from '../Svg.jsx'
import {useDispatch, useSelector} from "react-redux";
import {addSetConfiguration, selectGlobal} from "../../../redux/slice/globalSlice";

const Element = styled.div`
    user-select: none;
    height: 30px;
    border-radius: 15px;
    flex-shrink: 0;
    margin: 0 5px;
    display: flex;
    align-items: center;
    .number {
        text-align: center;
        width: 30px;
        margin: 0 10px;
    }`
const isEqual = (prev, next) => {
    return prev.everySize === next.everySize
}

export default React.memo(
    ({
         everySize = 9,
         min = 9,
         max = 30,
         howMany = 1,
         dispatchValue
     }) => {
        const dispatch = useDispatch()
        const [flag, setFlag] = useState(true)
        const [state, setState] = useState(everySize)

        console.log('size')

        function chengeNumber(type) {
            setFlag(false)
            if (type === '+') {
                setState((prev) => {
                    if (prev < max) {
                        return prev += howMany
                    } else {
                        return prev
                    }
                })
            } else {
                setState((prev) => {
                    if (min < prev) {
                        return prev -= howMany
                    } else {
                        return prev
                    }
                })
            }
        }

        function setConfig() {
            setFlag(true)
            dispatchValue.forEach(item => {
                dispatch(addSetConfiguration({key: item.key, value: state + item.value}))
            })
        }

        useEffect(() => {
            if (flag) return
            setConfig()
        }, [state])

        return (
            <Element>
                <div onClick={() => chengeNumber('-')}>
                    <Icon.Dash/>
                </div>

                <div className={'number'}>{state}</div>

                <div onClick={() => chengeNumber('+')}>
                    <Icon.Plus/>
                </div>

            </Element>
        );
    }, isEqual
)
