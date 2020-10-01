import React from 'react';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { actions } from '../store/search';

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
                <TextField id="searchBar" label="Artist, Venue, Location..." variant="outlined" onChange={props.updateSearchValue} />
            </form>
        </div>
    );
};


const mapStateToProps = state => {
    return {
        setlists: state.search.setlists,
        searchQuery: state.search.searchQuery
    }
}

const mapDispatchToProps = dispatch => {
    return {
        receiveSetlists: e => dispatch(actions.receiveSetlists(e.target.value)),
        updateSearchValue: e => dispatch(actions.updateSearchValue(e.target.value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);