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
const setPokemonInfoObject = (responseJSON, id) => {
    let stats = responseJSON.stats;
    let baseStats = stats.map((stat) => stat.base_stat);
    let abilities = responseJSON.abilities;
    let baseAbilities = abilities.map((ability) => {return {name: ability.ability.name, hidden: ability.is_hidden}})
    let moves = responseJSON.moves;
    let pokemonInfoObj;
    let types = responseJSON.types.map((type) => type.type.name);
    pokemonInfoObj = {
        height: responseJSON.height,
        weight: responseJSON.weight,
        name: responseJSON.name,
        moves: moves,
        stats: baseStats,
        abilities: baseAbilities,
        types: types,
        sprites: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id < 10 ? `00${id}`: (id < 100 ? `0${id}` : id)}.png`
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
        let url = `https://pokeapi.co/api/v2/pokemon/${id}`
        let response = await fetch(url);
        if(response.status === 200) {
            let responseJSON = await response.json();
            //Get pokemon info object from api responses
            const pokemonInfoObj = setPokemonInfoObject(responseJSON, id);
            //Set pokemon info in firebase since it wasnt there
            await db.collection("pokemon-info").doc(id).set(pokemonInfoObj);
            res.status(200).json(pokemonInfoObj);
        } else if(response.status === 404) {
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

const getEvoChain = async (responseJSON) => {
    let evoChain = responseJSON.chain;
    let names = [[evoChain["species"]["name"]]];
    //Array of names without order of evolution to make it easier to fetch info using promise.all
    let namesUnchained = [evoChain["species"]["name"]];
    evoChain = evoChain['evolves_to']
    do {
        let arr = [];
        for(let i = 0; i < evoChain.length; i++) {
            arr.push(evoChain[i]["species"]["name"]);
            namesUnchained.push(evoChain[i]["species"]["name"]);
        }
        names.push(arr);
        let temp = evoChain;
        evoChain = [];
        for(let i = 0; i < temp.length; i++) {
            for(let j = 0; j < temp[i]["evolves_to"].length; j++) {
                evoChain.push(temp[i]["evolves_to"][j]);
            }
        }

    } while(!!evoChain && evoChain[0]) 
    if(namesUnchained.includes("urshifu")) {
        namesUnchained[namesUnchained.indexOf("urshifu")] = "urshifu-single-strike";
    }
    if(namesUnchained.includes("deoxys")) {
        namesUnchained[namesUnchained.indexOf("deoxys")] = "deoxys-normal";
    }
    if(namesUnchained.includes("wormadam")) {
        namesUnchained[namesUnchained.indexOf("wormadam")] = "wormadam-plant";
    }
    if(namesUnchained.includes("giratina")) {
        namesUnchained[namesUnchained.indexOf("giratina")] = "giratina-altered";
    }
    if(namesUnchained.includes("shaymin")) {
        namesUnchained[namesUnchained.indexOf("shaymin")] = "shaymin-land";
    }
    if(namesUnchained.includes("basculin")) {
        namesUnchained[namesUnchained.indexOf("basculin")] = "basculin-red-striped";
    }
    if(namesUnchained.includes("darmanitan")) {
        namesUnchained[namesUnchained.indexOf("darmanitan")] = "darmanitan-standard";
    }
    if(namesUnchained.includes("thundurus")) {
        namesUnchained[namesUnchained.indexOf("thundurus")] = "thundurus-incarnate";
    }
    if(namesUnchained.includes("tornadus")) {
        namesUnchained[namesUnchained.indexOf("tornadus")] = "tornadus-incarnate";
    }
    if(namesUnchained.includes("landorus")) {
        namesUnchained[namesUnchained.indexOf("landorus")] = "landorus-incarnate";
    }
    if(namesUnchained.includes("meowstic")) {
        namesUnchained[namesUnchained.indexOf("meowstic")] = "meowstic-male";
    }
    if(namesUnchained.includes("pumpkaboo")) {
        namesUnchained[namesUnchained.indexOf("pumpkaboo")] = "pumpkaboo-average";
    }
    if(namesUnchained.includes("gourgeist")) {
        namesUnchained[namesUnchained.indexOf("gourgeist")] = "gourgeist-average";
    }
    if(namesUnchained.includes("oricorio")) {
        namesUnchained[namesUnchained.indexOf("oricorio")] = "oricorio-baile";
    }
    if(namesUnchained.includes("lycanroc")) {
        namesUnchained[namesUnchained.indexOf("lycanroc")] = "lycanroc-midday";
    }
    if(namesUnchained.includes("wishiwashi")) {
        namesUnchained[namesUnchained.indexOf("wishiwashi")] = "wishiwashi-solo";
    }
    if(namesUnchained.includes("minior")) {
        namesUnchained[namesUnchained.indexOf("minior")] = "minior-red-meteor";
    }
    if(namesUnchained.includes("mimikyu")) {
        namesUnchained[namesUnchained.indexOf("mimikyu")] = "mimikyu-disguised";
    }
    if(namesUnchained.includes("toxtricity")) {
        namesUnchained[namesUnchained.indexOf("toxtricity")] = "toxtricity-amped";
    }
    if(namesUnchained.includes("eiscue")) {
        namesUnchained[namesUnchained.indexOf("eiscue")] = "eiscue-ice";
    }
    if(namesUnchained.includes("indeedee")) {
        namesUnchained[namesUnchained.indexOf("indeedee")] = "indeedee-male";
    }
    if(namesUnchained.includes("zacian")) {
        namesUnchained[namesUnchained.indexOf("zacian")] = "zacian-hero";
    }
    if(namesUnchained.includes("zamazenta")) {
        namesUnchained[namesUnchained.indexOf("zamazenta")] = "zamazenta-hero";
    }
    if(namesUnchained.includes("meloetta")) {
        namesUnchained[namesUnchained.indexOf("meloetta")] = "meloetta-aria";
    }
    if(namesUnchained.includes("aegislash")) {
        namesUnchained[namesUnchained.indexOf("aegislash")] = "aegislash-shield";
    }
    if(namesUnchained.includes("keldeo")) {
        namesUnchained[namesUnchained.indexOf("keldeo")] = "keldeo-ordinary";
    }

    let responses = await Promise.all(namesUnchained.map((name) => fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)));
    const responsesJSON = await Promise.all(responses.map((response) => response.json()));
    const ids = responsesJSON.map((response) => response.id);
    const url = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/";
    const images = ids.map((id, index) => {
        if(id < 10) {
            return {
                image: url + `00${id}.png`,
                name: namesUnchained[index],
                id: id
            }
        } 
        if(id < 100) {
            return {
                image: url + `0${id}.png`,
                name: namesUnchained[index],
                id: id
            }
        }
        return {
            image: url + `${id}.png`,
            name: namesUnchained[index],
            id: id
        }
    })
    let nameArrSizes = names.map((namesArr) => namesArr.length);
    let index = 0;
    let chainedInfo = nameArrSizes.map((size) => {
        let arr = [];
        for(let i = 0; i < size; i++) {
            arr.push(images[index]);
            index++;
        }
        return arr;
    })
    return chainedInfo;
}

app.get("/evolution-info/:name", async (req, res) => {
    const name = req.params.name;
    try{
        //Check firebase first for data
        const evolutionChain = await db.collection("evolution-chains").doc(name).get();
        if(evolutionChain.exists) {
            let data = evolutionChain.data();
            data.evolutionChain = data.evolutionChain.map((data) => data.arr);
            res.status(200).json(data);
            return;
        } 
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
        if(response.status === 200) {
            const responseJSON = await response.json();
            const evoChainResponse = await fetch(responseJSON.evolution_chain.url);
            const evoChainResponseJSON = await evoChainResponse.json();
            const evoChain = await getEvoChain(evoChainResponseJSON);
            const evoChainObj = {
                happiness: responseJSON.base_happiness,
                captureRate: responseJSON.capture_rate,
                color: responseJSON.color ? responseJSON.color.name : "",
                habitat: responseJSON.habitat ? responseJSON.habitat.name : "",
                isBaby: responseJSON.is_baby,
                isLegendary: responseJSON.is_legendary,
                isMythical: responseJSON.is_mythical,
                shape: responseJSON.shape ? responseJSON.shape.name : "",
                eggGroups: responseJSON.egg_groups ? responseJSON.egg_groups.map((group) => group.name) : [],
                descriptions: responseJSON.flavor_text_entries ? responseJSON.flavor_text_entries.map((entry) => {
                    return {
                        language: entry.language.name,
                        description: entry.flavor_text,
                        version: entry.version.name
                    }
                }).filter((entry) => entry.language == "en") : [],
                evolutionChain: evoChain
            }
            //Set evo chain info in firebase since it wasnt there
            await db.collection("evolution-chains").doc(name).set({...evoChainObj, evolutionChain: evoChain.map((arr) => {return {arr}})});
            res.status(200).json(evoChainObj);
        } else if(response.status === 404) {
            res.status(404).json({"Error": `Cannot find evolution chain for ${name}`})
        } 
    } catch(e) {
        console.log(e);
        res.status(500).json({"Error": `Something went wrong with the request`})
    }
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

module.exports = app;