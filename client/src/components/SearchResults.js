import React from 'react';
import { connect } from 'react-redux';
// import { Button, TextField } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import { actions, thunks } from '../store/search';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     paper: {
//         padding: theme.spacing(2),
//         textAlign: 'center',
//         color: theme.palette.text.secondary,
//     },
//     formItem: {
//         padding: theme.spacing(2)
//     }
// }));

function SearchResults(props) {
    // const classes = useStyles();
    return (
        <div>
            <h1>SearchResults Component</h1>
            <div>
                Artist Info
            </div>
            <div>
                Filters
            </div>
            <div>
                Search Results
                <div>
                    {/* {gifUrls.map((url, i) => (
                        <img key={i} src={url} alt="gif" />
                    ))} */}
                    {console.log(Object.entries(props.setlists))}
                </div>
            </div>
        </div>
    );
};



const mapStateToProps = state => {
    return {
        setlists: state.search.setlists.setlist
    }
}



const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);