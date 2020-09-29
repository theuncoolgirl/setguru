import { token } from 'morgan';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
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

const SignupForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUsername] = useState('')

    const signup = (email, password, username) => dispatch(AuthAction.signup(email, password, username));

    const signupHandler = e => {
        e.preventDefault();
        signup(email, password, username);
    };

    const classes = useStyles();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const csrfToken = Cookies.get("XSRF-TOKEN");
        const user = { email, username, password };
        const response = await fetch(`api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify(signupInfo),
        });
        if (response.ok) {
            return <Redirect to="/login" />
            // const { user } = await response.json();
            // props.updateUser(user.id);
            // setCurrentUserId(user.id)
        }
    }

    // const updateEmail = e => {
    //     setEmail(e.target.value)
    // }

    // const updatePassword = e => {
    //     setPassword(e.target.value)
    // }

    if (currentUserId) {
        return <Redirect to="/" />;
    }



    return (
        <Grid container justify="center" spacing={3}>
            <Grid item xs={6}>
                <Paper className={classes.paper}>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <FormControl className={classes.formItem}>
                                <InputLabel htmlFor="email">Email:</InputLabel>
                                <Input id="email" placeholder="Email" value={email} onChange={updateEmail} />
                            </FormControl>
                        </div>
                        <div>
                            <FormControl className={classes.formItem}>
                                <InputLabel htmlFor="password">Password:</InputLabel>
                                <Input id="password" placeholder="Password" value={password} onChange={updatePassword} />
                            </FormControl>
                        </div>
                        <div>
                            <Button className={classes.formItem} type="submit" variant="contained" color="primary">Submit</Button>
                        </div>
                    </form>
                </Paper>
            </Grid >
        </Grid >
    )
}

export default SignupForm;