import React, { useEffect, useState } from 'react';
import { typeColors } from '../utils/typeColors';
import { capitalize } from '../utils/utility';

const LevelUpMoves = ({moves, gameVersion, pokemonInfo}) => {

    const [pokemonMoves, setPokemonMoves] = useState([]);

    useEffect(() => {
        let levelUpMoves = moves.filter((move) => move.version_group_details.filter((move) => move["level_learned_at"] > 0 && move["version_group"].name === gameVersion).length > 0); 
        let levelUpMovesInfo = levelUpMoves.map((move) => {
            const level = move.version_group_details.filter((move) => move["level_learned_at"] > 0)[0]["level_learned_at"];
            const name = move.move.name;
            return {
                name,
                level
            }
        });
        levelUpMovesInfo = levelUpMovesInfo.sort((a, b) => a.level - b.level);
        setPokemonMoves(levelUpMovesInfo);
    }, [gameVersion, moves])

    return (
        <>
            {!!pokemonMoves.length &&
                <div className="container-fluid d-flex justify-content-center">
                    <h2 style={{color: `${typeColors[pokemonInfo.types[0]]}`}}>Learned Moves</h2>
                </div>
            }
            <div className="container-fluid d-flex justify-content-center mb-3">
                <ul className="list-group d-flex flex-column align-items-center">
                    {!!pokemonMoves.length &&
                    pokemonMoves.map((move, index) => (
                        <div 
                            className="d-flex justify-content-between mb-2" 
                            style={{
                                width: "200px", 
                                fontFamily: "cursive", 
                            }} 
                            key={index}
                        >
                            <span><strong>{capitalize(move.name)}</strong></span>
                            <span>{move.level}</span>
                        </div> 
                    ))}
                </ul>
            </div>
        </>
    )
}

export default LevelUpMoves;