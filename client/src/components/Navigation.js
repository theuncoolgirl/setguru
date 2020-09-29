import React from 'react';
import { connect } from 'react-redux';
import { thunks } from '../store/auth';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    formItem: {
        padding: theme.spacing(2)
    }
}));

function Navigation(props) {
    const classes = useStyles();
    return (
        <div>
            <h1>Navigation Component</h1>
            {/* TODO: Hide Logout Button when logged out/on login page */}
            <Button className={classes.formItem} variant="contained" color="primary" onClick={props.logout} >Logout</Button>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        setlists: state.setlists,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(thunks.logout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);