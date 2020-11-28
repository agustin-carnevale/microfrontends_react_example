//deployed at: https://d2qa6fc2z9buq3.cloudfront.net

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import MarketingApp from './components/MarketingApp';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

//avoid css/classNames colision between the different apps/microfrontends in Prod
const generateClassname = createGenerateClassName({
    productionPrefix: 'co'
});

const App = () => {
    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassname}>
                <div>
                    <Header />
                    <MarketingApp />
                </div> 
            </StylesProvider>
        </BrowserRouter>
    );
}

export default App;