import React, { useState } from 'react';
import  Card from "./Card";
import "../../styles/card-container.css";

const MoveCardContainer = ({moveRows, pageSize, picture, filter}) => {
    const [page, setPage] = useState(0);
    const filteredMoves = moveRows.filter(({name}) => {return filter ? name.toLowerCase().includes(filter.toLowerCase().trim()) : true});

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
                    disabled={page >= Math.ceil(filteredMoves.length/pageSize) - 1} 
                    onClick={() => {setPage(page + 1)}} 
                    style={{width: "80px", fontSize: 14, fontFamily: "cursive", marginRight: "2px", color: "white"}} 
                    className="btn btn-danger"
                >
                    Next
                </button>
                <button 
                    disabled={page >= Math.ceil(filteredMoves.length/pageSize) - 1} 
                    onClick={() => {setPage(Math.ceil(filteredMoves.length/pageSize) - 1)}} 
                    style={{width: "50px", fontSize: 14, fontFamily: "cursive", color: "white"}} 
                    className="btn btn-danger"
                >
                    {">>"}
                </button>
            </div>
        </>
    )
}

export default MoveCardContainer;