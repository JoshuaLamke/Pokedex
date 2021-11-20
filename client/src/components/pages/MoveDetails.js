import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import NavBar from '../sub-components/NavBar';
import '../../styles/moveDetails.css'
import { typeColors } from '../utils/typeColors';
import Bar from '../sub-components/Bar';
import Footer from '../sub-components/Footer';


const MoveDetails = () => {
    const history = useHistory();
    const location = useLocation();
    const moveInfo = location.state;
    
    return (
        <div 
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column"
            }}
        >   
            <NavBar routes={[
                {title: "Home", onClick: () => {history.push("/")}}
            ]}/>
            <div className="container-fluid d-flex flex-column align-items-center">
                <h1 style={{color: `${typeColors[moveInfo.type]}`}}>Move Details For {moveInfo.name}</h1>
                <img id="pokemon-image" src={moveInfo.picture} alt="pokemon pic"/>
            </div>
            <div className="container-fluid d-flex flex-column align-items-center">
                <h2 style={{color: `${typeColors[moveInfo.type]}`}}>Description</h2>
                <div className="col-12 col-md-9 text-center">
                    <p>{moveInfo.description}</p>
                </div>
            </div>
            <div className="container-fluid d-flex justify-content-center">
                <h2 style={{color: `${typeColors[moveInfo.type]}`}}>Stats</h2>
            </div>
            <Bar 
                statName="Power" 
                statValue={moveInfo.power ? moveInfo.power : 0} 
                background="green" 
                max={150} 
                textColor={`${typeColors[moveInfo.type]}`}
            />
            <Bar 
                statName="Accuracy" 
                statValue={moveInfo.accuracy ? moveInfo.accuracy : 0} 
                background="blue" 
                max={150} 
                textColor={`${typeColors[moveInfo.type]}`}
            />
            <div className="container-fluid d-flex justify-content-center">
                <h2 style={{color: `${typeColors[moveInfo.type]}`}}>Type</h2>
            </div>
            <div className="container-fluid d-flex justify-content-center mb-3">
                <div className="container-fluid d-flex justify-content-center mb-3">
                    <div className="container -fluid d-flex flex-column align-items-center">
                        <div 
                            className="text-center shadow border mb-2 rounded" 
                            style={{
                                width: "200px", 
                                background: `${typeColors[moveInfo.type]}`, 
                                color: "white", 
                                fontFamily: "cursive", 
                                boxShadow: `0 5px 10px 0 ${typeColors[moveInfo.type]}`
                            }}
                        >
                            <span><strong>{moveInfo.type}</strong></span>
                        </div>
                    </div>
                </div> 
            </div> 
            <div className="container d-flex justify-content-center">
                <button 
                    className="btn btn-success mb-3" 
                    onClick={() => {
                        history.push("/moves", {name: moveInfo.pokemonName, url: moveInfo.url, id: moveInfo.id, moves: moveInfo.moves})
                    }}
                >
                    Back To Moves
                </button>
            </div>
            <div style={{flex: 1}}></div>
            <Footer />
        </div>
    )
}

export default MoveDetails;