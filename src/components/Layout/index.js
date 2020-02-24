import React from 'react';
import SplitPane from 'react-split-pane';
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
                <SplitPane split="horizontal" primary="second" defaultSize="40%" minSize={35}>  
                    <SplitPane split="vertical" primary="second" defaultSize="25%">
                        <CodeEditor />
                        <Controls />
                    </SplitPane>
                    <Console />
                </SplitPane>    
            </div>
        </ConsoleProvider>
    );
}

export default Layout;