import React from 'react';
import AceEditor from 'react-ace';
import './zokrates-mode';
import 'ace-builds/src-noconflict/theme-tomorrow';

const CodeEditor = () => {

    return (
        <AceEditor
            name="editor"
            mode="zokrates"
            theme="tomorrow"
            width="80vw"
            height="100%"
            fontSize={18}
            scrollMargin={[5]}
            editorProps={{ $blockScrolling: true }}
            defaultValue={"def main() -> (field):\n\treturn 1"}
        />
    );
};

export default CodeEditor;