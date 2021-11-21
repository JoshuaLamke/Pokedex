import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../sub-components/NavBar';
import { Form, Row } from 'react-bootstrap';
import '../../styles/create-pokemon.css';
import TypeButtons from '../sub-components/TypeButtons';
import CreatePokemonFormControl from '../sub-components/CreatePokemonFormControl';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormData } from '../utils/CreateFormData';
import Footer from '../sub-components/Footer';


const CreatePokemon = () => {

    const history = useHistory();
    const [clickedButtons, setClickedButtons] = useState(["", ""]);
    const stats = ["HP", "Atk", "Def", "SP_Atk", "SP_Def", "Speed"];
    const [page, setPage] = useState(1);

    const {
        control,
        register,
        handleSubmit,
        getValues,
        formState: {
            errors
        }
    } = useForm({
        mode: "all",
        defaultValues: {
            ...FormData.default()
        },
        resolver: yupResolver(FormData)
    })

    const checkValue = (val) => {
        return !(val !== undefined && val !== null && val !== "");
    }

    const disabled = () => {
        const val = getValues();
        return (
            checkValue(val.name) ||
            checkValue(val.desc) ||
            checkValue(val.HP) ||
            checkValue(val.Atk) ||
            checkValue(val.Def) ||
            checkValue(val.SP_Atk) ||
            checkValue(val.SP_Def) ||
            checkValue(val.Speed) ||
            checkValue(val.ability) ||
            checkValue(val.hidden_ability) ||
            checkValue(val.image) ||
            (!clickedButtons[0] && !clickedButtons[1]) ||
            Object.keys(errors).length !== 0
        );
    }

    const submit = async (e) => {
        await submitForm();
    }

    const submitForm = async () => {
        let types = clickedButtons.filter((type) => type !== "");
        let data = getValues();
        const pokemonInfo = {
            name: data.name.trim(),
            description: data.desc.trim(),
            stats: {
                hp: parseInt(data.HP.trim()),
                atk: parseInt(data.Atk.trim()),
                def: parseInt(data.Def.trim()),
                sp_atk: parseInt(data.SP_Atk.trim()),
                sp_def: parseInt(data.SP_Def.trim()),
                speed: parseInt(data.Speed.trim()),
            },
            types: types,
            ability: data.ability.trim(),
            hidden_ability: data.hidden_ability.trim(),
            image: data.image
        } 
        const response = await fetch("/pokemon", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pokemonInfo)
        })
        
        if(response.status === 200) {
            alert(`Successfully created pokemon ${data.name}!`);
            history.push("/");
        } else {
            alert("Something went wrong. Please try again later.")
            history.push("/");
        }
    }

    return (
        <div 
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column"
            }}
        >
            <NavBar 
                routes={[
                    {title: "Home", onClick: () => {history.push("/")}}
                ]}
                color="rgb(176,38,255)"    
            />
            <div className="container text-center create-form-container">
                <h1 data-testid="form-header" style={{color: "rgb(176,38,255)"}}>Create A Pokemon!</h1>
                <h3 style={{color: "rgb(176,38,255)"}}>(<span style={{color: "red", fontSize: "20"}}>*</span> Required)</h3>
                <Form onSubmit={handleSubmit(submit)}>
                    <Form.Group as={Row} data-testid="name-form-group" className={`container-fluid d-flex align-items-center m-0 ${page !== 1 ? "hidden" : ""}`}>
                        <h3 className="form-label">Name<span data-testid="asterisk" style={{color: "red", fontSize: "20"}}>*</span></h3>
                        <CreatePokemonFormControl 
                            className="form-field" 
                            size="lg" 
                            type="text" 
                            rows="1"
                            testId={"name-input"} 
                            control={control}  
                            errors={errors}
                            inputRef={register}
                            name={"name"}
                            placeholder="Pokemon Name" 
                        />
                    </Form.Group>
                    <Form.Group as={Row} className={`container-fluid d-flex align-items-center m-0 ${page !== 1 ? "hidden" : ""}`}>
                        <h3 className="form-label">Description<span style={{color: "red", fontSize: "20"}}>*</span></h3>
                        <CreatePokemonFormControl 
                            className="form-field" 
                            as="textarea"
                            size="lg" 
                            rows="3" 
                            control={control}  
                            errors={errors}
                            inputRef={register}
                            name={"desc"}
                            placeholder="Description of Pokemon" 
                        />
                    </Form.Group>
                    <Form.Group as={Row} className={`container-fluid d-flex align-items-center mx-0 mb-3 ${page !== 1 ? "hidden" : ""}`}>
                        <h3 className="form-label">Image (Paste URL)<span style={{color: "red", fontSize: "20"}}>*</span></h3>
                        <CreatePokemonFormControl 
                            className="form-field" 
                            size="lg" 
                            type="text" 
                            rows="1" 
                            control={control}  
                            errors={errors}
                            inputRef={register}
                            name={"image"}
                            placeholder="URL for image" 
                        />
                    </Form.Group>
                    <Form.Group as={Row} className={`container-fluid d-flex align-items-center m-0 ${page !== 2 ? "hidden" : ""}`}>
                        <h3 className="form-label">Types<span style={{color: "red", fontSize: "20"}}>*</span></h3>
                        <TypeButtons clickedButtons={clickedButtons} setClickedButtons={setClickedButtons}/>
                    </Form.Group>
                    <Form.Group as={Row} className={`container-fluid d-flex align-items-center m-0 ${page !== 3 ? "hidden" : ""}`}>
                        <div className="stat-grid">
                            {stats.map((stat) => {
                                return (
                                    <div className="d-flex flex-column align-items-center" key={stat}>
                                        <h3 style={{color: "rgb(176,38,255)"}}>{stat}<span style={{color: "red", fontSize: "20"}}>*</span></h3>
                                        <CreatePokemonFormControl 
                                            className="form-field" 
                                            size="lg" 
                                            rows="1" 
                                            control={control}  
                                            errors={errors}
                                            inputRef={register}
                                            style={{width: "100px", alignSelf: "center", justifySelf: "center"}}
                                            name={stat} 
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </Form.Group>
                    <Form.Group as={Row} className={`container-fluid d-flex align-items-center m-0 ${page !== 4 ? "hidden" : ""}`}>
                        <h3 className="form-label">Ability<span style={{color: "red", fontSize: "20"}}>*</span></h3>
                        <CreatePokemonFormControl 
                            className="form-field" 
                            size="lg" 
                            type="text" 
                            rows="1" 
                            control={control}  
                            errors={errors}
                            inputRef={register}
                            name={"ability"}
                            placeholder="20 Characters Max" 
                        />
                    </Form.Group>
                    <Form.Group as={Row} className={`container-fluid d-flex align-items-center mx-0 mb-4 ${page !== 4 ? "hidden" : ""}`}>
                        <h3 className="form-label">Hidden Ability<span style={{color: "red", fontSize: "20"}}>*</span></h3>
                        <CreatePokemonFormControl 
                            className="form-field" 
                            size="lg" 
                            type="text" 
                            rows="1" 
                            control={control}  
                            errors={errors}
                            inputRef={register}
                            name={"hidden_ability"}
                            placeholder="20 Characters Max" 
                        />
                    </Form.Group>
                    <div className="container d-flex justify-content-center mb-2">
                        <button 
                            disabled={page <= 1} 
                            onClick={() => {setPage(page - 1);}} 
                            type="button"
                            data-testid="back-button"
                            style={{
                                width: `${page === 4 ? "135px" : "100px"}`, 
                                background: "rgb(176,38,255)",
                                boxShadow: "none", 
                                fontSize: 14,
                                marginRight: `${page === 4 ? "0px" : "5px"}`, 
                                color: "white"
                            }} 
                            className="btn"
                        >
                            Back
                        </button>
                        <button 
                            disabled={page >= 4} 
                            onClick={() => {setPage(page + 1);}} 
                            type="button"
                            data-testid="next-button"
                            style={{
                                width: "100px", 
                                background: "rgb(176,38,255)",
                                boxShadow: "none", 
                                fontSize: 14,
                                marginRight: "2px", 
                                color: "white"
                            }} 
                            className={`btn ${page === 4 ? "hidden" : ""}`}
                        >
                            Next
                        </button>
                    </div> 
                    <div className="container d-flex justify-content-center mb-2">
                        <button
                            type="submit"
                            className={`btn text-light ${page !== 4 ? "hidden" : ""}`}
                            style={{
                                background: "rgb(176,38,255)",
                                boxShadow: "none",
                                width: "135px"
                            }}
                            disabled={disabled()}
                        >
                            Create Pokemon
                        </button>
                    </div>
                </Form> 
            </div>
            <div style={{flex: 1}}></div>
            <Footer color="rgb(176,38,255)"/>
        </div>
    )
}

export default CreatePokemon;