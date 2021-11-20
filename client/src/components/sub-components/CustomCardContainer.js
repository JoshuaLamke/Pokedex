import React, { useState } from "react";
import "../../styles/card-container.css";
import CustomCard from "./CustomCard";
import { capitalize } from "../utils/utility";

const CustomCardContainer = ({pokemon, pageSize, filter}) => {
    const [page, setPage] = useState(0);
    const filteredPokemon = pokemon.filter(({name}) => {return filter ? name.toLowerCase().includes(filter.toLowerCase().trim()) : true});
    
    return (
        <>
            <div className="container-fluid">
                <div className="grid">
                        {filteredPokemon.map((pokemon, index) => {
                            if(index > (page * pageSize) - 1 && index <= (page * pageSize) + (pageSize - 1)) {
                                return <CustomCard key={index} imageSrc={pokemon.image} name={capitalize(pokemon.name)} types={pokemon.types} pokemonInfo={pokemon} />
                            }
                            return ""
                        })}
                </div>
            </div>
            <div className="container d-flex justify-content-center mb-3">
                <button 
                    disabled={page <= 0} 
                    onClick={() => {setPage(0)}} 
                    style={{width: "50px", fontSize: 14, fontFamily: "cursive", marginRight: "2px", color: "white"}} 
                    className="btn btn-danger"
                >
                    {"<<"}
                </button>
                <button 
                    disabled={page <= 0} 
                    onClick={() => {setPage(page - 1)}} 
                    style={{width: "80px", fontSize: 14, fontFamily: "cursive", marginRight: "2px", color: "white"}} 
                    className="btn btn-danger"
                >
                    Previous
                </button>
                <button 
                    disabled={page >= Math.ceil(filteredPokemon.length/pageSize) - 1} 
                    onClick={() => {setPage(page + 1)}} 
                    style={{width: "80px", fontSize: 14, fontFamily: "cursive", marginRight: "2px", color: "white"}} 
                    className="btn btn-danger"
                >
                    Next
                </button>
                <button 
                    disabled={page >= Math.ceil(filteredPokemon.length/pageSize) - 1} 
                    onClick={() => {setPage(Math.ceil(filteredPokemon.length/pageSize) - 1)}} 
                    style={{width: "50px", fontSize: 14, fontFamily: "cursive", color: "white"}} 
                    className="btn btn-danger"
                >
                    {">>"}
                </button>
            </div>
        </>
    )
}

export default CustomCardContainer;