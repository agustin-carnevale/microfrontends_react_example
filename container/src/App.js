//deployed at: https://d2qa6fc2z9buq3.cloudfront.net

import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Header from './components/Header';
import ProgressBar from './components/ProgressBar';

const AuthLazy = lazy(()=> import('./components/AuthApp'));
const MarketingLazy = lazy(()=> import('./components/MarketingApp'));
const DashboardLazy = lazy(()=> import('./components/DashboardApp')); 

//avoid css/classNames colision between the different apps/microfrontends in Prod
const generateClassname = createGenerateClassName({
    productionPrefix: 'co'
});

const history = createBrowserHistory();

const App = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(()=>{
        if(isSignedIn){
            history.push('/dashboard');
        }
    },[isSignedIn]);

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassname}>
                <div>
                    <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)}/>
                    <Suspense fallback={<ProgressBar />}>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy onSignIn={() => setIsSignedIn(true)}/>
                            </Route>
                            <Route path="/dashboard">
                                {!isSignedIn && <Redirect to="/"/>}
                                <DashboardLazy />
                            </Route>
                            <Route path="/" component={MarketingLazy} />
                        </Switch>
                    </Suspense>
                </div> 
            </StylesProvider>
        </Router>
    );
}

export default App;