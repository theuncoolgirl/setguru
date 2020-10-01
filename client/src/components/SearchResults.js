import React from 'react';
import { connect } from 'react-redux';
// import { Button, TextField } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import { actions, thunks } from '../store/search';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     paper: {
//         padding: theme.spacing(2),
//         textAlign: 'center',
//         color: theme.palette.text.secondary,
//     },
//     formItem: {
//         padding: theme.spacing(2)
//     }
// }));

function SearchResults(props) {
    // const classes = useStyles();
    return (
        <div>
            <h1>SearchResults Component</h1>
        </div>
    );
};


const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);