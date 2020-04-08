import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Repository from './pages/Repository';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route
                    path="/repository/:repositoryname"
                    component={Repository}
                />
            </Switch>
        </BrowserRouter>
    );
}

// Switch garante que apenas uma rota seja chamada por momento, react router dom permite mais de uma rota ao mesmo tempo (dois ou + componentes )
// react-router consegue chamar mais de uma rota por vez (dois componentes)
