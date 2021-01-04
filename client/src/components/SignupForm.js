import React from 'react';
import { connect } from 'react-redux';
import { actions, thunks } from '../store/auth';
import { Button, FormControl, Grid, Input, InputLabel, Link, Paper } from '@material-ui/core';
import useStyles from '../styles.js';

const LoginForm = (props) => {
    const classes = useStyles();

    return (
        <Grid container justify="center" spacing={3}>
            <Grid item xs={6}>
                <Paper className={classes.authForm}>
                    <h2>Sign Up</h2>
                    <form>
                        <div>
                            <FormControl className={classes.formItem}>
                                <InputLabel htmlFor="username">Username:</InputLabel>
                                <Input style={{ marginBottom: 10 }} id="username" placeholder="Username" value={props.username || ''} onChange={props.updateUsernameValue} />
                            </FormControl>
                        </div>
                        <div>
                            <FormControl className={classes.formItem}>
                                <InputLabel htmlFor="email">Email:</InputLabel>
                                <Input style={{ marginBottom: 10 }} id="email" placeholder="Email" value={props.email || ''} onChange={props.updateEmailValue} />
                            </FormControl>
                        </div>
                        <div>
                            <FormControl className={classes.formItem}>
                                <InputLabel htmlFor="password">Password:</InputLabel>
                                <Input style={{ marginBottom: 20 }} id="password" type='password' placeholder="Password" value={props.password || ''} onChange={props.updatePasswordValue} />
                                {/* TODO: Confirm Password */}
                                {/* TODO: Password characters as dots */}
                            </FormControl>
                        </div>
                        <div>
                            <Button className={classes.button} variant="contained" color="primary" onClick={props.trySignup} >Submit</Button>
                        </div>
                        {props.errors ? (
                            <div>
                                {props.errors.map((error, i) => (
                                    <p style={{ color: "#CD9337" }} key={i}>{error}</p>
                                ))}
                            </div>
                        ) : null}
                        <div style={{ marginTop: 5 }}>
                            <span>Already have an account? </span><Link href='/login' style={{ color: "#CD9337" }}>Login here.</Link>
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
        username: state.auth.username,
        errors: state.auth.errors,
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);