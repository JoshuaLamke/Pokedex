import React from 'react';
import { typeColors } from '../utils/typeColors';
import '../../styles/type-buttons.css';
import { getImgByType } from '../utils/typeImages';

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
                className={`type-button d-flex align-items-center justify-content-between text-light ${clickedButtons.includes(key) ? "black" : ""}`}

            >
                {key}
                <img 
                    src={getImgByType(key)} 
                    height="20px" 
                    width="20px"
                    style={{borderRadius: "50%", boxShadow: `0px 0px 5px black`}} 
                    alt="type-button" 
                />
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