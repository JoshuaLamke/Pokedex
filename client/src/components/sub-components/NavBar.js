import React from 'react';
import { useHistory } from 'react-router-dom';
import {Navbar , Nav, Container} from 'react-bootstrap';
import '../../styles/navbar.css';
import PokedexLogo from '../../assets/PokedexLogo.png';

const NavBar = ({routes, color}) => {
    const history = useHistory();
    const navBackground = color ? color : "dark";

    return (
        <>
            <nav>
                <Navbar bg={`${navBackground}`} style={{background: navBackground}} variant="dark" expand="md">
                    <Container>
                        <Navbar.Brand style={{cursor: "pointer"}} onClick={() => {history.push("/")}}>
                            <img src={PokedexLogo} height="30px" width="83px" alt="pokedex logo" />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="toggle" />
                        <Navbar.Collapse className="navbar-expand-xl"  id="toggle">
                            <Nav className="me-auto"></Nav>
                            <Nav>
                                {routes.map((route, index) => (
                                    <Nav.Link 
                                        key={index} 
                                        className="navbar-link"
                                        onClick={() => route.onClick()}
                                    >
                                        {route.title}
                                    </Nav.Link>
                                ))}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </nav>
        </>
    )
}

export default NavBar;