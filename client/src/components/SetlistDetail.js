import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { actions, thunks } from '../store/setlist';
import { thunks as userSetlistsThunks } from '../store/userSetlists';
import { actions as userSetlistsActions } from '../store/userSetlists';
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from '../styles.js';

const SetlistDetail = (props) => {
    const classes = useStyles();

    const {
        updateSetlistidValue,
        getSetlist,
        getComments,
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
        getComments();
    }, [setlistId, updateSetlistidValue, getSetlist, userSetlists, setlistCheck, hasCurrentSetlist, getComments]);

    const handleSetlistDelete = () => {
        deleteSetlist();
        removeSetlist();
        setlistCheck();
    }

    const findUserComment = () => {
        if (props.comments) {
            for (let i = 0; i < props.comments.length; i++) {
                if (props.comments[i].userId === parseInt(localStorage.getItem("USERID"))) {
                    return props.comments[i].comment
                } else {
                    return "Add a Comment";
                }
            }
        }
    }

    if (props.setlist) {
        const setlist = props.setlist.results;
        const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
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
                                    <div>{months[parseInt(setlist.eventDate.split("").slice(3, 5).join("")) - 1]}</div>
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
                                    {/* <Typography>THIS MANY Setlist Guru users were there</Typography>
                                    {/* TODO: Connect to total number users who have saved the setlist */}
                                </div>
                            </Paper>
                            {hasCurrentSetlist ?
                                <Paper className={classes.detailCard}>
                                    <div>
                                        <Typography className={classes.accordionHeading}>Add or Update Your Comments</Typography>
                                        <TextField id="filled-textarea"
                                            // label="Comment"
                                            defaultValue={findUserComment()}
                                            multiline
                                            rows={3}
                                            className={classes.search}
                                            variant="filled"
                                            onChange={props.updateNewCommentValue} />
                                        <div>
                                            <Button className={classes.button} variant="contained" color="primary" onClick={props.addComment}>Submit Comment</Button>
                                        </div>
                                        {/* <InputBase className={classes.search} id="searchBar" placeholder="  Artist, Venue, Location..." onChange={props.updateSearchValue} /> */}
                                    </div>
                                </Paper>
                                : null}
                            <Paper className={classes.detailCard}>
                                <Accordion className={classes.accordion}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        onClick={props.getComments}
                                    >
                                        <Typography className={classes.accordionHeading}>Comments</Typography>
                                    </AccordionSummary>
                                    {props.comments && props.comments.length > 0 ?
                                        (<div>
                                            {props.comments.map((comment, i) => (
                                                <AccordionDetails key={i}>
                                                    <Typography>
                                                        {comment.comment} by {comment.username}
                                                    </Typography>
                                                </AccordionDetails>
                                            ))}
                                        </div>) : (
                                            <div>
                                                <AccordionDetails>
                                                    <Typography>
                                                        No comments yet! Been to this show? Add your comment in the form above.
                                                    </Typography>
                                                </AccordionDetails>
                                            </div>
                                        )}
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
        comments: state.userSetlists.comments,
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
        getComments: () => dispatch(userSetlistsThunks.getComments()),
        updateNewCommentValue: (e) => dispatch(userSetlistsActions.updateNewCommentValue(e.target.value)),
        addComment: () => dispatch(userSetlistsThunks.addComment()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetlistDetail);