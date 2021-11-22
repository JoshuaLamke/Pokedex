import React, { useEffect, useState } from "react";
import { Button } from '@material-ui/core';
import  Card from "./Card";
import "../../styles/card-container.css";
import { regions } from "../utils/regions";
import { DoubleArrow } from "@material-ui/icons"

const CardContainer = ({pokemonRows, pageSize, filter, typeFilter, regionFilter, sortBy}) => {
    const [page, setPage] = useState(0);
    const filteredPokemon = pokemonRows.filter(({Name, Number, types}) => {
        let passSearchFilter = true;
        let passTypeFilter = true;
        let passRegionFilter = true;

        if(filter || typeFilter || regionFilter) {
            if(filter) {
                passSearchFilter = Name.toLowerCase().includes(filter.toLowerCase().trim());
            }
            if(typeFilter) {
                if(typeFilter !== "All Types") {
                    passTypeFilter = types.includes(typeFilter);   
                }
            }
            if(regionFilter) {
                if(regionFilter !== "All Regions") {
                    passRegionFilter = regions[regionFilter][0] <= Number && regions[regionFilter][1] >= Number;
                }
            }
            return passSearchFilter && passTypeFilter && passRegionFilter;
        } else {
            return true;
        }
    }).sort((a, b) => {
        if(sortBy === "Number (Asc)") {
            if(a.Number < b.Number) {
                return -1;
            } else if(a.Number > b.Number) {
                return 1;
            } else {
                return 0;
            }
        } else if(sortBy === "Number (Desc)") {
            if(a.Number > b.Number) {
                return -1;
            } else if(a.Number < b.Number) {
                return 1;
            } else {
                return 0;
            }
        } else if(sortBy === "Name (Asc)") {
            if(a.Name.toUpperCase() < b.Name.toUpperCase()) {
                return -1;
            } else if(a.Name.toUpperCase() > b.Name.toUpperCase()) {
                return 1;
            } else {
                return 0;
            }
        } else if(sortBy === "Name (Desc)") {
            if(a.Name.toUpperCase() > b.Name.toUpperCase()) {
                return -1;
            } else if(a.Name.toUpperCase() < b.Name.toUpperCase()) {
                return 1;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    });
    
    useEffect(() => {
        setPage(0);
    },[filter, pageSize, typeFilter, regionFilter, sortBy])
    
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
                <Button 
                    className="page-button"
                    variant="contained"
                    disabled={page <= 0} 
                    onClick={() => {setPage(0)}} 
                >
                    <DoubleArrow style={{transform: "rotate(180deg)"}}/>
                </Button>
                <Button 
                    className="page-button"
                    variant="contained"
                    disabled={page <= 0} 
                    onClick={() => {setPage(page - 1)}}
                >
                    Prev
                </Button>
                <Button 
                    className="page-button"
                    variant="contained"                
                    disabled={page >= Math.ceil(filteredPokemon.length/pageSize) - 1} 
                    onClick={() => {setPage(page + 1)}} 
                >
                    Next
                </Button>
                <Button 
                    className="page-button"
                    variant="contained"
                    disabled={page >= Math.ceil(filteredPokemon.length/pageSize) - 1} 
                    onClick={() => {setPage(Math.ceil(filteredPokemon.length/pageSize) - 1)}} 
                >
                    <DoubleArrow />
                </Button>
            </div>
        </>
    )
}

export default CardContainer;