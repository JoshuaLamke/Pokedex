import React from 'react';
import { typeColors } from '../utils/typeColors';
import '../../styles/type-buttons.css';

const TypeButtons = ({clickedButtons, setClickedButtons}) => {
    const buttons = [];
    for(const key in typeColors) {
        buttons.push(
            <button 
                key={key}
                style={{ 
                    background: typeColors[key],
                    border: `1px solid ${typeColors[key]}`,
                    boxShadow: `${clickedButtons.includes(key) ? `0px 0px 10px black` : `none`}`,
                }} 
                type="button"
                id={`type-button-${key.toLowerCase()}`}
                onClick={(e) => {
                    e.preventDefault();
                    if(clickedButtons[0] === key || clickedButtons[1] === key) {
                        setClickedButtons(["",""]);
                    } else if(clickedButtons[0] !== "" && clickedButtons[1] !== "") {
                        if(clickedButtons[0] === key || clickedButtons[1] === key) {
                            setClickedButtons(["",""]);
                        } else {
                            setClickedButtons(["", key]);
                        }
                    } else {
                        setClickedButtons([clickedButtons[1], key]);
                    }
                }} 
                className={`type-button text-light ${clickedButtons.includes(key) ? "black" : ""}`}

            >
                <strong>{key}</strong>
            </button>
        )
    }
    return (
        <>
            <div className="container-fluid d-flex justify-content-center">
                <div className="type-grid">
                    {buttons.map((button) => button)}
                </div>
            </div>
        </>
    )
}

export default TypeButtons;