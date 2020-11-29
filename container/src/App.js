//deployed at: https://d2qa6fc2z9buq3.cloudfront.net

import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Header from './components/Header';
import ProgressBar from './components/ProgressBar';

const MarketingLazy = lazy(()=> import('./components/MarketingApp'));
const AuthLazy = lazy(()=> import('./components/AuthApp'));

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
                    <Suspense fallback={<ProgressBar />}>
                        <Switch>
                            <Route path="/auth" component={AuthLazy} />
                            <Route path="/" component={MarketingLazy} />
                        </Switch>
                    </Suspense>
                </div> 
            </StylesProvider>
        </BrowserRouter>
    );
}

export default App;