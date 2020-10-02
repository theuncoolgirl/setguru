import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { actions, thunks } from '../store/setlist';
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

    useEffect(() => {
        const setlistId = props.match.params.setlistId;
        props.updateSetlistidValue(setlistId)
        props.getSetlist(setlistId);
    });

    return (

        <div>

        </div>

    )
}

const mapStateToProps = state => {
    return {
        setlistId: state.setlist.setlistId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateSetlistidValue: value => dispatch(actions.updateSetlistidValue(value)),
        getSetlist: () => dispatch(thunks.getSetlist()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetlistDetail);