import React, { useEffect, useState } from 'react';
import CustomCardContainer from '../sub-components/CustomCardContainer';
import NavBar from '../sub-components/NavBar';
import { useHistory } from 'react-router';
import Footer from '../sub-components/Footer';
import { FormControl, TextField, Select, MenuItem } from '@mui/material';
import { typeColors } from '../utils/typeColors';
import PokedexLogo from '../../assets/PokedexLogo.png';


const CustomPokemon = () => {
    const [pokemonInfo, setPokemonInfo] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [filter, setFilter] = useState();
    const [typeFilter, setTypeFilter] = useState("");
    const [sortFilter, setSortFilter] = useState("Name (Asc)");
    const [pageSize, setPageSize] = useState(4);
    const history = useHistory();

    useEffect(() => {
        let mounted = true;
        fetch("/custom-pokemon")
        .then((response) => response.json())
        .then((responseJSON) => {
            setTimeout(() => {
                // Make sure component is mounted before setting state
                if(mounted) {
                    setPokemonInfo(responseJSON);
                    setLoaded(true);
                }
            }, 250)
        })
        return () => {
            mounted = false;
        }
    }, [])

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
            {loaded 
            ? 
                <>
                    <NavBar 
                        routes={[
                            {title: "Home", onClick: () => {history.push("/")}}
                        ]}
                        color={`rgb(176,38,255)`}
                        onChange={setFilter} 
                        placeholder={"Search for pokemon"}
                    />
                        <div className="container d-flex flex-column align-items-center text-center">
                            <h1 style={{color: "rgb(176,38,255)"}} className="text-center d-flex align-items-center">
                                Custom 
                                <img src={PokedexLogo} height="50px" width="144px" alt="pokedex logo" className="ms-2 my-2" />
                            </h1>
                            <div className="container d-flex flex-column align-items-center">
                            <div className="filter-grid">
                                <div className="d-flex flex-column align-items-center">
                                    <h3 style={{color: "rgb(176,38,255)"}}>Change Cards Per Page</h3>
                                    <TextField 
                                        value={pageSize} 
                                        onChange={handlePageChange} 
                                        label="Cards Per Page" 
                                        style={{height: "56px", width: "220px"}}
                                        type={"number"} 
                                        variant="filled"
                                        className="mt-2 mb-3"
                                    />
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                    <h3 style={{color: "rgb(176,38,255)"}}>Filter Type</h3>
                                    <FormControl>
                                        <Select
                                            onChange={handleTypeChange}
                                            value={typeFilter}
                                            variant="filled"
                                            className="mt-2 mb-3"
                                            style={{height: "56px", width: "220px"}}
                                            >
                                            <MenuItem key={"All Types"} value={"All Types"}>All Types</MenuItem>
                                            {Object.keys(typeColors)
                                            .sort()
                                            .map((key) => <MenuItem key={key} value={key}>{key}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                    <h3 style={{color: "rgb(176,38,255)"}}>Sort Pokemon</h3>
                                    <FormControl>
                                        <Select
                                            onChange={handleSortChange}
                                            value={sortFilter}
                                            variant="filled"
                                            className="mt-2 mb-3"
                                            style={{height: "56px", width: "220px"}}
                                            >
                                            <MenuItem key={"Name (Asc)"} value={"Name (Asc)"}>
                                                Name (Asc)
                                            </MenuItem>
                                            <MenuItem key={"Name (Desc)"} value={"Name (Desc)"}>
                                                Name (Desc)
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                        <CustomCardContainer 
                            pokemon={pokemonInfo} 
                            pageSize={pageSize ? pageSize : 4} 
                            filter={filter ? filter : ""} 
                            typeFilter={typeFilter} 
                            sortBy={sortFilter}
                        />
                    </div> 
                    <div style={{flex: 1}}></div>
                    <Footer color="rgb(176,38,255)"/>
                </>
            : 
                <div style={{height: "100vh"}} className="d-flex flex-column align-items-center justify-content-center">
                    <h1 className="text-center">{`Loading Custom Pokemon...`}</h1>
                    <img alt="loading gif" style={{width: "250px", height: "auto"}} src={"https://i.pinimg.com/originals/c7/0d/03/c70d03b7a06ae41c6e955d03c08714d7.gif"}/>
                    <img alt="loading gif" style={{width: "250px", height: "auto"}} src={"https://media0.giphy.com/media/jM4bWFBKpSFeo/giphy.gif"}/>
                </div>
            }
        </div>
    )
}

export default CustomPokemon;