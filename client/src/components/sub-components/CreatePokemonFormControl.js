import React from 'react';
import { Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const CreatePokemonFormControl = ({className, size, type, placeholder, rows, style, control, name, errors, inputRef, testId}) => {
    return (
        <>
            <Controller 
                control={control}
                name={name}
                render={({ field }) => (
                    <Form.Group className="d-flex flex-column align-items-center">
                        <ErrorMessage 
                            errors={errors}
                            name={name}
                            render={({ message }) => (
                                <p style={{marginBottom: "2px", color: "red"}}>
                                    {message}
                                </p>
                            )}
                        />
                        <Form.Control 
                            data-testid={testId}
                            className={className} 
                            isValid={
                                control._formState &&
                                control._formState.dirtyFields[name] &&
                                !control._formState.errors[name]
                            }
                            isInvalid={!!(errors && errors[name])}
                            size={size} 
                            type={type} 
                            placeholder={placeholder} 
                            rows={rows} 
                            as={"textarea"} 
                            style={style}
                            {...inputRef(name)}
                            {...field}
                        />
                    </Form.Group>
                )}
            />
        </>
    )
}

export default CreatePokemonFormControl;