import React, { useEffect, useState } from 'react';
import PokemonTable from '../table/PokemonTable';
import { COLUMNS } from '../utils/columns';
import { useHistory, useLocation } from 'react-router-dom';
import NavBar from '../sub-components/NavBar';
import Switch from 'react-switch';
import CardContainer from '../sub-components/CardContainer';
import CardFilter from '../sub-components/CardFilter';
import Footer from '../sub-components/Footer';

const Home = () => {

    const history = useHistory();
    const [pokemonRows, setPokemonRows] = useState([]);
    const location = useLocation();
    const [tabular, setTabular] = useState(false);
    const [filter, setFilter] = useState();
    const [pageSize, setPageSize] = useState();

    const fetchGeneralPokemonData = () => {
        return fetch('/pokemon/all').then((response) => {
            return response.json();
        }).then((responseJSON) => {
            return responseJSON;
        })
    }

    useEffect(() => {
        let mounted = true;
        fetchGeneralPokemonData().then((info) => {
            //Make sure component is still mounted before setting state
            if(mounted) {
                setPokemonRows(info);
            }
        });
        return () => {
            mounted = false;
        }
    }, [])

    // Navigates to view page once a specific row in the table was clicked
    const handleRowSelection = (row) => {
        history.push('/view', {name: row.original.Name, id: row.original.Number, type: pokemonRows[ row.original.Number - 1].types[0]});
    }

    // Handles navigation for the next pokemon button
    const handleNext = () => {
        if(location.pathname === '/') {
            history.push('/view', {name: "Bulbasaur", id: 1});
        } else if(location.pathname === '/view') {
            if(location.state.id === 898) {
                history.push('/view', {name: "Bulbasaur", id: 1});
            } else {
                fetch(`/pokemon/${parseInt(location.state.id) + 1}`)
                .then((response) => response.json())
                .then((responseJSON) => history.push('/view', {name: responseJSON.name, id: parseInt(location.state.id) + 1}));
            }
        }
    }

    // Handles navigation for the previous pokemon button
    const handlePrevious = () => {
        if(location.pathname === '/') {
            history.push('/view', {name: "Calyrex", id: 898});
        } else if(location.pathname === '/view') {
            if(location.state.id === 1) {
                history.push('/view', {name: "Calyrex", id: 898});
            } else {
                fetch(`/pokemon/${parseInt(location.state.id) - 1}`)
                .then((response) => response.json())
                .then((responseJSON) => history.push('/view', {name: responseJSON.name, id: parseInt(location.state.id) - 1}));
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
            <NavBar 
                routes={[
                    {title: "Home", onClick: () => {history.push("/")}},
                    {title: "Previous Pokemon", onClick: () => {handlePrevious()}},
                    {title: "Next Pokemon", onClick: () => {handleNext()}},
                    {title: "Create Pokemon", onClick: () => {history.push("/create")}}
                ]}
                color={`${tabular ? "#2a75bb" : "rgb(237,41,57)"}`}
            />
            <div className="d-flex flex-column align-items-center w-100">
                <div className="container-fluid">
                    <div className="col d-flex justify-content-center align-items-center w-100">
                        <h1 style={{color: `${tabular ? "#2a75bb" : "rgb(237,41,57)"}`}}><strong>Pokedex</strong></h1>
                    </div>
                    <div className="d-flex flex-column align-items-center pb-2">
                        <h2 style={{padding: 0, margin: 0, color: `${tabular ? "#2a75bb" : "rgb(237,41,57)"}`}}><strong>{`${tabular ? "(Tabular)" : "(Card)"}`}</strong></h2>
                        <Switch  
                            className="mt-2"
                            onChange={() => {
                                setTabular(!tabular);
                                setFilter("");
                                setPageSize(4);
                            }} 
                            checked={tabular} 
                            onColor={"#0275d8"} 
                            offColor={"#d9534f"}
                            uncheckedIcon={false}
                            checkedIcon={false}
                        />
                    </div>
                </div>
                {tabular ?
                    <div className="container">
                        <PokemonTable 
                            pokemonRows={pokemonRows} 
                            pokemonColumns={COLUMNS} 
                            pageSize={10} 
                            searchText={"Search For Pokemon:"} 
                            handleRowSelection={handleRowSelection}
                        />
                    </div>
                :
                    <div className="container d-flex flex-column align-items-center">
                        <CardFilter onChange={setPageSize} placeholder={"Set cards per page"} type={"number"}/>
                        <CardFilter onChange={setFilter} placeholder={"Search for pokemon"} type={"text"}/>
                        <button 
                            onClick={() => {history.push("/custom-pokemons")}} 
                            style={{fontSize: 14, fontFamily: "cursive", marginRight: "2px", color: "white"}} 
                            className="btn btn-danger"
                        >
                            View Custom Pokemon
                        </button>
                        {pokemonRows.length ? 
                            <CardContainer pokemonRows={pokemonRows} pageSize={pageSize ? pageSize : 4} filter={filter ? filter : ""}/>
                        :
                            ""
                        }
                    </div>
                }
            </div>
            <div style={{flex: 1}}></div>
            <Footer color={`${tabular ? "#2a75bb" : "rgb(237,41,57)"}`}/>
        </div>
    )
}

export default Home;