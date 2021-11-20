import React from 'react';

const CardFilter = ({onChange, placeholder, type, color}) => {

    return (
        <>
            <section className="input-group mb-2 d-flex justify-content-center">
                <input 
                    type={type} 
                    style={{border: `1px solid ${color ? color : "red"}`, height: "35px", width: "200px", margin: "5px"}} 
                    className="rounded"  
                    placeholder={placeholder} 
                    onChange={(e) => {onChange(e.target.value)}}/>
            </section>
        </>
    )
}

export default CardFilter;