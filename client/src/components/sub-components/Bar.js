import React from 'react';

const Bar = ({statValue, statName, background, max, textColor}) => {
    return (
        <>
            <div className="container d-flex justify-content-center">
                <div className="col-9 col-md-6 col-lg-6 d-flex">
                    <p style={{width: "120px", color: textColor}}>{statName}</p>
                    <div 
                        className="w-100 d-flex align-items-center justify-content-start" 
                        style={{height:"20px", borderRadius: "5px", background: "rgb(105,105,105,0.5)"}}
                    >
                        {statValue ?
                            <div className="h-100 d-flex justify-content-start align-items-center" style={{background: `${background}`, borderRadius: "5px", width: `${max ? statValue / max * 100 : statValue/2}%`}}>
                                <span style={{paddingLeft: "2px", color: "white"}}>{`${statValue}`}</span>
                            </div>
                        :
                            <span style={{paddingLeft: "2px", color: "white"}}>{`N/A`}</span>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Bar;