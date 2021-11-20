import React from 'react';
import { useHistory } from 'react-router-dom';
import { typeColors } from "../utils/typeColors";
import '../../styles/card.css';

const CustomCard = ({name, imageSrc, types, pokemonInfo }) => {
    const history = useHistory();

    // Route to either the pokemon info page or specific move detail page
    // If there is move information then route to move details, otherwise go to pokemon info page
    const routeToPokemonInfo = () => {
        history.push("/view-custom", pokemonInfo);
    }

    return (
        <>
            <div 
                id="card"
                className="clickable d-flex flex-column align-items-center bg-light rounded pt-2" 
                onClick={() => {routeToPokemonInfo()}} 
                style={{boxShadow: `inset 0px 10px 50px 0 rgba${typeColors[types[0]].substring(3, typeColors[types[0]].length - 1)},.3),  0px 10px 50px 0 rgba${typeColors[types[0]].substring(3, typeColors[types[0]].length - 1)},.3)`, border: `1px solid rgba${typeColors[types[0]].substring(3, typeColors[types[0]].length - 1)},.3)`, height: "375px"}}
            >
                <div 
                    className="d-flex justify-content-center align-items-center px-3 mb-3 card-name-container" 
                >
                    <h3 
                        style={{color: `rgba${typeColors[types[0]].substring(3, typeColors[types[0]].length - 1)},1.5)`, fontFamily: "cursive", margin: "none", padding: "none"}} 
                        className="card-name"
                    >
                        {name}
                    </h3>
                </div>
                <img src={imageSrc} className="mb-3" alt={""} style={{width: "200px", maxHeight: "200px"}}/>
                <div className="d-flex flex-column align-items-center justify-content-end mb-2" style={{height: "100%"}}>
                    {types.map((type, index) => <div className="text-center shadow border mb-2 rounded" style={{width: "100px", background: `${typeColors[type]}`, boxShadow: `0px 10px 50px 0 rgba${typeColors[types[0]].substring(3, typeColors[types[0]].length - 1)},.3)`, color: "white", fontFamily: "cursive"}} key={index}><span><strong>{type}</strong></span></div>)}
                </div>
            </div>
        </>
    )
}

export default CustomCard;