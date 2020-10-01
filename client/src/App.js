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



    // Check to see if there is a user logged in before loading the application
    // const [loading, setLoading] = useState(true);
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
                            <ProtectedRoute isLoggedIn={props.token} path="/" exact render={props => <Homepage {...props} />} />
                            <Route path="/login" exact render={props => <LoginForm {...props} />} />
                            <Route path="/signup" exact render={props => <SignupForm {...props} />} />
                            <ProtectedRoute isLoggedIn={props.token} path="/search" exact render={props => <SearchResults {...props} />} />

                        </Switch>
                    </div>
                </Container>
                {/* <Footer /> */}
            </BrowserRouter>
        </>
    );
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
    };
};

export default connect(mapStateToProps)(App);
