import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { typeColors } from "../utils/typeColors";
import '../../styles/card.css';
import { getImgByType } from '../utils/typeImages';

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
                className="clickable d-flex flex-column align-items-center rounded pt-2" 
                onClick={() => {routeToPokemonInfo()}} 
                style={{
                    background: `${types.length > 1 ? `linear-gradient(${typeColors[types[0]]},${typeColors[types[1]]})` : typeColors[types[0]]}`,
                    boxShadow: `0px 10px 50px 0 rgba${typeColors[types[0]].substring(3, typeColors[types[0]].length - 1)},.3)`, 
                    height: "375px"
                }}
            >
                <h3 
                    style={{fontFamily: "cursive", color: "white"}} 
                >
                    {name}
                </h3>
                {number ? <h3 style={{fontFamily: "cursive", color: "white"}}>{`#${number}`}</h3> : ""}
                <img src={imageSrc} alt={""} style={{width: "200px", height: "auto"}}/>
                <div className="d-flex justify-content-center">
                    {types.map((type, index) => {
                        return <img 
                                    src={getImgByType(type)} 
                                    style={{boxShadow: `0px 0px 50px black)`}} 
                                    alt="pokemon-type" 
                                    height="40px" 
                                    width="40px" 
                                    className="mx-3"
                                    key={index} 
                                />
                    })}
                </div>
            </div>
        </>
    )
}

export default Card;