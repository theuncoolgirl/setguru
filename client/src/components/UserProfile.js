import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { actions, thunks } from '../store/setlist';
import { thunks as userSetlistsThunks } from '../store/userSetlists';
import { actions as userSetlistsActions } from '../store/userSetlists';
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from '../styles.js';
import { render } from 'react-dom';

const UserProfile = (props) => {
    const classes = useStyles();

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
                            <div>
                                <h1 id="setlist-details">User Info</h1>
                            </div>
                        </Paper>
                        <Paper className={classes.detailCard}>
                            <Accordion className={classes.accordion}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.accordionHeading}>Attended Concerts</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        To be built.
                                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Paper>
                    </Paper>
                </Grid>

            </Grid >
        </div>
    )
}

export default UserProfile;