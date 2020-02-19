import React, { useEffect } from 'react';
import './controls.scss';
import { useConsoleContext, onMessage } from '../Console';
import CompileComponent from './components/compile';
import ComputationComponent from './components/computation';
import { useGlobalContext } from '../../store/StoreProvider';
import { onLoadedProvider } from '../../store/actions';
import { initialize } from 'zokrates-js';

const Controls = () => {
    const consoleContext = useConsoleContext();
    const globalContext = useGlobalContext();

    useEffect(() => {
        initialize().then((provider) => {
            globalContext.dispatch(onLoadedProvider(provider))
            consoleContext.dispatch(onMessage('info', 'ZoKrates initialized successfully.'));
        });
    }, []);

    return (
        <div className="controls">
            <CompileComponent />
            <ComputationComponent />
        </div>
    )
}

export default Controls;