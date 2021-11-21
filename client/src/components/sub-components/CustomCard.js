import React from 'react';
import { useHistory } from 'react-router-dom';
import { typeColors } from "../utils/typeColors";
import '../../styles/card.css';
import { getImgByType } from '../utils/typeImages';

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
                style={{
                    background: `${types.length > 1 ? `linear-gradient(${typeColors[types[0]]},${typeColors[types[1]]})` : typeColors[types[0]]}`,
                    boxShadow: `0px 10px 50px 0 rgba${typeColors[types[0]].substring(3, typeColors[types[0]].length - 1)},.3)`, 
                    height: "375px"
                }}
            >
                <h3 
                    style={{color: `white`, fontFamily: "cursive", margin: "none", padding: "none"}} 
                    className="card-name"
                >
                    {name}
                </h3>
                <img src={imageSrc} className="mb-3" alt={""} style={{width: "200px", maxHeight: "200px"}}/>
                <div className="d-flex flex-column align-items-center justify-content-center mb-2" style={{height: "100%"}}>
                    <div className="d-flex justify-content-center align-items-center">
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
            </div>
        </>
    )
}

export default CustomCard;