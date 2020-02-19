import React, { createContext, useReducer, useContext, useRef, useEffect } from 'react';
import './console.scss';

export const ConsoleContext = createContext();

const consoleReducer = (state, action) => {
    switch (action.type) {
        case 'log':
            let logs = state.logs;
            if (logs.length > 100) {
                logs.shift();
            }
            const { type, message } = action.payload;
            return {
                logs: [...logs, { type, message }]
            };
        default:
            return state;
    }
}

const ConsoleInner = ({ logs }) => {
    const bodyRef = useRef(null);
    
    useEffect(() => { 
        bodyRef.current.scrollTop = bodyRef.current.scrollHeight 
    }, [logs]);

    return (
        <div className="console-container">
            <div className="console-container__header">
                <span className="title">
                    <i className="fa fa-terminal fa-lg" aria-hidden="true"></i>Console
                </span>
            </div>
            <div className="console-container__body" ref={bodyRef}>
                {logs && logs.map((log) => 
                    <pre key={Math.random()}>
                        <code className={`log log--${log.type}`}>
                            [{new Date().toISOString()}] {log.message}
                        </code>
                    </pre>
                    
                )}
            </div>
        </div>
    );
}

export const Console = () => {
    return (
        <ConsoleContext.Consumer>
            {({ state }) => <ConsoleInner logs={state.logs} /> }
        </ConsoleContext.Consumer>
    );
}

export const ConsoleProvider = ({ preDef, children }) => {
    const [state, dispatch] = useReducer(consoleReducer, { logs: preDef });
    return (
        <ConsoleContext.Provider value={{ state, dispatch }}>
            {children}
        </ConsoleContext.Provider>
    );
}

export const onMessage = (type, message) => {
    return { 
        type: 'log', 
        payload: { type, message } 
    };
}

export const useConsoleContext = () => useContext(ConsoleContext);