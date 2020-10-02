import React from 'react';
import { connect } from 'react-redux';
import { Button, InputBase, Grid, Typography } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import { actions } from '../store/search';
import background from '../images/concert.jpg';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
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
                <form className={classes.root} noValidate autoComplete="off">
                    <InputBase className={classes.search} id="searchBar" placeholder="  Artist, Venue, Location..." onChange={props.updateSearchValue} />
                    {/* ToDO: disable enter key */}
                    <Button className={classes.formItem} variant="contained" color="primary" onClick={() => window.location.href = `/search/${searchQuery}/1`}>Search</Button>
                </form>
            </div>
            <h1 className={classes.homepageTitle}>Homepage Component</h1>

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