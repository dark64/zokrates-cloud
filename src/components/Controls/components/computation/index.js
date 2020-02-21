import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../../../store/StoreProvider';
import Stopwatch from '../../../../utils/Stopwatch';
import { onMessage, useConsoleContext } from '../../../Console';
import Expandable from '../../../Expandable';
import ExpandableInput from '../../../ExpandableInput';
import TextInput from '../../../TextInput';

const isObject = (value) => typeof value === 'object';

const StructInput = ({ component, value, onChange }) => {
    return (
        <ExpandableInput 
            name={component.name} 
            value={isObject(value) ? JSON.stringify(value) : value}
            onChange={(value) => {
                try {
                    return onChange(JSON.parse(value));
                } catch {
                    return onChange(value);
                }
            }}> 
            {component.components.map((innerComponent) => (
                <AbiInput key={innerComponent.name} 
                    component={innerComponent} 
                    value={value && value[innerComponent.name] || ''} 
                    onChange={(innerValue) => {
                        return onChange(Object.assign(
                            isObject(value) ? value : {}, { [innerComponent.name]: innerValue }));
                    }}
                />
            ))}
        </ExpandableInput>
    );
}

const ArrayInput = ({ component, value, onChange }) => {
    const components = [...Array(component.components.size)].map((_, index) => {
        return { 
            name: `${component.name}[${index.toString()}]`,
            type: component.components.type,
            components: component.components.components
        }
    });
    return (
        <ExpandableInput 
            name={component.name} 
            value={isObject(value) ? JSON.stringify(value) : value}
            onChange={(value) => {
                try {
                    return onChange(JSON.parse(value));
                } catch {
                    return onChange(value);
                }
            }}> 
            {components.map((innerComponent, index) => (
                <AbiInput key={innerComponent.name} 
                    component={innerComponent} 
                    value={(value instanceof Array && value[index] != undefined) ? value[index] : ''} 
                    onChange={(innerValue) => {
                        if (!(value instanceof Array)) {
                            value = Array(component.components.size - 1);
                        }
                        value[index] = innerValue;
                        return onChange(value);
                    }}
                />
            ))}
        </ExpandableInput>
    );
}

const AbiInput = ({ component, value, onChange }) => {
    switch (component.type) {
        case 'field':
            return <TextInput prepend={component.name} value={value} onChange={onChange} />;
        case 'bool':
            return <TextInput prepend={component.name} value={value} onChange={
                (value) => onChange(/^(true|false)$/.test(value) ? value === 'true' : value)} />;
        case 'struct':
            return <StructInput component={component} value={value} onChange={onChange} />;
        case 'array': 
            return <ArrayInput component={component} value={value} onChange={onChange} />;
        default:
            return null;
    }
}   

const ComputationComponent = () => {

    const [state, setState] = useState({
        fields: {}
    });

    const globalContext = useGlobalContext();
    const consoleContext = useConsoleContext();

    const { zokratesProvider, artifacts } = globalContext.state;
    const disabled = artifacts == undefined;

    useEffect(() => {
        setState({ fields: {} });
    }, [artifacts]);

    const onChangeHandler = (component, value) => {
        setState({
            ...state,
            fields: {
                ...state.fields,
                [component.name]: value
            }
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const abi = JSON.parse(artifacts.abi);
        const args = abi.inputs.map(input => state.fields[input.name]);
        consoleContext.dispatch(onMessage('info', `Executing with arguments: ${JSON.stringify(args)}`));

        setTimeout(() => {
            try {
                const stopwatch = Stopwatch();
                const result = zokratesProvider.computeWitness(artifacts, args);
                consoleContext.dispatch(onMessage('success', `Execution successful (duration: ${stopwatch.elapsed().toFixed(2)}ms)`));
                consoleContext.dispatch(onMessage('success', 'Output: \n' + result.output));
            } catch (error) {
                consoleContext.dispatch(onMessage('error', error.toString()));
            }
        }, 200);
    }

    const renderComponents = () => {
        const abi = JSON.parse(artifacts.abi);
        return (
            <form onSubmit={onSubmit}>
                {abi.inputs.map((component) => (
                    <AbiInput key={component.name} 
                        component={component} 
                        value={state.fields[component.name]} 
                        onChange={(value) => onChangeHandler(component, value)}
                    />
                ))}
                <button type="submit" className="btn btn--primary">
                    <i className="fa fa-lightbulb-o" aria-hidden="true"></i>Execute
                </button>
            </form>
        );
    }

    return (
        <Expandable headerText="Computation" disabled={disabled}>
            {!disabled && renderComponents()}
        </Expandable>
    );
}

export default ComputationComponent;