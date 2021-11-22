import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { DoubleArrow } from '@material-ui/icons';
import  Card from "./Card";
import "../../styles/card-container.css";

const MoveCardContainer = ({moveRows, pageSize, picture, filter, typeFilter, sortBy}) => {
    const [page, setPage] = useState(0);
    const filteredMoves = moveRows.filter(({name, type}) => {
        let passSearchFilter = true;
        let passTypeFilter = true;

        if(filter || typeFilter) {
            if(filter) {
                passSearchFilter = name.toLowerCase().includes(filter.toLowerCase().trim());
            }
            if(typeFilter) {
                if(typeFilter !== "All type") {
                    passTypeFilter = type.includes(typeFilter);   
                }
            }
            return passSearchFilter && passTypeFilter;
        } else {
            return true;
        }
    }).sort((a, b) => {
        if(sortBy === "Name (Asc)") {
            if(a.name.toUpperCase() < b.name.toUpperCase()) {
                return -1;
            } else if(a.name.toUpperCase() > b.name.toUpperCase()) {
                return 1;
            } else {
                return 0;
            }
        } else if(sortBy === "Name (Desc)") {
            if(a.name.toUpperCase() > b.name.toUpperCase()) {
                return -1;
            } else if(a.name.toUpperCase() < b.name.toUpperCase()) {
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
    },[filter, pageSize])

    return (
        <>
            <div className="container-fluid">
                <div className="grid">
                        {filteredMoves.map(({name, type}, index) => {
                            if(index > (page * pageSize) - 1 && index <= (page * pageSize) + (pageSize - 1)) {
                                let types = [type];       
                                const moveInfo = moveRows.filter((move) => move.name === name);
                                return <Card key={index} imageSrc={picture} name={name} types={types} moveInfo={moveInfo} />
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
                    disabled={page >= Math.ceil(filteredMoves.length/pageSize) - 1} 
                    onClick={() => {setPage(page + 1)}} 
                >
                    Next
                </Button>
                <Button 
                    className="page-button"
                    variant="contained"
                    disabled={page >= Math.ceil(filteredMoves.length/pageSize) - 1} 
                    onClick={() => {setPage(Math.ceil(filteredMoves.length/pageSize) - 1)}} 
                >
                    <DoubleArrow />
                </Button>
            </div>
        </>
    )
}

export default MoveCardContainer;