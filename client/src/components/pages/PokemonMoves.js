import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { capitalize } from '../utils/utility';
import NavBar from '../sub-components/NavBar';
import MoveCardContainer from "../sub-components/MoveCardContainer";
import Footer from '../sub-components/Footer';
import { typeColors } from '../utils/typeColors';
import { FormControl, NativeSelect, TextField, Button } from '@material-ui/core';
import GlobalFilter from '../table/GlobalFilter';
import "../../styles/pokemonMoves.css";

const PokemonMoves = () => {
    const [moveRows, setMoveRows] = useState([]);
    const history = useHistory();
    const location = useLocation();
    const moves = location.state.moves;
    const pictureURL = location.state.url;
    const pokemonName = location.state.name;
    const id = location.state.id;
    const [pageSize, setPageSize] = useState(4);
    const [filter, setFilter] = useState();
    const [typeFilter, setTypeFilter] = useState("");
    const [sortFilter, setSortFilter] = useState("Name (Asc)");

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

    const handlePageChange = (e) => {
        setPageSize(e.target.value);
    }
    const handleTypeChange = (e) => {
        setTypeFilter(e.target.value);
    }
    const handleSortChange = (e) => {
        setSortFilter(e.target.value);
    }

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
                    <div className="filter-grid">
                        <div className="d-flex flex-column align-items-center">
                            <h3 style={{color: "rgb(237,41,57)"}}>Change Cards Per Page</h3>
                            <FormControl>
                                <TextField 
                                    value={pageSize} 
                                    onChange={handlePageChange}
                                    style={{height: "56px", width: "220px"}}
                                    type={"number"} 
                                    variant="filled"
                                    className="mt-2 mb-3"
                                />
                            </FormControl>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <h3 style={{color: "rgb(237,41,57)"}}>Filter Type</h3>
                            <FormControl>
                                <NativeSelect
                                    onChange={handleTypeChange}
                                    value={typeFilter}
                                    variant="filled"
                                    className="mt-2 mb-3"
                                    style={{height: "56px", width: "220px"}}
                                >
                                    <option key={"All Types"} className="ms-1" value={"All Types"}>{"All Types"}</option>
                                    {Object.keys(typeColors)
                                    .sort()
                                    .map((key) => <option key={key} value={key}>{key}</option>)}
                                </NativeSelect>
                            </FormControl>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <h3 style={{color: "rgb(237,41,57)"}}>Sort Pokemon</h3>
                            <FormControl>
                                <NativeSelect
                                    onChange={handleSortChange}
                                    value={sortFilter}
                                    variant="filled"
                                    className="mt-2 mb-3"
                                    style={{height: "56px", width: "220px"}}
                                >
                                    <option key={"Name (Asc)"} value={"Name (Asc)"}>
                                        Name (Asc)
                                    </option>
                                    <option key={"Name (Desc)"} value={"Name (Desc)"}>
                                        Name (Desc)
                                    </option>
                                </NativeSelect>
                            </FormControl>
                        </div>
                        <div className="d-flex flex-column align-items-center justify-content-between">
                            <h3 style={{color: "rgb(237,41,57)"}}>Search Moves</h3>
                            <div style={{height: "56px", width: "220px"}}>
                                <GlobalFilter onChange={setFilter} placeholder={"Search"} filter={filter}/>
                            </div>
                        </div>
                    </div>
                    <MoveCardContainer 
                        moveRows={moveRows} 
                        picture={pictureURL} 
                        pageSize={pageSize ? pageSize : 4} 
                        filter={filter ? filter : ""}
                        sortBy={sortFilter}
                        typeFilter={typeFilter}
                    />
                </div>
                <Button 
                    onClick={() => {history.push("/view", {name: pokemonName, id: id})}} 
                    variant="contained"
                    className="mb-2"
                    id="back-to-info-btn"
                >
                    Back To {pokemonName} Info
                </Button>
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