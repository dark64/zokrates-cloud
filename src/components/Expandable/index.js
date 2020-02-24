import React, { useState } from 'react';
import './expandable.scss';

const Expandable = ({ headerText, icon, defaultState, disabled, children }) => {

    const [expanded, setExpanded] = useState(defaultState || false);

    return (
        <div className="expandable">
            <div className={`expandable__header`.concat(disabled ? ' expandable__header--disabled' : '')} 
                onClick={() => !disabled && setExpanded(!expanded)}>
                <div className="expandable__title">
                    {icon && <i className={`fa ${icon} mr-2`} aria-hidden="true"></i>}
                    {headerText}
                </div>
                <div className="expandable__chevron">
                    <i className={`fa fa-angle-${expanded ? 'up' : 'down'} fa-lg`} aria-hidden="true"></i>
                </div>
            </div>
            {expanded && <div className="expandable__body">{children}</div>}
        </div>
    )
}

export default Expandable;