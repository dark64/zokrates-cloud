import React from 'react';
import { onCompilation } from '../../../../store/actions';
import { useGlobalContext } from '../../../../store/StoreProvider';
import Stopwatch from '../../../../utils/Stopwatch';
import { onMessage, useConsoleContext } from '../../../Console';
import Expandable from '../../../Expandable';

const CompileComponent = () => {

    const globalContext = useGlobalContext();
    const consoleContext = useConsoleContext();
    const { zokratesProvider, code } = globalContext.state;

    const onCompile = () => {
        consoleContext.dispatch(onMessage('info', 'Compiling...'));
        setTimeout(() => {
            try {
                const stopwatch = Stopwatch();
                const artifacts = zokratesProvider.compile(code, "main", () => {});
                globalContext.dispatch(onCompilation(artifacts));
                consoleContext.dispatch(onMessage('success', 
                    `Compilation successful (size: ${artifacts.program.length} bytes, duration: ${stopwatch.elapsed().toFixed(2)}ms)`)
                );
            } catch (error) {
                consoleContext.dispatch(onMessage('error', error.toString()));
            }
        }, 200);
    }

    return (
        <Expandable headerText="Compilation" defaultState={true}>
            <div className="text-group">Compiles source code into ZoKrates internal representation of arithmetic circuits.</div>
            <button className="btn btn--primary" onClick={onCompile}>
                <i className="fa fa-refresh" aria-hidden="true"></i>Compile
            </button>
        </Expandable>
    );
}

export default CompileComponent;