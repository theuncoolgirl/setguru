import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Homepage from './components/Homepage';
import LoginForm from './components/LoginForm';
import ProtectedRoute from './components/ProtectedRoute';
import Navigation from './components/Navigation';
import SignupForm from './components/SignupForm';
import SearchResults from './components/SearchResults';
// import Footer from './components/Footer';


const useStyles = makeStyles((theme) => ({
    base: {
        backgroundColor: '#161618'
    },
    container: {
        maxWidth: "100%",
        margin: 0,
        padding: 0
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function App(props) {
    const classes = useStyles();

    return (
        <div className={classes.base}>
            <CssBaseline />
            <BrowserRouter >
                <Navigation />
                <Container className={classes.container}>
                    <div className={classes.root}>
                        <Switch>
                            <ProtectedRoute isLoggedIn={props.token} path="/" exact render={props => <Homepage {...props} />} />
                            <Route path="/login" exact render={props => <LoginForm {...props} />} />
                            <Route path="/signup" exact render={props => <SignupForm {...props} />} />
                            <ProtectedRoute isLoggedIn={props.token} path="/search/:query/:page" render={props => <SearchResults {...props} />} />

                        </Switch>
                    </div>
                </Container>
                {/* <Footer /> */}
            </BrowserRouter>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
    };
};

export default connect(mapStateToProps)(App);
