import React from 'react';
import Expandable from '../../../Expandable';
import { useGlobalContext } from '../../../../store/StoreProvider';
import { useConsoleContext, onMessage } from '../../../Console';
import { onCompliation } from '../../../../store/actions';

const CompileComponent = () => {

    const globalContext = useGlobalContext();
    const consoleContext = useConsoleContext();

    const onCompile = () => {
        consoleContext.dispatch(onMessage('info', `Compiling...`));
        setTimeout(() => {
            try {
                const artifacts = globalContext.state.zokratesProvider.compile(
                    globalContext.state.code, 
                    "main", 
                    () => {}
                );
                globalContext.dispatch(onCompliation(artifacts));
                consoleContext.dispatch(onMessage('success', `Compilation successful (size: ${artifacts.program.length} bytes)`));
            } catch (error) {
                consoleContext.dispatch(onMessage('error', error.toString()));
            }
        }, 200);
    }

    return (
        <Expandable headerText="Compilation" defaultState={true}>
            <div className="text-group">Compiles source code into ZoKrates internal representation of arithmetic circuits.</div>
            <button className="btn btn--primary" onClick={onCompile}>
                <i className="fa fa-play" aria-hidden="true"></i>Compile
            </button>
        </Expandable>
    );
}

export default CompileComponent;