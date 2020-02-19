import React from 'react';
import CodeEditor from '../CodeEditor';
import { Console, ConsoleProvider } from '../Console';
import Controls from '../Controls';
import './layout.scss';

const welcomeMessage = { 
    type: 'info', 
    message: 'Welcome to ZoKrates Cloud Environment!' 
};

const Layout = () => {
    return (
        <ConsoleProvider preDef={[welcomeMessage]}>
            <div className="main-layout">
                <div className="main-layout__upper">
                    <CodeEditor />
                    <Controls />
                </div>
                <div className="main-layout__lower">
                    <Console />
                </div>
            </div>
        </ConsoleProvider>
    );
}

export default Layout;