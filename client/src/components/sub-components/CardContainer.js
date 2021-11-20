import React, { useState } from "react";
import  Card from "./Card";
import "../../styles/card-container.css";

const CardContainer = ({pokemonRows, pageSize, filter}) => {
    const [page, setPage] = useState(0);
    const filteredPokemon = pokemonRows.filter(({Name}) => {return filter ? Name.toLowerCase().includes(filter.toLowerCase().trim()) : true});
    
    return (
        <>
            <div className="container-fluid">
                <div className="grid">
                        {filteredPokemon.map(({Name, Number, types, src}, index) => {
                            if(index > (page * pageSize) - 1 && index <= (page * pageSize) + (pageSize - 1)) {
                                return <Card key={index} imageSrc={src} name={Name} types={types} number={Number} />
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

export default CardContainer;