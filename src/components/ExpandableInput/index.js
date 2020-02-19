import React, { useState } from 'react';
import TextInput from '../TextInput';
import './expandable-input.scss';

const ExpandableInput = ({ name, value, children, onChange }) => {

    const [expanded, setExpanded] = useState(false);
    const Expander = <i className={`fa fa-angle-${expanded ? 'up' : 'down'} fa-lg`} aria-hidden="true"></i>;

    if (!expanded) {
        return <TextInput 
            value={value} 
            prepend={name} 
            append={Expander} 
            onAppendClick={() => setExpanded(!expanded)}
            onChange={onChange}
        />;
    }

    return (
        <div className="expandable-input">
            <div className="expandable-input__header">
                <span>{name}</span>
                <span onClick={() => setExpanded(!expanded)}>{Expander}</span>
            </div>
            <div className="expandable-input__body">{children}</div>
        </div>
    );
}

export default ExpandableInput;