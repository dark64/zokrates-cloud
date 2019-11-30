import React from 'react';
import Header from './components/Header';
import Layout from './components/Layout/Layout';
import './scss/app.scss';
import { initialState, reducer } from './store/reducer';
import { StoreProvider } from './store/StoreProvider';

const App = () => (    
    <StoreProvider reducer={reducer} initialState={initialState} >
        <Header />
        <main role="main">
            <Layout />
        </main>
    </StoreProvider>
);

export default App;