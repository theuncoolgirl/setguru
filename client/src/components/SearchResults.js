import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { actions, thunks } from '../store/search';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import { actions, thunks } from '../store/search';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    formItem: {
        padding: theme.spacing(2)
    }
}));

function SearchResults(props) {
    const classes = useStyles();

    useEffect(() => {
        const searchQuery = props.match.params.query;
        const page = props.match.params.page;
        props.updateSearchValue(searchQuery);
        props.updatePageNumber(page);
        props.getSetlists(props.searchQuery, props.page);
    }, []);

    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    const setlists = Object.values(props.setlists);
    if (setlists[0]) {
        return (
            <div className={classes.root} style={{
                paddingLeft: 30,
                paddingRight: 30
            }}>
                <h1>Search Results</h1>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>Artist Info</Paper>
                    </Grid>
                    <Grid item xs={9}>
                        <Paper id='search-results' className={classes.paper}>
                            {setlists.map((setlist) => (
                                <Paper key={setlist.id} id='single-result' variant="outlined" style={{ padding: 15, margin: 2 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2}>
                                            <Paper elevation={0} style={{ backgroundColor: 'yellowgreen' }}>
                                                <div>{setlist.eventDate.split("").slice(0, 2).join("")}</div>
                                                <div>{months[parseInt(setlist.eventDate.split("").slice(3, 5).join(""))]}</div>
                                                <div>{setlist.eventDate.split("").slice(6).join("")}</div>
                                                {console.log(setlist.eventDate.split(""))}
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={10}>

                                            <Paper elevation={0} variant='outlined'>
                                                <div>
                                                    {/* {console.log(setlist.artist.name)} */}
                                                    {setlist.artist.name} at {setlist.venue.name}, {setlist.venue.city.name}, {setlist.venue.city.stateCode}, {setlist.venue.city.country.name}
                                                </div>

                                                <div>
                                                    Artist: {setlist.artist.name}, Venue: {setlist.venue.name}, {setlist.venue.city.name}, {setlist.venue.city.stateCode}, {setlist.venue.city.country.name}
                                                </div>
                                                <div>
                                                    {setlist.sets.set.length > 0 ? (
                                                        <div>
                                                            {setlist.sets.set[0].song[0].name}, {setlist.sets.set[0].song[1].name}, {setlist.sets.set[0].song[2].name}, {setlist.sets.set[0].song[3].name}, {setlist.sets.set[0].song[4].name}, {setlist.sets.set[0].song[5].name} & more...
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div>Options (add/star)</div>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            ))}
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>Filters</Paper>
                    </Grid>
                    {/* {gifUrls.map((url, i) => (
                        <img key={i} src={url} alt="gif" />
                    ))} */}
                    {/* {console.log(Object.entries(props.setlists))} */}
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
        getSetlists: (query, page) => dispatch(thunks.getSetlists(query, page)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);