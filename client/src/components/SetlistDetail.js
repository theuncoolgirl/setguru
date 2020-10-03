import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { actions, thunks } from '../store/setlist';
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: '#1a1c2e',
    },
    formItem: {
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        margin: 5
    },
    datebox: {
        backgroundColor: '#CD9337',
        color: "white",
        width: 100
    }
}));

const SetlistDetail = (props) => {
    const classes = useStyles();

    const {
        updateSetlistidValue,
        getSetlist,
        match: {
            params: {
                setlistId
            }
        } } = props;

    useEffect(() => {
        updateSetlistidValue(setlistId)
        getSetlist(setlistId);
    }, [setlistId, updateSetlistidValue, getSetlist]);

    if (props.setlist) {
        const setlist = props.setlist.results;
        const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        console.log(setlist);
        const songs = setlist.sets.set[0].song;
        return (
            <div className={classes.root} style={{
                paddingLeft: 30,
                paddingRight: 30
            }}>
                <h4 style={{ color: "white" }}>Breadcrumbs</h4>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Paper id='setlist-info' className={classes.paper}>
                            <div style={{ display: "inline" }} id="setlist-title">
                                <Paper id="datebox" className={classes.datebox} elevation={0}>
                                    <div>{setlist.eventDate.split("").slice(0, 2).join("")}</div>
                                    <div>{months[parseInt(setlist.eventDate.split("").slice(3, 5).join(""))]}</div>
                                    <div>{setlist.eventDate.split("").slice(6).join("")}</div>
                                </Paper>
                                <div id="set-info" style={{ color: 'white' }}>
                                    <div>
                                        {setlist.artist.name} Setlist
                                    </div>
                                    <div>
                                        at {setlist.venue.name}, {setlist.venue.city.name}, {setlist.venue.city.stateCode}, {setlist.venue.city.country.name}
                                    </div>
                                </div>
                            </div>
                            <Paper style={{ backgroundColor: "#3e3f4d", color: "white" }}>
                                <div>
                                    <h1 id="setlist-details">Setlist</h1>
                                </div>
                                <div>
                                    <ol>
                                        {songs.map((song, i) => (
                                            <li style={{ textAlign: "left" }} key={i}>{song.name}</li>
                                        ))}
                                    </ol>
                                </div>
                                <div>
                                    <Button className={classes.formItem} variant="contained" color="primary" >+ I WAS THERE</Button>
                                    {/* TODO: Connect to CRUD, toggle button on/off */}
                                    <Typography>THIS MANY Setlist Guru users were there</Typography>
                                    {/* TODO: Connect to total number users who have saved the setlist */}
                                </div>
                            </Paper>
                            <div id="comments">
                                <div>
                                    Comments
                                </div>
                                <div>
                                    Existing Comments
                                </div>
                                <div>
                                    Comment Form
                                </div>
                            </div>
                        </Paper>
                    </Grid>

                </Grid >
            </div >
        )
    } else {
        return (
            <h3> Loading results... </h3>
        )
    }
}

const mapStateToProps = state => {
    return {
        setlistId: state.setlist.setlistId,
        setlist: state.setlist.setlistDetails,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateSetlistidValue: value => dispatch(actions.updateSetlistidValue(value)),
        getSetlist: () => dispatch(thunks.getSetlist()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetlistDetail);