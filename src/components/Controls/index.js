import React, { useEffect } from 'react';
import { initialize } from 'zokrates-js';
import { onLoadedProvider } from '../../store/actions';
import { useGlobalContext } from '../../store/StoreProvider';
import { onMessage, useConsoleContext } from '../Console';
import CompileComponent from './components/compile';
import ComputationComponent from './components/computation';
import SetupComponent from './components/setup';
import './controls.scss';

const Controls = () => {
    const consoleContext = useConsoleContext();
    const globalContext = useGlobalContext();

    useEffect(() => {
        initialize().then((provider) => {
            globalContext.dispatch(onLoadedProvider(provider))
            consoleContext.dispatch(onMessage('info', 'ZoKrates initialized.'));
        });
    }, []);

    return (
        <div className="controls">
            <CompileComponent />
            <SetupComponent />
            <ComputationComponent />
        </div>
    )
}

export default Controls;