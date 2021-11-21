import React from 'react';
import { Form } from 'react-bootstrap';

const GameVersionSelector = ({setVersion, version}) => {
    return (
        <>
            <div className="container-fluid justify-content-center align-items-center d-flex mb-3">
                    <p className="me-1 mb-0">Game Version:</p>
                    <Form.Group>
                        <select
                            
                            value={version}
                            onChange={(e) => {
                                setVersion(e.target.value);
                            }}
                            className="bg-dark text-light form-select"
                            style={{boxShadow: "none", overflowY: "scroll"}}
                        >
                            <option value="red-blue">Red/Blue</option>
                            <option value="yellow">Yellow</option>
                            <option value="gold-silver">Gold/Silver</option>
                            <option value="crystal">Crystal</option>
                            <option value="ruby-sapphire">Ruby/Sapphire</option>
                            <option value="emerald">Emerald</option>
                            <option value="firered-leafgreen">FireRed/LeafGreen</option>
                            <option value="diamond-pearl">Diamond/Pearl</option>
                            <option value="platinum">Platinum</option>
                            <option value="heartgold-soulsilver">Heartgold/Soulsilver</option>
                            <option value="black-white">Black/White</option>
                            <option value="colosseum">Colosseum</option>
                            <option value="xd">XD</option>
                            <option value="black-2-white-2">Black2/White2</option>
                            <option value="x-y">X/Y</option>
                            <option value="omega-ruby-alpha-sapphire">Omega-Ruby/Alpha-Sapphire</option>
                            <option value="ultra-sun-ultra-moon">Ultra-Sun/Ultra-Moon</option>
                            <option value="lets-go">Lets-Go</option>
                            <option value="sword-shield">Sword/Shield</option>
                        </select>
                    </Form.Group>
            </div>
        </>
    )
}

export default GameVersionSelector;