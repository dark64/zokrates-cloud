import React from 'react';
import { onSetup } from '../../../../store/actions';
import { useGlobalContext } from "../../../../store/StoreProvider";
import Stopwatch from '../../../../utils/Stopwatch';
import { onMessage, useConsoleContext } from "../../../Console";
import Expandable from "../../../Expandable";

const SetupComponent = () => {

    const globalContext = useGlobalContext();
    const consoleContext = useConsoleContext();

    const { zokratesProvider, artifacts } = globalContext.state;
    const disabled = artifacts == undefined;

    const onClickHandler = () => {
        consoleContext.dispatch(onMessage('info', 'Generating setup keypair...'));
        setTimeout(() => {
            try {
                const stopwatch = Stopwatch();
                const keypair = zokratesProvider.setup(globalContext.state.artifacts.program);
                globalContext.dispatch(onSetup(keypair));
                consoleContext.dispatch(onMessage('success', `Keypair generated (duration: ${stopwatch.elapsed().toFixed(2)}ms)`));
            } catch (error) {
                consoleContext.dispatch(onMessage('error', error.toString()));
            }
        }, 200);
    }

    return (
        <Expandable headerText="Setup" disabled={disabled}>
            <div className="text-group">Generates a trusted setup keypair for the compiled program.</div>
            <div className="form-group">
                <button className="btn btn--secondary" onClick={onClickHandler}>
                    <i className="fa fa-cog" aria-hidden="true"></i>Generate
                </button>
            </div>
        </Expandable>
    );
}

export default SetupComponent;