import React from 'react';
import { connect } from 'react-redux';
import { actions, thunks } from '../store/auth';
import { Button, FormControl, Grid, Input, InputLabel, Paper } from '@material-ui/core';
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

const SetlistDetail = (props) => {

    const classes = useStyles();

    return (

        <div>

        </div>

    )
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        username: state.auth.username,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateEmailValue: e => dispatch(actions.updateEmailValue(e.target.value)),
        updatePasswordValue: e => dispatch(actions.updatePasswordValue(e.target.value)),
        updateUsernameValue: e => dispatch(actions.updateUsernameValue(e.target.value)),
        trySignup: () => dispatch(thunks.trySignup()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetlistDetail);