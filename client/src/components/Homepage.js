import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, Grid, InputBase, Link, Paper, Typography } from '@material-ui/core';
import useStyles from '../styles.js';
import { actions } from '../store/search';
import flatliners from '../images/flatliners.png';
import againstMe from '../images/againstMe.png';
import pup from '../images/pup.jpg';

function Homepage(props) {
    const classes = useStyles();
    const searchQuery = encodeURIComponent(props.searchQuery);

    return (
        <div>
            <div className={classes.hero}>
                <Typography className={classes.searchTitle} variant="h6" noWrap>Find setlists for your favorite artists</Typography>
                <div>
                    <InputBase className={classes.search} id="searchBar" placeholder="  Artist, Venue, Location..." onChange={props.updateSearchValue} />
                    {/* ToDO: disable enter key */}
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => window.location.href = `/search/${searchQuery}/1`}>Search</Button>
                </div>
            </div>
            <Container>
                <div>
                    <Typography style={{ color: "white" }} variant="h6" noWrap>Artists to Know</Typography>
                </div>
                <Grid container justify="space-between" className={classes.artists}>
                    <Grid item xs={3}>
                        <Link underline="none" href="/search/The%20Flatliners/1">
                            <Paper className={classes.artist} style={{ backgroundImage: `url(${flatliners})` }}>
                                <Button className={classes.artistButton} variant="contained" color="primary">The Flatliners</Button>
                            </Paper>
                        </Link>
                    </Grid>
                    <Grid item xs={3}>
                        <Link underline="none" href="/search/Against%20Me/1">
                            <Paper className={classes.artist} style={{ backgroundImage: `url(${againstMe})` }}>
                                <Button className={classes.artistButton} variant="contained" color="primary">Against Me!</Button>
                            </Paper>
                        </Link>
                    </Grid>
                    <Grid item xs={3}>
                        <Link underline="none" href="/search/Pup/1">
                            <Paper className={classes.artist} style={{ backgroundImage: `url(${pup})` }}>
                                <Button className={classes.artistButton} variant="contained" color="primary">PUP</Button>
                            </Paper>
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </div >
    );
};

const mapStateToProps = state => {
    return {
        searchQuery: state.search.searchQuery,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        receiveSetlists: e => dispatch(actions.receiveSetlists(e.target.value)),
        updateSearchValue: e => dispatch(actions.updateSearchValue(e.target.value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);