import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, Grid, InputBase, Paper, Typography } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import { actions } from '../store/search';
import background from '../images/concert.jpg';
import flatliners from '../images/flatliners.jpg';
import againstMe from '../images/againstMe.png';
import pup from '../images/pup.jpg';
// import pupGif from '../images/video2.gif';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 1170
    },
    formItem: {
        backgroundColor: fade(theme.palette.common.white, 0.35),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.50),
        },
        margin: 5,
    },
    hero: {
        height: 350,
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "0% 50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    artist: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 195,
        width: 325,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundImage: `url(${flatliners})`,
        backgroundSize: "130%",
        backgroundPosition: "60% 50%",
    },
    flatliners: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 195,
        width: 325,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundImage: `url(${flatliners})`,
        backgroundSize: "130%",
        backgroundPosition: "60% 50%",
    },
    againstMe: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 195,
        width: 325,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundImage: `url(${againstMe})`,
        backgroundSize: "100%",
        backgroundPosition: "40% 5%",
    },
    pup: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 195,
        width: 325,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundImage: `url(${pup})`,
        backgroundSize: "125%",
        backgroundPosition: "60% 50%",
    },
    title: {
        color: 'white',
        fontSize: "2em"
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.35),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.50),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: 500,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
        },
    },
    homepageTitle: {
        color: 'white',
    }
}));

function Homepage(props) {
    const classes = useStyles();
    const searchQuery = encodeURIComponent(props.searchQuery);

    return (
        <div>
            <div className={classes.hero}>
                <Typography className={classes.title} variant="h6" noWrap>Find setlists for your favorite artists</Typography>
                <form noValidate autoComplete="off">
                    <InputBase className={classes.search} id="searchBar" placeholder="  Artist, Venue, Location..." onChange={props.updateSearchValue} />
                    {/* ToDO: disable enter key */}
                    <Button className={classes.formItem} variant="contained" color="primary" onClick={() => window.location.href = `/search/${searchQuery}/1`}>Search</Button>
                </form>
            </div>
            <Container>
                <div>
                    <Typography className={classes.homepageTitle} variant="h6" noWrap>Artists to Know</Typography>
                </div>
                <Grid container justify="space-between" className={classes.root}>
                    <Grid item xs={3}>
                        <Paper className={classes.flatliners} />
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.againstMe} />
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.pup} />
                    </Grid>
                </Grid>
                <h1 className={classes.homepageTitle}>Bottom</h1>
            </Container>


        </div>
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