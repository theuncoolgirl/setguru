import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, Grid, InputBase, Paper, Typography } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import { actions } from '../store/search';
import background from '../images/concert.jpg';
import flatliners from '../images/flatliners.png';
import againstMe from '../images/againstMe.png';
import pup from '../images/pup.jpg';

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
        backgroundSize: "128%",
        backgroundPosition: "50% 20%",
    },
    searchTitle: {
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
}));

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
                    <Button className={classes.formItem} variant="contained" color="primary" onClick={() => window.location.href = `/search/${searchQuery}/1`}>Search</Button>
                </div>
            </div>
            <Container>
                <div>
                    <Typography style={{ color: "white" }} variant="h6" noWrap>Artists to Know</Typography>
                </div>
                <Grid container justify="space-between" className={classes.root}>
                    <Grid item xs={3}>
                        <Paper className={classes.artist} style={{ backgroundImage: `url(${flatliners})` }} />
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.artist} style={{ backgroundImage: `url(${againstMe})` }} />
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.artist} style={{ backgroundImage: `url(${pup})` }} />
                    </Grid>
                </Grid>
                <Typography style={{ color: "white" }} variant="h6" noWrap>Bottom Section</Typography>
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