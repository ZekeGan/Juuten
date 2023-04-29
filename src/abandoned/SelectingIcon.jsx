import React, { useEffect } from 'react';
import styled from "styled-components";

const Icon = styled.div`
    
`

const MyComponent = () => {

    useEffect(() => {
        document.addEventListener("mouseup", function (event) {
            const selection = window.getSelection().toString();
            if (!!selection) {
                const tooltip = document.createElement("div");
                tooltip.innerText = "Click to do something";
                document.body.appendChild(tooltip);

                console.log('dodododo')
                document.addEventListener("click", function hideTooltip(event) {
                    if (!tooltip.contains(event.target)) {
                        document.removeEventListener("click", hideTooltip);
                        tooltip.remove();
                    }
                });
            }
        });
    }, [])
    return (
        <Icon>

        </Icon>
    );
};

