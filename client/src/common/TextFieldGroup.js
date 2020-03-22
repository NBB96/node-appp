import React, { Component } from 'react'
import PropType from 'prop-types'
import classnames from 'classnames'

const TextFieldGroup = ({
    name,
    placeholder,
    value,
    error,
    info,
    type,
    onChange,
    disabled
}) => {
    return (
        <div className="form-group">
            <input
                type={type}
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error
                })}
                placeholder={placeholder}
                name={name}
                value={value}
                // required
                onChange={onChange}
                disabled={disabled}
            />
            {info && <small className='form-text text-muted'>{info}</small>}
            {
                error && (<div
                    className='invalid-feedback'
                >
                    {error}
                </div>)
            }
        </div>
    )
}

TextFieldGroup.propTypes = {
    name: PropType.string.isRequired,
    placeholder: PropType.string,
    value: PropType.string.isRequired,
    info: PropType.string,
    error: PropType.string,
    type: PropType.string.isRequired,
    onChange: PropType.func.isRequired,
    disabled: PropType.string
};

TextFieldGroup.defaultProps = {
    type: "text"
}

export default TextFieldGroup