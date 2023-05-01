import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectGlobal, } from "slice/globalSlice";
import Dots from "./Dots.jsx";

const Main = styled.div`
  width: 70%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: end;
  overflow: hidden;
`;

const ColorBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  transform: translateX(${({ open }) => (open ? "0" : "100%")});
  transition: 0.3s;
  overflow: hidden;
`;
const Element = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%) ${({ open }) => (open ? "translatex(100px)" : "")};
  height: 30px;
  width: 30px;
  border-radius: 15px;
  flex-shrink: 0;
  background-color: ${({ color }) => color};
  margin: 0 2px;
  transition: 0.4s;
`;

export default React.memo(() => {
    const [open, setOpen] = useState(false);
    const { configuration: config } = useSelector(selectGlobal);

    function openColors() {
        setOpen(true);
    }

    return (
        <Main open={open}>
            <Element
                open={open}
                config={config}
                color={config.main}
                onClick={openColors}
            />
            <ColorBox open={open}>
                {config.mainColor.map((item, index) => (
                    <Dots key={item} setOpen={setOpen} item={item} />
                ))}
            </ColorBox>
        </Main>
    );
});

