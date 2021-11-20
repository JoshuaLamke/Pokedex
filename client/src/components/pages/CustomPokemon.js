import React, { useEffect, useState } from 'react';
import CustomCardContainer from '../sub-components/CustomCardContainer';
import CardFilter from '../sub-components/CardFilter';
import NavBar from '../sub-components/NavBar';
import { useHistory } from 'react-router';
import Footer from '../sub-components/Footer';


const CustomPokemon = () => {
    const [pokemonInfo, setPokemonInfo] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [filter, setFilter] = useState();
    const [pageSize, setPageSize] = useState();
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
                    />
                    <div className="container d-flex flex-column align-items-center">
                        <h1 style={{color: "rgb(176,38,255)"}}>Custom Pokedex</h1>
                        <CardFilter onChange={setPageSize} placeholder={"Set cards per page"} type={"number"} color="rgb(176,38,255)" />
                        <CardFilter onChange={setFilter} placeholder={"Search for pokemon"} type={"text"} color="rgb(176,38,255)" />
                        <CustomCardContainer pokemon={pokemonInfo} pageSize={pageSize ? pageSize : 4} filter={filter ? filter : ""} />
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