import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from '../pages/Home';
import MoveDetails from "../pages//MoveDetails";
import PageNotFound from '../pages/PageNotFound';
import PokemonInfo from "../pages/PokemonInfo";
import PokemonMoves from "../pages/PokemonMoves";
import CreatePokemon from "../pages/CreatePokemon";
import CustomPokemon from "../pages/CustomPokemon";
import CustomPokemonInfo from "../pages/CustomPokemonInfo";
import ScrollToTop from "./ScrollToTop";

const Routes = () => {
    return (
        <Router>
            <ScrollToTop />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/view">
                    <PokemonInfo />
                </Route>
                <Route exact path="/moves">
                    <PokemonMoves />
                </Route>
                <Route exact path="/create">
                    <CreatePokemon />
                </Route>
                <Route exact path="/custom-pokemons">
                    <CustomPokemon />
                </Route>
                <Route exact path="/view-custom">
                    <CustomPokemonInfo />
                </Route>
                <Route exact path="/move/details">
                    <MoveDetails />
                </Route>
                <Route exact path="*">
                    <PageNotFound />
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes;