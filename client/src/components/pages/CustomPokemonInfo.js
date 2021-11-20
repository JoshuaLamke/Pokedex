import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { capitalize } from '../utils/utility';
import NavBar from '../sub-components/NavBar'
import '../../styles/pokemonInfo.css'
import Bar from '../sub-components/Bar';
import { typeColors } from '../utils/typeColors';
import Footer from '../sub-components/Footer';


const CustomPokemonInfo = () => {
    const history = useHistory();
    const location = useLocation();
    const pokemonInfo = location.state;

    let name = useLocation().state.name;
    name = capitalize(name);

    return (
        <div 
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column"
            }}
        >   
            <NavBar 
                routes={[
                    {title: "Home", onClick: () => {history.push("/")}}
                ]}
                color="rgb(176,38,255)"
            />
            <div className="container-fluid pt-3 d-flex flex-column align-items-center">
                <h1 style={{color: `${typeColors[pokemonInfo.types[0]]}`}} className="mb-2">
                    {capitalize(pokemonInfo.name)}
                </h1>
                <img id="custom-pokemon-img" src={`${pokemonInfo.image}`} alt={`${name} pic`}/>
                <div className="container d-flex justify-content-center text-center my-2">
                    <h5>{pokemonInfo.description}</h5>
                </div>
            </div>
            <div className="container-fluid d-flex justify-content-center">
                <h2 style={{color: `${typeColors[pokemonInfo.types[0]]}`}}>Stats</h2>
            </div>
            <Bar statName="HP" statValue={pokemonInfo.stats ? pokemonInfo.stats.hp : 0} background="green" textColor={`${typeColors[pokemonInfo.types[0]]}`}/>
            <Bar statName="Attack" statValue={pokemonInfo.stats ? pokemonInfo.stats.atk : 0} background="red" textColor={`${typeColors[pokemonInfo.types[0]]}`}/>
            <Bar statName="Defense" statValue={pokemonInfo.stats ? pokemonInfo.stats.def : 0} background="orange" textColor={`${typeColors[pokemonInfo.types[0]]}`}/>
            <Bar statName="SP-Atk" statValue={pokemonInfo.stats ? pokemonInfo.stats.sp_atk : 0} background="purple" textColor={`${typeColors[pokemonInfo.types[0]]}`}/>
            <Bar statName="SP-Def" statValue={pokemonInfo.stats ? pokemonInfo.stats.sp_def : 0} background="brown" textColor={`${typeColors[pokemonInfo.types[0]]}`}/>
            <Bar statName="Speed" statValue={pokemonInfo.stats ? pokemonInfo.stats.speed : 0} background="blue" textColor={`${typeColors[pokemonInfo.types[0]]}`}/>
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
            <div className="container-fluid d-flex justify-content-center">
                <h2 style={{color: `${typeColors[pokemonInfo.types[0]]}`}}>Abilities</h2>
            </div>
            <div className="container-fluid d-flex justify-content-center mb-3">
                <ul className="list-group d-flex flex-column align-items-center">
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
                        <span><strong>{pokemonInfo.ability}</strong></span>
                    </div> 
                </ul>
            </div> 
            <div className="container-fluid d-flex justify-content-center">
                <h2 style={{color: `${typeColors[pokemonInfo.types[0]]}`}}>Hidden Abilities</h2>
            </div>
            <div className="container-fluid d-flex justify-content-center mb-3">
                <ul className="list-group d-flex flex-column align-items-center">
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
                        <span><strong>{pokemonInfo.hidden_ability}</strong></span>
                    </div> 
                </ul>
            </div> 
            <div className="container-fluid d-flex flex-column align-items-center">
                <h2 className="mb-2" style={{color: `${typeColors[pokemonInfo.types[0]]}`}}>Moves</h2>
                <button 
                    style={{
                        marginBottom: "1em", 
                        background: typeColors[pokemonInfo.types[0]]}} 
                        onClick={() => history.push("/custom-pokemons")} 
                        className="btn text-light"
                >
                    <strong>Back</strong>
                </button>
            </div>
            <div style={{flex: 1}}></div>
            <Footer color="rgb(176,38,255)"/>
        </div>
    )
}

export default CustomPokemonInfo;