import React from 'react';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
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

function Homepage(props) {
    const classes = useStyles();
    return (
        <div>
            <h1>Homepage Component</h1>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Artist, Venue, Location..." variant="outlined" />
            </form>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        setlists: state.setlists
    }
}

export default connect(mapStateToProps)(Homepage);