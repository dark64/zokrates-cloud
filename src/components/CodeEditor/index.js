import React from 'react';
import AceEditor from 'react-ace';
import 'ace-mode-zokrates';
import 'ace-builds/src-noconflict/theme-tomorrow';
import { useGlobalContext } from '../../store/StoreProvider';
import { onCodeChange } from '../../store/actions';

const CodeEditor = () => {
    const { state, dispatch } = useGlobalContext();
    return (
        <AceEditor
            name="editor"
            mode="zokrates"
            theme="tomorrow"
            width="100%"
            height="100%"
            fontSize={18}
            scrollMargin={[5]}
            editorProps={{ $blockScrolling: true }}
            value={state.code}
            onChange={(value) => dispatch(onCodeChange(value))}
        />
    );
};

export default CodeEditor;