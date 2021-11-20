import React from 'react';
import { useHistory } from 'react-router-dom';

const PageNotFound = () => {
    const history = useHistory();

    // Routes to home on button click
    const handleClick = () => {
        history.push("/");
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{height: "100vh"}}>
            <div>
                <h1 className="text-center">Page Not Found.</h1>
            </div>
            <div>
                <button className="btn btn-primary" onClick={handleClick}>Back</button>
            </div>
        </div>
    )
}

export default PageNotFound;