import React from 'react';
import { Container, Row } from 'reactstrap';
import { Route, Switch } from 'react-router-dom'

import Header from '../components/Header'

import routes from '../routes';

function Layout() {
    return (
        <div className="App">
            <Header />

            <Container>
                <Row>
                    <Switch>
                        {routes.map( (r, i)=>{
                            return r.Component ? (
                                <Route key={i} path={r.path} exact={r.exact} render={p => <r.Component {...p} > </r.Component> } />
                        ) : null
                        })}

                    </Switch>
                </Row>
            </Container>
        </div>
    );
}

export default Layout;
