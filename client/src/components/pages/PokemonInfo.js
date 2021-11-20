import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { capitalize } from '../utils/utility';
import NavBar from '../sub-components/NavBar'
import '../../styles/pokemonInfo.css'
import Bar from '../sub-components/Bar';
import { typeColors } from '../utils/typeColors';
import Footer from '../sub-components/Footer';
import LevelUpMoves from '../sub-components/LevelUpMoves';
import GameVersionSelector from '../sub-components/GameVersionSelector';
import Abilities from '../sub-components/Abilities';
import VERSIONS from '../utils/versions';

const PokemonInfo = () => {
    const [pokemonInfo, setPokemonInfo] = useState({});
    const [pokemonMoves, setPokemonMoves] = useState([]);
    const history = useHistory();
    const location = useLocation();
    const [isLoaded, setIsLoaded] = useState(location.state.isLoaded);
    const [version, setVersion] = useState('red-blue');

    const type = location.state.type;
    let name = useLocation().state.name;
    name = capitalize(name);
    const id = useLocation().state.id;

    const findFirstGameVersion = (pokemonMoves) => {
        for(let i = 0; i < VERSIONS.length; i++) {
            const arr = pokemonMoves.filter((move) => move.version_group_details.filter((move) => move["level_learned_at"] > 0 && move["version_group"].name === VERSIONS[i]).length);
            if(arr.length) {
                setVersion(VERSIONS[i]);
                break;
            }
        }
        
    }

    // Navigates to moves list page for a specific pokemon
    const handleViewMoves = () => {
        const levelUpMoves = pokemonMoves.filter((move) => move.version_group_details.filter((move) => move["level_learned_at"] > 0 && move["version_group"].name === version).length > 0); 
        const levelUpMovesNames = levelUpMoves.map((move) => move.move.name);
        history.push("/moves", {
            moves: levelUpMovesNames, 
            name: capitalize(pokemonInfo.name), 
            url: pokemonInfo.sprites, 
            id: id
        });
    }
    
    useEffect(() => {
        let mounted = true;
        fetch(`/pokemon/${id}`).then((response) => {
            return response.json();
        }).then((responseJSON) => {
            //Formatting data to be displayed better
            responseJSON.weight /= 10;
            responseJSON.weight += " kilograms";
            responseJSON.height /= 10;
            responseJSON.height += " meters";
            let capitalizedTypes = responseJSON.types.map(type => capitalize(type));
            let capitalizedAbilities =  responseJSON.abilities.map((ability) => {
                let capName = capitalize(ability.name);
                return {name: capName, hidden: ability.hidden}
            });
            responseJSON = {
                ...responseJSON,
                types: capitalizedTypes,
                abilities: capitalizedAbilities
            }
            return responseJSON;
        }).then((info) => {
            // Delay .25 seconds to show cute loading gifs. 
            // Otherwise they flash across screen and look bad.
            setTimeout(() => {
                // Makes sure component is mounted before setting state
                if(mounted) {
                    setPokemonInfo({...info, moves: info.moves.map((move) => move.move.name)});
                    setPokemonMoves(info.moves);
                    findFirstGameVersion(info.moves);
                    setIsLoaded(true);
                }
            }, 250)
        });
        return () => {
            mounted = false;
        }
    }, [id])

    // Handles navigation for the next pokemon button
    const handleNext = () => {
        if(location.pathname === '/') {
            setIsLoaded(false);
            history.push('/view', {name: "Bulbasaur", id: 1});
        } else if(location.pathname === '/view') {
            if(location.state.id === 898) {
                setIsLoaded(false);
                history.push('/view', {name: "Bulbasaur", id: 1});
            } else {
                fetch(`/pokemon/${parseInt(location.state.id) + 1}`)
                .then((response) => response.json())
                .then((responseJSON) => {
                    setIsLoaded(false);
                    history.push('/view', {name: responseJSON.name, id: parseInt(location.state.id) + 1})
                });
            }
        }
    }

    // Handles navigation for the previous pokemon button
    const handlePrevious = () => {
        if(location.pathname === '/') {
            setIsLoaded(false);
            history.push('/view', {name: "Calyrex", id: 898});
        } else if(location.pathname === '/view') {
            if(location.state.id === 1) {
                setIsLoaded(false);
                history.push('/view', {name: "Calyrex", id: 898});
            } else {
                fetch(`/pokemon/${parseInt(location.state.id) - 1}`)
                .then((response) => response.json())
                .then((responseJSON) => {
                    setIsLoaded(false);
                    history.push('/view', {name: responseJSON.name, id: parseInt(location.state.id) - 1})
                });
            }
        }
    }

    return (
        <div 
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column"
            }}
        >  
            {isLoaded ? 
                <>
                    <NavBar routes={[
                        {title: "Home", onClick: () => {history.push("/")}},
                        {title: "Previous Pokemon", onClick: () => handlePrevious()},
                        {title: "Next Pokemon", onClick: () => handleNext()}
                    ]}/>
                    <div className="container-fluid pt-3 d-flex flex-column align-items-center">
                        <GameVersionSelector version={version} setVersion={setVersion} />
                        <h1 className="pb-2" style={{color: `${typeColors[pokemonInfo.types[0]]}`}}>{name + ` #${id}`}</h1>
                        <img id="pokemon-img" src={`${pokemonInfo.sprites}`} alt={`${name} pic`}/>
                        <div className="container d-flex justify-content-center text-center">
                            <h5>{pokemonInfo.description}</h5>
                        </div>
                    </div>
                    <div className="container-fluid d-flex justify-content-center">
                        <h2 style={{color: `${typeColors[pokemonInfo.types[0]]}`}}>Stats</h2>
                    </div>
                    <Bar statName="HP" statValue={pokemonInfo.stats ? pokemonInfo.stats[0] : 0} background="green" textColor={`${typeColors[pokemonInfo.types[0]]}`}/>
                    <Bar statName="Attack" statValue={pokemonInfo.stats ? pokemonInfo.stats[1] : 0} background="red" textColor={`${typeColors[pokemonInfo.types[0]]}`}/>
                    <Bar statName="Defense" statValue={pokemonInfo.stats ? pokemonInfo.stats[2] : 0} background="orange" textColor={`${typeColors[pokemonInfo.types[0]]}`}/>
                    <Bar statName="SP-Atk" statValue={pokemonInfo.stats ? pokemonInfo.stats[3] : 0} background="purple" textColor={`${typeColors[pokemonInfo.types[0]]}`}/>
                    <Bar statName="SP-Def" statValue={pokemonInfo.stats ? pokemonInfo.stats[4] : 0} background="brown" textColor={`${typeColors[pokemonInfo.types[0]]}`}/>
                    <Bar statName="Speed" statValue={pokemonInfo.stats ? pokemonInfo.stats[5] : 0} background="blue" textColor={`${typeColors[pokemonInfo.types[0]]}`}/>
                    <div className="container-fluid d-flex justify-content-center">
                        <h2 style={{color: `${typeColors[pokemonInfo.types[0]]}`}}>Types</h2>
                    </div>
                    <div className="container-fluid d-flex justify-content-center mb-3">
                        <div className="container -fluid d-flex flex-column align-items-center">
                            {!!pokemonInfo.types 
                            && 
                            pokemonInfo.types.map((type, index) => (
                                <div 
                                    className="text-center shadow border mb-2 rounded" 
                                    style={{
                                        width: "200px", 
                                        background: `${typeColors[type]}`, 
                                        color: "white", 
                                        fontFamily: "cursive", 
                                        boxShadow: `0 5px 10px 0 ${typeColors[type]}`
                                    }} 
                                    key={index}
                                >
                                    <span><strong>{type}</strong></span>
                                </div>
                            ))}
                        </div>
                    </div> 
                    <Abilities pokemonInfo={pokemonInfo} />
                    {!!pokemonMoves.filter((move) => move.version_group_details.filter((move) => move["level_learned_at"] > 0 && move["version_group"].name === version).length > 0).length ?
                     <>
                        <LevelUpMoves gameVersion={version} moves={pokemonMoves} pokemonInfo={pokemonInfo}/>
                        <div className="container-fluid d-flex flex-column align-items-center">
                            <button 
                                style={{
                                    marginBottom: "1em", 
                                    background: typeColors[pokemonInfo.types[0]]}} 
                                    onClick={() => handleViewMoves()} 
                                    className="btn text-light"
                            >
                                <strong>View All Move Info</strong>
                            </button>
                        </div>
                     </> :
                     <div className="text-center">
                        <h3>No Moves For Selected Game Version!</h3>
                     </div>
                    }
                    <div style={{flex: 1}}></div>
                    <Footer />
                </>
            : 
                <div className="d-flex flex-column align-items-center justify-content-center" style={{height: "100vh"}}>
                    <h1 className="text-center" style={{color: typeColors[type]}}>{`Loading ${name}'s Information...`}</h1>
                    <img alt="loading gif" style={{width: "250px", height: "auto"}} src={"https://c.tenor.com/q16e8L6YA30AAAAj/helicopter-raichu.gif"}/>
                    <img alt="loading gif" style={{width: "250px", height: "auto"}} src={"https://thumbs.gfycat.com/BrokenForkedElephant-max-1mb.gif"}/>
                </div> 
            }
        </div>
    )
}

export default PokemonInfo;