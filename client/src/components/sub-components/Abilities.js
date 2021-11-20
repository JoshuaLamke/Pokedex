import React from 'react';
import { typeColors } from '../utils/typeColors';

const Abilities = ({pokemonInfo}) => {
    
    return (
        <>
            <div className="container-fluid d-flex justify-content-center">
                <h2 style={{color: `${typeColors[pokemonInfo.types[0]]}`}}>Abilities</h2>
            </div>
            <div className="container-fluid d-flex justify-content-center mb-3">
                <ul className="list-group d-flex flex-column align-items-center">
                    {!!pokemonInfo.abilities && 
                        pokemonInfo.abilities.map((ability, index) => (
                            !ability.hidden 
                                ? 
                                <div 
                                    className="text-center shadow border mb-2 rounded" 
                                    style={{
                                        width: "200px", 
                                        background: `${typeColors[pokemonInfo.types[0]]}`, 
                                        color: "white", 
                                        fontFamily: "cursive", 
                                        boxShadow: `0 5px 10px 0 ${typeColors[pokemonInfo.types[0]]}`
                                    }} 
                                    key={index}
                                ><span><strong>{ability.name}</strong></span>
                                </div> 
                                : 
                                ""
                            ))
                    }
                    {!!pokemonInfo.abilities 
                    && 
                    !pokemonInfo.abilities.filter((ability) => !ability.hidden).length 
                    && 
                    <div 
                        className="text-center shadow border mb-2 rounded" 
                        style={{
                            width: "200px", 
                            background: `${typeColors[pokemonInfo.types[0]]}`, 
                            color: "white", 
                            fontFamily: "cursive", 
                            boxShadow: `0 5px 10px 0 ${typeColors[pokemonInfo.types[0]]}`
                        }}
                    >
                        <span><strong>{"None"}</strong></span>
                    </div>
                    }
                </ul>
            </div> 
            <div className="container-fluid d-flex justify-content-center">
                <h2 style={{color: `${typeColors[pokemonInfo.types[0]]}`}}>Hidden Abilities</h2>
            </div>
            <div className="container-fluid d-flex justify-content-center mb-3">
                <ul className="list-group d-flex flex-column align-items-center">
                    {!!pokemonInfo.abilities 
                    && 
                    pokemonInfo.abilities.map((ability, index) => (
                        ability.hidden 
                        ? 
                        <div 
                            className="text-center shadow border mb-2 rounded" 
                            style={{
                                width: "200px", 
                                background: `${typeColors[pokemonInfo.types[0]]}`, 
                                color: "white", 
                                fontFamily: "cursive", 
                                boxShadow: `0 5px 10px 0 ${typeColors[pokemonInfo.types[0]]}`
                            }} 
                            key={index}
                        >
                            <span><strong>{ability.name}</strong></span>
                        </div> 
                        : 
                        ""
                    ))}
                    {!!pokemonInfo.abilities 
                    && 
                    !pokemonInfo.abilities.filter((ability) => ability.hidden).length
                    && 
                    <div 
                        className="text-center shadow border mb-2 rounded" 
                        style={{
                            width: "200px", 
                            background: `${typeColors[pokemonInfo.types[0]]}`, 
                            color: "white", 
                            fontFamily: "cursive", 
                            boxShadow: `0 5px 10px 0 ${typeColors[pokemonInfo.types[0]]}`
                        }}
                    >
                        <span><strong>{"None"}</strong></span>
                    </div>
                    }
                </ul>
            </div> 
        </>
    )
}

export default Abilities;