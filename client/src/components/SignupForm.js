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

const LoginForm = (props) => {

    const classes = useStyles();

    return (
        <Grid container justify="center" spacing={3}>
            <Grid item xs={6}>
                <Paper className={classes.paper}>
                    <h2>Sign Up</h2>
                    <form>
                        <div>
                            <FormControl className={classes.formItem}>
                                <InputLabel htmlFor="username">Username:</InputLabel>
                                <Input id="username" placeholder="Username" value={props.username || ''} onChange={props.updateUsernameValue} />
                            </FormControl>
                        </div>
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
                                {/* TODO: Confirm Password */}
                                {/* TODO: Password characters as dots */}
                            </FormControl>
                        </div>
                        <div>
                            <Button className={classes.formItem} variant="contained" color="primary" onClick={props.trySignup} >Submit</Button>
                            {/* TODO: Link to Login Page */}
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