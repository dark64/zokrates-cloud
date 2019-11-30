import React from 'react';
import Split from 'react-split';
import CodeEditor from '../CodeEditor';
import Console from '../Console';
import './layout.scss';
import Accordion from '../Accordion';

const Layout = () => {
    return (
        <Split 
            sizes={[60, 40]}
            direction="vertical" 
            gutterSize={4}
            gutterAlign="end"
            style={{height: "calc(100vh - 48px)"}}>
            <div className="d-flex-col">
                <CodeEditor />
                <div className="accordion-container">
                    <Accordion
                        title="Compilation"
                        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    />
                    <Accordion
                        title="Setup"
                        content="Lorem ipsum"
                    />
                    <Accordion
                        title="Compute Witness"
                        content="Lorem ipsum"
                    />
                    <Accordion
                        title="Export Verifier"
                        content="Lorem ipsum"
                    />
                    <Accordion
                        title="Generate Proof"
                        content="Lorem ipsum"
                    />
                </div>
            </div>
            <Console />
        </Split>
    );
}

export default Layout;