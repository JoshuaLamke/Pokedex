import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import NavBar from '../sub-components/NavBar';
import CardContainer from '../sub-components/CardContainer';
import { NativeSelect, FormControl } from '@mui/material'
import Footer from '../sub-components/Footer';
import PokedexLogo from '../../assets/PokedexLogo.png';
import { TextField } from "@material-ui/core"
import { typeColors } from '../utils/typeColors';
import '../../styles/Home.css';
import { regions } from '../utils/regions';

const Home = () => {

    const history = useHistory();
    const [pokemonRows, setPokemonRows] = useState([]);
    const location = useLocation();
    const [filter, setFilter] = useState();
    const [typeFilter, setTypeFilter] = useState("");
    const [regionFilter, setRegionFilter] = useState("");
    const [sortFilter, setSortFilter] = useState("Number (Asc)");
    const [pageSize, setPageSize] = useState(4);

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
    const handlePageChange = (e) => {
        setPageSize(e.target.value);
    }
    const handleTypeChange = (e) => {
        setTypeFilter(e.target.value);
    }
    const handleRegionChange = (e) => {
        setRegionFilter(e.target.value);
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
            <NavBar 
                routes={[
                    {title: "Home", onClick: () => {history.push("/")}},
                    {title: "Previous Pokemon", onClick: () => {handlePrevious()}},
                    {title: "Next Pokemon", onClick: () => {handleNext()}},
                    {title: "Create Pokemon", onClick: () => {history.push("/create")}},
                    {title: "View Custom Pokemon", onClick: () => {history.push("/custom-pokemons")}}
                ]}
                color={`${"rgb(237,41,57)"}`}
                onChange={setFilter} 
                placeholder={"Search for pokemon"}
            />
            <div className="d-flex flex-column align-items-center w-100">
                <div className="container-fluid">
                    <div className="col d-flex justify-content-center align-items-center w-100">
                        <img src={PokedexLogo} height="60px" width="166px" alt="pokedex logo" className="my-2" />
                    </div>
                </div>
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
                            <h3 style={{color: "rgb(237,41,57)"}}>Filter Regions</h3>
                            <FormControl>
                                <NativeSelect
                                    native={true}                                
                                    onChange={handleRegionChange}
                                    value={regionFilter}
                                    variant="filled"
                                    className="mt-2 mb-3"
                                    style={{height: "56px", width: "220px"}}
                                >
                                    {Object.keys(regions).map((key) => {
                                        return <option key={key} value={key}>{key}</option>
                                    })}
                                </NativeSelect>
                            </FormControl>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <h3 style={{color: "rgb(237,41,57)"}}>Sort Pokemon</h3>
                            <FormControl>
                                <NativeSelect
                                    native={true}
                                    onChange={handleSortChange}
                                    value={sortFilter}
                                    variant="filled"
                                    className="mt-2 mb-3"
                                    style={{height: "56px", width: "220px"}}
                                >
                                    <option key={"Number (Asc)"} value={"Number (Asc)"}>
                                        Number (Asc)
                                    </option>
                                    <option key={"Number (Desc)"} value={"Number (Desc)"}>
                                        Number (Desc)
                                    </option>
                                    <option key={"Name (Asc)"} value={"Name (Asc)"}>
                                        Name (Asc)
                                    </option>
                                    <option key={"Name (Desc)"} value={"Name (Desc)"}>
                                        Name (Desc)
                                    </option>
                                </NativeSelect>
                            </FormControl>
                        </div>
                    </div>
                    {pokemonRows.length ? 
                        <CardContainer 
                            pokemonRows={pokemonRows} 
                            regionFilter={regionFilter}
                            typeFilter={typeFilter} 
                            pageSize={pageSize ? pageSize : 4} 
                            filter={filter ? filter : ""}
                            sortBy={sortFilter}
                        />
                    :
                        ""
                    }
                </div>
            </div>
            <div style={{flex: 1}}></div>
            <Footer color={`${"rgb(237,41,57)"}`}/>
        </div>
    )
}

export default Home;