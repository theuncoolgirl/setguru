import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@material-ui/core';
import Homepage from './components/Homepage';
import LoginForm from './components/LoginForm';
import ProtectedRoute from './components/ProtectedRoute';
import Navigation from './components/Navigation';
import SignupForm from './components/SignupForm';
import SearchResults from './components/SearchResults';
import SetlistDetail from './components/SetlistDetail';
import UserProfile from './components/UserProfile';
import NotFound from './components/NotFound';
import useStyles from './styles.js';

function App(props) {
    const classes = useStyles();

    return (
        <div className={classes.base}>
            <CssBaseline />
            <BrowserRouter>
                <Navigation />
                <Container className={classes.container}>
                    <Switch>
                        <ProtectedRoute isLoggedIn={props.token} path="/" exact render={props => <Homepage {...props} />} />
                        <Route path="/login" exact render={props => <LoginForm {...props} />} />
                        <Route path="/signup" exact render={props => <SignupForm {...props} />} />
                        <ProtectedRoute isLoggedIn={props.token} exact path="/user/:userId" render={props => <UserProfile {...props} />} />
                        <ProtectedRoute isLoggedIn={props.token} path="/search/:query/:page" render={props => <SearchResults {...props} />} />
                        <ProtectedRoute isLoggedIn={props.token} path="/setlist/:setlistId" render={props => <SetlistDetail {...props} />} />
                        <ProtectedRoute isLoggedIn={props.token} path="/404" render={props => <NotFound {...props} />} />
                    </Switch>
                </Container>
                <Container>
                    <div style={{ height: 800 }}></div>
                </Container>
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
