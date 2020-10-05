import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { actions, thunks } from '../store/search';
import { Button, Grid, Link, Paper, Typography } from '@material-ui/core';
import useStyles from '../styles.js';
import Pagination from './Pagination';

function SearchResults(props) {
    const classes = useStyles();
    const {
        updateSearchValue,
        updatePageNumber,
        getSetlists,
        match: {
            params: {
                page, query
            },
        },
    } = props;

    useEffect(() => {
        const searchQuery = query;
        updateSearchValue(searchQuery);
        updatePageNumber(page);
        getSetlists();
    }, [updateSearchValue, updatePageNumber, getSetlists, page, query]);

    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    const setlists = Object.values(props.setlists);

    if (setlists[0]) {
        return (
            <div className={classes.grow} style={{
                paddingLeft: 30,
                paddingRight: 30
            }}>
                <h1 style={{ color: "white" }}>Search Results</h1>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Paper className={classes.paper} style={{ height: 1000, color: "white" }}>
                            <Button className={classes.buttonLite} style={{ width: 'auto' }} variant="contained" color="primary">Artist Info</Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={9}>
                        <Paper id='search-results' className={classes.paper}>
                            {setlists.map((setlist) => (
                                <Paper key={setlist.id} id='single-result' variant="outlined" style={{ padding: 15, margin: 2, backgroundColor: "#3E3F4D", color: "white" }}>
                                    <Grid container spacing={2} alignItems="center" justify="center">
                                        <Grid item xs={2}>
                                            <Paper className={classes.dateBox} elevation={0} >
                                                <Typography noWrap>{months[parseInt(setlist.eventDate.split("").slice(3, 5).join("")) - 1]}</Typography>
                                                <Typography style={{ fontSize: "2em", margin: 0 }} noWrap>{setlist.eventDate.split("").slice(0, 2).join("")}</Typography>
                                                <Typography noWrap>{setlist.eventDate.split("").slice(6).join("")}</Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <Paper elevation={0} variant='outlined' style={{ backgroundColor: "#3E3F4D", color: "white", padding: 14 }}>
                                                <div>
                                                    <Link href={`/setlist/${setlist.id}`} style={{ color: "#CD9337" }}>
                                                        {setlist.artist.name} at {setlist.venue.name}, {setlist.venue.city.name}, {setlist.venue.city.stateCode}, {setlist.venue.city.country.name}
                                                    </Link>
                                                </div>

                                                <div>
                                                    Artist: {setlist.artist.name}, Venue: {setlist.venue.name}, {setlist.venue.city.name}, {setlist.venue.city.stateCode}, {setlist.venue.city.country.name}
                                                </div>
                                                <div>
                                                    {setlist.sets.set.length > 0 ? (
                                                        <div style={{ color: "#7e7f97" }}>
                                                            {setlist.sets.set[0].song[0] && setlist.sets.set[0].song[0].name ? setlist.sets.set[0].song[0].name : null} {setlist.sets.set[0].song[1] && setlist.sets.set[0].song[1].name ? setlist.sets.set[0].song[1].name : null} {setlist.sets.set[0].song[2] && setlist.sets.set[0].song[2].name ? setlist.sets.set[0].song[2].name : null} {setlist.sets.set[0].song[3] && setlist.sets.set[0].song[3].name ? setlist.sets.set[0].song[3].name : null} {setlist.sets.set[0].song[4] && setlist.sets.set[0].song[4].name ? setlist.sets.set[0].song[4].name : null} & more...
                                                        </div>
                                                    ) : null}
                                                </div>
                                                {/* <div>Options (add/star)</div> */}
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            ))}
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper} hidden={true} >Filters</Paper>
                    </Grid>
                    <Grid item xs={9}>
                        <Paper className={classes.paper}>
                            <Pagination />
                        </Paper>
                    </Grid>
                </Grid >
            </div >
        );
    } else {
        return (
            <h3> Loading results... </h3>
        )
    }
};

const mapStateToProps = state => {
    return {
        setlists: state.search.setlists.setlist,
        searchQuery: state.search.searchQuery,
        page: state.search.page,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateSearchValue: value => dispatch(actions.updateSearchValue(value)),
        updatePageNumber: value => dispatch(actions.updatePageNumber(value)),
        getSetlists: () => dispatch(thunks.getSetlists()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);