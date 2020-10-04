import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { actions, thunks } from '../store/setlist';
import { thunks as userSetlistsThunks } from '../store/userSetlists';
import { actions as userSetlistsActions } from '../store/userSetlists';
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Paper, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from '../styles.js';

const SetlistDetail = (props) => {
    const classes = useStyles();

    const {
        updateSetlistidValue,
        getSetlist,
        userSetlists,
        setlistCheck,
        hasCurrentSetlist,
        deleteSetlist,
        removeSetlist,
        match: {
            params: {
                setlistId
            }
        } } = props;

    useEffect(() => {
        updateSetlistidValue(setlistId)
        getSetlist(setlistId);
        setlistCheck();
    }, [setlistId, updateSetlistidValue, getSetlist, userSetlists, setlistCheck, hasCurrentSetlist]);

    const handleSetlistDelete = () => {
        deleteSetlist();
        removeSetlist();
        setlistCheck();
    }

    if (props.setlist) {
        const setlist = props.setlist.results;
        const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        console.log(setlist);
        const songs = setlist.sets.set[0].song;
        return (
            <div className={classes.grow} style={{
                paddingLeft: 30,
                paddingRight: 30
            }}>
                <h4 style={{ color: "white" }}>Breadcrumbs</h4>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Paper id='setlist-info' className={classes.paper}>
                            <div style={{ display: "inline" }} id="setlist-title">
                                <Paper id="datebox" className={classes.dateBox} elevation={0}>
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
                            <Paper className={classes.detailCard}>
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
                                    {!hasCurrentSetlist ?
                                        <Button className={classes.buttonLite} variant="contained" color="primary" onClick={props.createUserSetlist}>+ I WAS THERE</Button> :
                                        <Button className={classes.buttonLite} variant="contained" color="primary" onClick={handleSetlistDelete}>- I WAS NOT THERE</Button>
                                    }
                                    {/* TODO: Update onClick to delete setlist}
                                    <Typography>THIS MANY Setlist Guru users were there</Typography>
                                    {/* TODO: Connect to total number users who have saved the setlist */}
                                </div>
                            </Paper>
                            <Paper className={classes.detailCard}>
                                <div>
                                    Comment Form
                                </div>
                            </Paper>
                            <Paper className={classes.detailCard}>
                                <Accordion className={classes.accordion}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.accordionHeading}>Comments</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                            sit amet blandit leo lobortis eget.
          </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </Paper>
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
        userSetlists: state.userSetlists.userSetlists,
        hasCurrentSetlist: state.userSetlists.hasCurrentSetlist,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateSetlistidValue: value => dispatch(actions.updateSetlistidValue(value)),
        getSetlist: () => dispatch(thunks.getSetlist()),
        createUserSetlist: () => dispatch(userSetlistsThunks.createUserSetlist()),
        getUserSetlists: () => dispatch(userSetlistsThunks.getUserSetlists()),
        setlistCheck: () => dispatch(userSetlistsThunks.setlistCheck()),
        deleteSetlist: () => dispatch(userSetlistsThunks.deleteSetlist()),
        removeSetlist: () => dispatch(userSetlistsActions.removeSetlist()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetlistDetail);