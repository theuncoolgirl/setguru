import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';

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
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        margin: 5,
        padding: 5,
        minWidth: 35
    },
    currentPage: {
        backgroundColor: fade(theme.palette.common.white, 0.35),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.35),
        },
        cursor: "default",
        // pointerEvents: "auto",
        margin: 5,
        padding: 5,
        minWidth: 35
    }
}));

function Pagination(props) {
    const classes = useStyles();
    const pageNum = parseInt(props.page);
    const searchQuery = props.searchQuery;
    const lastPage = Math.ceil(props.setlists.total / 20);

    return (
        <div>
            {pageNum > 3 ? (
                <Button className={classes.formItem} variant="contained" color="primary" onClick={() => window.location.href = `/search/${searchQuery}/1`} >&lt;&lt;</Button>
            ) : null}
            {pageNum > 2 ? (
                <Button className={classes.formItem} variant="contained" color="primary" onClick={() => window.location.href = `/search/${searchQuery}/${pageNum - 2}`} >{pageNum - 2}</Button>
            ) : null}
            {pageNum > 1 ? (
                <Button className={classes.formItem} variant="contained" color="primary" onClick={() => window.location.href = `/search/${searchQuery}/${pageNum - 1}`}>{pageNum - 1}</Button>
            ) : null}
            <Button className={classes.currentPage} variant="contained" color="primary">{pageNum}</Button>
            {/* if (pageNum + 2) < lastNum  */}
            {pageNum < lastPage ? (
                <Button className={classes.formItem} variant="contained" color="primary" onClick={() => window.location.href = `/search/${searchQuery}/${pageNum + 1}`} >{pageNum + 1}</Button>
            ) : null}
            {/* if (pageNum + 1) < lastNum  */}
            {(pageNum + 1) < lastPage ? (
                <Button className={classes.formItem} variant="contained" color="primary" onClick={() => window.location.href = `/search/${searchQuery}/${pageNum + 2}`} >{pageNum + 2}</Button>
            ) : null}
            {/* if (pageNum + 2) < lastNum  */}
            {(pageNum + 2) < lastPage ? (
                <Button className={classes.formItem} variant="contained" color="primary" onClick={() => window.location.href = `/search/${searchQuery}/${lastPage}`} >&gt;&gt;</Button>
            ) : null}

        </div>
    )
}

const mapStateToProps = state => {
    return {
        setlists: state.search.setlists,
        searchQuery: state.search.searchQuery,
        page: state.search.page
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);