import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { capitalize } from '../utils/utility';
import NavBar from '../sub-components/NavBar';
import MoveCardContainer from "../sub-components/MoveCardContainer";
import CardFilter from '../sub-components/CardFilter';
import Footer from '../sub-components/Footer';

const PokemonMoves = () => {
    const [moveRows, setMoveRows] = useState([]);
    const history = useHistory();
    const location = useLocation();
    const moves = location.state.moves;
    const pictureURL = location.state.url;
    const pokemonName = location.state.name;
    const id = location.state.id;
    const [cardPageSize, setCardPageSize] = useState(4);
    const [filter, setFilter] = useState();

    useEffect(() => {
        let mounted = true;
        Promise.all(moves.map((move) => fetch(`/moves/${move}`)))
        .then((responses) => Promise.all(responses.map((response) => response.json())))
        .then((responsesJSON) => {
            let movesObj = responsesJSON.map((move) => {return {...move, name: capitalize(move.name), type: capitalize(move.type)}});
            return movesObj;
        }).then((movesObj) => {
            // Delay .25 seconds to allow loading gif to not flash across screen
            setTimeout(() => {
                // Make sure component is mounted before setting state
                if(mounted) {
                    setMoveRows(movesObj);
                }
            }, 250)
        });
        return () => {
            mounted = false;
        }
    }, [moves])

    return (
        <div 
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column"
            }}
        >  
            {!!moveRows.length &&
                <NavBar 
                    routes={[
                        {title: "Home", onClick: () => {history.push("/")}}
                    ]}
                    color={"rgb(237,41,57)"}
                />
            }
            {id > 807 ?
                <div 
                    className="d-flex flex-column align-items-center text-center justify-content-center"
                    style={{height: "100vh"}}    
                >
                    <h1>Pokemon too new. Moves cannot be fetched at this time.</h1>
                    <button 
                        onClick={() => {history.push("/view", {name: pokemonName, id: id})}} 
                        className="btn btn-success"
                    >
                        Back To {pokemonName} Info
                    </button>
                </div> : ""
            }
            {moveRows.length ?
            <div className="d-flex flex-column align-items-center">
                <h1 style={{color: `${"#cc0000"}`}}>Moves For {pokemonName}</h1>
                <div className="container d-flex flex-column align-items-center">
                    <CardFilter onChange={setCardPageSize} placeholder={"Set cards per page"} type={"number"}/>
                    <CardFilter onChange={setFilter} placeholder={"Search for moves"} type={"text"}/>
                    <MoveCardContainer 
                        moveRows={moveRows} 
                        picture={pictureURL} 
                        pageSize={cardPageSize ? cardPageSize : 4} 
                        filter={filter ? filter : ""}
                    />
                </div>
                <button 
                    onClick={() => {history.push("/view", {name: pokemonName, id: id})}} 
                    className="btn btn-success mb-2"
                >
                    Back To {pokemonName} Info
                </button>
            </div> : ""
            }
            {(!moveRows.length && id < 808) ?
            <div className="d-flex flex-column align-items-center justify-content-center" style={{height: "100vh"}}>
                <h1 className="text-center">{`Loading ${pokemonName}'s Moves...`}</h1>
                <img alt="loading gif" style={{width: "250px", height: "auto"}} src={"https://i.pinimg.com/originals/c7/0d/03/c70d03b7a06ae41c6e955d03c08714d7.gif"}/>
                <img alt="loading gif" style={{width: "250px", height: "auto"}} src={"https://media0.giphy.com/media/jM4bWFBKpSFeo/giphy.gif"}/>
            </div> : ""
            }
            {!!moveRows.length && 
                <>
                    <div style={{flex: 1}}></div>
                    <Footer color={`${"rgb(237,41,57)"}`}/>
                </>
            }
        </div>
    )
}

export default PokemonMoves;