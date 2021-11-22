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
                            <option key="1" value="red-blue">Red/Blue</option>
                            <option key="2" value="yellow">Yellow</option>
                            <option key="3" value="gold-silver">Gold/Silver</option>
                            <option key="4" value="crystal">Crystal</option>
                            <option key="5" value="ruby-sapphire">Ruby/Sapphire</option>
                            <option key="6" value="emerald">Emerald</option>
                            <option key="7" value="firered-leafgreen">FireRed/LeafGreen</option>
                            <option key="8" value="diamond-pearl">Diamond/Pearl</option>
                            <option key="9" value="platinum">Platinum</option>
                            <option key="10" value="heartgold-soulsilver">Heartgold/Soulsilver</option>
                            <option key="11" value="black-white">Black/White</option>
                            <option key="12" value="colosseum">Colosseum</option>
                            <option key="13" value="xd">XD</option>
                            <option key="14" value="black-2-white-2">Black2/White2</option>
                            <option key="15" value="x-y">X/Y</option>
                            <option key="16" value="omega-ruby-alpha-sapphire">Omega-Ruby/Alpha-Sapphire</option>
                            <option key="17" value="ultra-sun-ultra-moon">Ultra-Sun/Ultra-Moon</option>
                            <option key="18" value="lets-go">Lets-Go</option>
                            <option key="19" value="sword-shield">Sword/Shield</option>
                        </select>
                    </Form.Group>
            </div>
        </>
    )
}

export default GameVersionSelector;