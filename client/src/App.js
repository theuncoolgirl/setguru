// Refactored

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function App() {
    const classes = useStyles();



    // Check to see if there is a user logged in before loading the application
    const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     const loadUser = async () => {
    //         const res = await fetch("api/session");
    //         if (res.ok) {
    //             res.data = await res.json();
    //             console.log(res.data);
    //             // TODO: Add current user info to the store
    //         }
    //         setLoading(false);
    //     }
    //     loadUser();
    // }, []);

    // if (loading) return null;



    return (
        <>
            <CssBaseline />
            <BrowserRouter>
                <Navigation />
                <Container>
                    <div className={classes.root}>
                        <Switch>
                            <Route path="/login" render={props => <LoginForm {...props} />} />
                            <Route path="/signup" render={props => <SignupForm {...props} />} />
                            <Route path="/">
                                <h1>My Home Page</h1>
                            </Route>
                        </Switch>
                    </div>
                </Container>
                <Footer />
            </BrowserRouter>
        </>
    );
}

export default App;
