import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { typeColors } from "../utils/typeColors";
import '../../styles/card.css';

const Card = ({name, imageSrc, types, number, moveInfo }) => {
    const history = useHistory();
    const location = useLocation();
    let moves;
    let pokemonName;
    let id;
    if(moveInfo) {
        moves = location.state.moves;
        pokemonName = location.state.name;
        id = location.state.id;
    }

    // Route to either the pokemon info page or specific move detail page
    // If there is move information then route to move details, otherwise go to pokemon info page
    const routeToPokemonInfo = () => {
        if(!moveInfo) {
            history.push("/view", {name: name, id: number, type: types[0]});
        } else {
            history.push('/move/details', {...moveInfo[0], pokemonName: pokemonName, picture: imageSrc, moves: moves, url: imageSrc, id: id});
        }
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
                    className="d-flex justify-content-center align-items-center px-2 card-name-container" 
                >
                    <h3 
                        style={{color: `rgba${typeColors[types[0]].substring(3, typeColors[types[0]].length - 1)},1.5)`, fontFamily: "cursive"}} 
                        className="card-name"
                    >
                        {name}
                    </h3>
                </div>
                {number ? <h3 style={{color: `${typeColors[types[0]]}`, fontFamily: "cursive"}}>{`#${number}`}</h3> : ""}
                <img src={imageSrc} alt={""} style={{width: "200px", height: "auto"}}/>
                <div className="d-flex flex-column align-items-center">
                    {types.map((type, index) => <div className="text-center shadow border mb-2 rounded" style={{width: "100px", background: `${typeColors[type]}`, boxShadow: `0px 10px 50px 0 rgba${typeColors[types[0]].substring(3, typeColors[types[0]].length - 1)},.3)`, color: "white", fontFamily: "cursive"}} key={index}><span><strong>{type}</strong></span></div>)}
                </div>
            </div>
        </>
    )
}

export default Card;