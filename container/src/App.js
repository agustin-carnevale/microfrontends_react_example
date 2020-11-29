//deployed at: https://d2qa6fc2z9buq3.cloudfront.net

import React, { lazy, Suspense, useState } from 'react';
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
    const [isSignedIn, setIsSignedIn] = useState(false);

    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassname}>
                <div>
                    <Header isSignedIn={isSignedIn} onSignOut={ () => {setIsSignedIn(false)} }/>
                    <Suspense fallback={<ProgressBar />}>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy onSignIn={ () => {setIsSignedIn(true)}  }/>
                            </Route>
                            <Route path="/" component={MarketingLazy} />
                        </Switch>
                    </Suspense>
                </div> 
            </StylesProvider>
        </BrowserRouter>
    );
}

export default App;