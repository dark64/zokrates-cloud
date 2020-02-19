import React from 'react';
import Expandable from '../../../Expandable';
import { useGlobalContext } from '../../../../store/StoreProvider';

const ComputationComponent = () => {
    const { state } = useGlobalContext();
    const disabled = state.artifacts == undefined;

    return (
        <Expandable headerText="Computation" disabled={disabled}>
            Not implemented
        </Expandable>
    );
}

export default ComputationComponent;