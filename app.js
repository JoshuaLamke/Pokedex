const express = require('express')
const fetch = require('node-fetch')
const path = require('path');
const admin = require('firebase-admin'); 
const cors = require('cors')
const app = express()
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());
app.use(cors());

// If json credentials exist, use it
// Otherwise, use the config var
let serviceAccount;
if (fs.existsSync('./swe-432-hw3-fe757-firebase-adminsdk-4ooff-096b4f91bd.json')) {
    serviceAccount = require('./swe-432-hw3-fe757-firebase-adminsdk-4ooff-096b4f91bd.json');
} else {
    serviceAccount = JSON.parse(process.env.FIREBASE_KEY);
}   

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
let db = admin.firestore();

app.get('/', (req, res) => {
  res.status(200).json({response: 'Hello World!'})
})

// Extracts the object to be returned by the pokemonInfo endpoint
const setPokemonInfoObject = (responsesJSON, id) => {
    let stats = responsesJSON[1].stats;
    let baseStats = stats.map((stat) => stat.base_stat);
    let abilities = responsesJSON[1].abilities;
    let baseAbilities = abilities.map((ability) => {return {name: ability.ability.name, hidden: ability.is_hidden}})
    let moves = responsesJSON[1].moves;
    let pokemonInfoObj;
    if(id <= 807) {
        pokemonInfoObj = {
            height: responsesJSON[1].height,
            weight: responsesJSON[1].weight,
            name: responsesJSON[1].name,
            moves: moves,
            stats: baseStats,
            abilities: baseAbilities,
            types: responsesJSON[0][0].types,
            description: responsesJSON[0][0].description ? responsesJSON[0][0].description : "",
            sprites: responsesJSON[0][0].sprite
        }
    } else {
        let types = responsesJSON[1].types.map((type) => type.type.name);
        pokemonInfoObj = {
            height: responsesJSON[1].height ? responsesJSON[1].height : "",
            weight: responsesJSON[1].weight ? responsesJSON[1].weight : "",
            name: responsesJSON[1].name ? responsesJSON[1].name : "",
            moves: moves,
            sprites: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`,
            stats: baseStats ? baseStats : "",
            abilities: baseAbilities ? baseAbilities : "",
            types: types ? types : ""
        }
    }
    return pokemonInfoObj;
}

// Gets all the image url's for the pokemon
const getSprites = async () => {
    let url = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/";
    let sprites = [];
    for(let i = 0; i < 898; i++) {
        if(i + 1 < 10) {
            sprites.push(url + `00${i+1}.png`);
            continue;
        } 
        if(i + 1 < 100) {
            sprites.push(url + `0${i+1}.png`);
            continue;
        }
        sprites.push(url + `${i+1}.png`);
    }
    return sprites;
}

//Gets info object for the pokemon card 
const getCardInfo = async () => {
    let sprites = await getSprites();
    let nums = []
    for(let i = 0; i < 898; i++) {
        nums.push(i + 1);
    }

    let responses = await Promise.all(nums.map((num) => fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)));

    if(responses[0].status === 400) {
        throw new Error("Bad request");
    }
    if(responses[0].status === 404) {
        throw new Error("Pokemon not found");
    }
    if(responses[0].status === 500) {
        throw new Error("Internal server error");
    }

    let responsesJSON = await Promise.all(responses.map((response) => response.json()));
    let pokemonRows = []
    responsesJSON.forEach((response, index) => {
        let typesArr = response.types.map((type) => type.type.name.charAt(0).toUpperCase() + type.type.name.substr(1));
        let rowObj = {
            types: typesArr,
            Name: response.name.charAt(0).toUpperCase() + response.name.substr(1),
            src: sprites[index],
            Number: index + 1
        }
        pokemonRows.push(rowObj);
    })

    return pokemonRows;
}

app.get('/pokemon/all', async (req, res) => {
        //Check firebase first for data
        let pokemon = await db.collection("pokemon-names").doc("pokemon").get()
        if(pokemon.exists) {
            res.status(200).json(pokemon.data().pokemon);
            return;
        } 
        //If not in firebase, make api request
        try {
            const pokemonRows = await getCardInfo(); 
            //Set data in firebase since it wasnt there
            await db.collection("pokemon-names").doc("pokemon").set({pokemon: pokemonRows});
            res.status(200).json(pokemonRows);
        } catch(e) {
            res.status(400).send(e.message);
            return;
        }
})

app.get('/pokemon/:id', async (req, res) => {
    let id = req.params.id;
    try{
        //Check firebase first for data
        let pokemon = await db.collection("pokemon-info").doc(id).get();
        if(pokemon.exists) {
            res.status(200).json(pokemon.data());
            return;
        } 
        //If not in firebase, make api requests
        let urls = [`https://pokeapi.glitch.me/v1/pokemon/${id}`,`https://pokeapi.co/api/v2/pokemon/${id}`]
        let responses = await Promise.all(urls.map((url) => fetch(url)));
        if(responses[1].status === 200) {
            let responsesJSON = await Promise.all(responses.map((response) => response.json()));
            //Get pokemon info object from api responses
            const pokemonInfoObj = setPokemonInfoObject(responsesJSON, id);
            //Set pokemon info in firebase since it wasnt there
            await db.collection("pokemon-info").doc(id).set(pokemonInfoObj);
            res.status(200).json(pokemonInfoObj);
        } else if(responses[1].status === 404) {
            res.status(404).json({"Error": `Cannot find pokemon info`})
        } 
    } catch(e) {
        console.log(e);
        res.status(500).json({"Error": `Something went wrong with the request`})
    }
})

app.get("/moves/:name", async (req, res) => {
    const name = req.params.name;
    try{
        //Check firebase first for data
        let moves = await db.collection("moves-info").doc(name).get();
        if(moves.exists) {
            res.status(200).json(moves.data());
            return;
        } 
        const response = await fetch(`https://pokeapi.co/api/v2/move/${name}`);
        if(response.status === 200) {
            const responseJSON = await response.json();
            let movesObj = {
                name: name,
                accuracy: responseJSON.accuracy,
                power: responseJSON.power,
                description: responseJSON["effect_entries"][0]["effect"],
                type: responseJSON.type.name
            }
            if(movesObj.description.includes("$effect_chance")) {
                //replacing $effect_chance with actual value for effect chance from api
                movesObj.description = movesObj.description.replace(/\$effect_chance/g, responseJSON["effect_chance"]);
            }
            //Set moves info in firebase since it wasnt there
            await db.collection("moves-info").doc(name).set(movesObj);
            res.status(200).json(movesObj);
        } else if(response.status === 404) {
            res.status(404).json({"Error": `Cannot find move ${name}`})
        } 
    } catch(e) {
        console.log(e);
        res.status(500).json({"Error": `Something went wrong with the request`})
    }
})

app.post("/pokemon", async (req, res) => {
    const pokemonInfo = req.body;
    try {
        await db.collection("custom-pokemon").doc(pokemonInfo.name).set(pokemonInfo);
        res.status(200).send({"Success": "Successfully added pokemon"});
    } catch(e) {
        res.status(500).send({"Error": "Something went wrong with the server"});
    }
})

app.get("/custom-pokemon", async (req, res) => {
    try{
        const collection = await db.collection("custom-pokemon").get();
        const customPokemon = collection.docs.map((doc) => doc.data());
        res.status(200).send(customPokemon);
    } catch(e) {
        res.status(500).send({"Error": "Something went wrong with the server."});
    }
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

module.exports = app;