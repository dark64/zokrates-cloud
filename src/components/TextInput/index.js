import React from 'react';

const TextInput = ({ prepend, append, value = '', onAppendClick, onChange }) => {
    return (
        <div className="form-group">
            {prepend && <span>{prepend}</span>}
            <input type="text" value={value} className="form-field" onChange={(e) => onChange(e.currentTarget.value)} required={true} />
            {append && <span onClick={onAppendClick}>{append}</span>}
        </div>
    )
}

export default TextInput;