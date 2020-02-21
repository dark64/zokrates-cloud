import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import React from 'react';
import { onSetup } from '../../../../store/actions';
import { useGlobalContext } from "../../../../store/StoreProvider";
import Stopwatch from '../../../../utils/Stopwatch';
import { onMessage, useConsoleContext } from "../../../Console";
import Expandable from "../../../Expandable";


const SetupComponent = () => {

    const globalContext = useGlobalContext();
    const consoleContext = useConsoleContext();

    const { zokratesProvider, artifacts, keypair } = globalContext.state;
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

    const onDownload = () => {
        let zip = new JSZip();
        zip.file("verifying.key", keypair.vk);
        zip.file("proving.key", keypair.pk);
        zip.generateAsync({ type: "blob" }).then((content) => saveAs(content, "keys.zip"));
    }

    return (
        <Expandable headerText="Setup" disabled={disabled}>
            <div className="text-group">Generates a trusted setup keypair for the compiled program.</div>
            <div className="form-group">
                <button className="btn btn--primary mr-2" onClick={onClickHandler}>
                    <i className="fa fa-cog" aria-hidden="true"></i>Generate
                </button>
                <button className="btn btn--secondary" onClick={onDownload} disabled={!keypair}>
                    <i className="fa fa-download" aria-hidden="true"></i>Export Keys
                </button>
            </div>
        </Expandable>
    );
}

export default SetupComponent;