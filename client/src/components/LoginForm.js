import React from 'react';
import { connect } from 'react-redux';
import { actions, thunks } from '../store/auth';
import { Redirect } from 'react-router-dom';
// import Cookies from 'js-cookie';
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

const LoginForm = (props) => {

    const classes = useStyles();

    if (props.token) {
        return <Redirect to="/" />;
    }
    return (
        <Grid container justify="center" spacing={3}>
            <Grid item xs={6}>
                <Paper className={classes.paper}>
                    <h2>Login</h2>
                    <form>
                        {/* <form onSubmit={props.tryLogin} > */}
                        <div>
                            <FormControl className={classes.formItem}>
                                <InputLabel htmlFor="email">Email:</InputLabel>
                                <Input id="email" placeholder="Email" value={props.email || ''} onChange={props.updateEmailValue} />
                            </FormControl>
                        </div>
                        <div>
                            <FormControl className={classes.formItem}>
                                <InputLabel htmlFor="password">Password:</InputLabel>
                                <Input id="password" placeholder="Password" value={props.password || ''} onChange={props.updatePasswordValue} />
                            </FormControl>
                        </div>
                        <div>
                            <Button className={classes.formItem} variant="contained" color="primary" onClick={props.tryLogin} >Submit</Button>
                            {/* <Button className={classes.formItem} type="submit" variant="contained" color="primary">Submit</Button> */}
                        </div>
                    </form>
                </Paper>
            </Grid >
        </Grid >
    )
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateEmailValue: e => dispatch(actions.updateEmailValue(e.target.value)),
        updatePasswordValue: e => dispatch(actions.updatePasswordValue(e.target.value)),
        tryLogin: () => dispatch(thunks.tryLogin()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);