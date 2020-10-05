import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { actions, thunks } from '../store/userProfile';
import { Button, Grid, Link, Paper, Typography } from '@material-ui/core';
import useStyles from '../styles.js';

const UserProfile = (props) => {
    const classes = useStyles();

    const { getUsername, username, getAttendedConcerts, attendedConcerts } = props;
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    useEffect(() => {
        getUsername();
        if (attendedConcerts) {
            console.log("Length = ", attendedConcerts.length)
        } else {
            console.log("No attendedConcerts")
        }
    }, [getUsername, username, attendedConcerts]);

    // const concertHandler = async () => {
    //     await getUsername();
    //     await getAttendedConcerts();
    // }
    console.log(attendedConcerts)
    return (
        <div className={classes.grow} style={{
            paddingLeft: 30,
            paddingRight: 30
        }}>
            <h4 style={{ color: "white" }}>Breadcrumbs</h4>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Paper id='setlist-info' className={classes.paper}>
                        <Paper className={classes.detailCard}>
                            <Typography className={classes.searchTitle} style={{ margin: 15, fontSize: "2em" }}>
                                {props.username}
                            </Typography>
                        </Paper>
                        <Paper className={classes.detailCard}>
                            <Button className={classes.artistButton} variant="contained" color="primary" onClick={getAttendedConcerts}>Show Attended Concerts</Button>
                            {attendedConcerts && attendedConcerts.length > 0 ? (
                                <ul>
                                    {console.log(attendedConcerts[0])}
                                    {attendedConcerts.map((concert, i) => (
                                        <li key={i}>
                                            <span>{months[parseInt(concert.date.split("").slice(3, 5).join("")) - 1]} </span>
                                            <span>{concert.date.split("").slice(0, 2).join("")}, </span>
                                            <span>{concert.date.split("").slice(6).join("")}: </span>
                                            <Link href={`/setlist/${concert.setListId}`} style={{ color: "#CD9337" }}>
                                                <span>{concert.artist} at </span>
                                                <span>{concert.venue}, </span>
                                                <span>{concert.city}, </span>
                                                <span>{concert.state}, </span>
                                                <span>{concert.country}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : null}
                        </Paper>
                    </Paper>
                </Grid>

            </Grid >
        </div >
    )
}

const mapStateToProps = state => {
    return {
        username: state.userProfile.username,
        attendedConcerts: state.userProfile.attendedConcerts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateUsernameValue: (value) => dispatch(actions.updateUsernameValue(value)),
        getUsername: () => dispatch(thunks.getUsername()),
        getAttendedConcerts: () => dispatch(thunks.getAttendedConcerts()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);