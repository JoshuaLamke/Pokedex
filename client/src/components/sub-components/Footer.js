import React from 'react';
import {Navbar , Nav, Container} from 'react-bootstrap';
import PokeApiLogo from '../../assets/pokeapi.png';
import GithubLogo from '../../assets/github.png';
import '../../styles/navbar.css';

const Footer = ({ color }) => {
    const navBackground = color ? color : "dark";

    return (
        <>
            <nav>
                <Navbar bg={`${navBackground}`} style={{background: navBackground}} variant="dark" expand="md">
                    <Container>
                        <Navbar.Brand className="d-flex align-items-center navbar-link" href="https://joshua-lamke-portfolio.netlify.app/" target="_blank" style={{cursor: "pointer"}}>
                            Created By Joshua Lamke,
                        </Navbar.Brand>
                        <Navbar.Brand className="d-flex align-items-center navbar-link" href="https://pokeapi.co/" target="_blank" style={{cursor: "pointer"}}>
                            Powered by: 
                            <img width="100px" height="auto" alt="pokeapi-logo" className="mx-2" src={PokeApiLogo} />
                        </Navbar.Brand>
                        <Nav className="me-auto"></Nav>
                        <Nav>
                            <Navbar.Brand className="d-flex align-items-center navbar-link" style={{color: "white"}} target="_blank" href="https://github.com/JoshuaLamke">
                                GitHub {" "} <img width="auto" height="35px" alt="github" className="mx-2" src={GithubLogo} />
                            </Navbar.Brand>
                        </Nav>
                    </Container>
                </Navbar>
            </nav>
        </>
    )
}

export default Footer;