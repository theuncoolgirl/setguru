import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import useStyles from '../styles.js';

function Pagination(props) {
    const classes = useStyles();
    const pageNum = parseInt(props.page);
    const searchQuery = props.searchQuery;
    const lastPage = Math.ceil(props.setlists.total / 20);

    return (
        <div>
            {pageNum > 3 ? (
                <Button className={classes.pageButton} variant="contained" color="primary" onClick={() => window.location.href = `/search/${searchQuery}/1`} >&lt;&lt;</Button>
            ) : null}
            {pageNum > 2 ? (
                <Button className={classes.pageButton} variant="contained" color="primary" onClick={() => window.location.href = `/search/${searchQuery}/${pageNum - 2}`} >{pageNum - 2}</Button>
            ) : null}
            {pageNum > 1 ? (
                <Button className={classes.pageButton} variant="contained" color="primary" onClick={() => window.location.href = `/search/${searchQuery}/${pageNum - 1}`}>{pageNum - 1}</Button>
            ) : null}
            <Button className={classes.currentPage} variant="contained" color="primary">{pageNum}</Button>
            {/* if (pageNum + 2) < lastNum  */}
            {pageNum < lastPage ? (
                <Button className={classes.pageButton} variant="contained" color="primary" onClick={() => window.location.href = `/search/${searchQuery}/${pageNum + 1}`} >{pageNum + 1}</Button>
            ) : null}
            {/* if (pageNum + 1) < lastNum  */}
            {(pageNum + 1) < lastPage ? (
                <Button className={classes.pageButton} variant="contained" color="primary" onClick={() => window.location.href = `/search/${searchQuery}/${pageNum + 2}`} >{pageNum + 2}</Button>
            ) : null}
            {/* if (pageNum + 2) < lastNum  */}
            {(pageNum + 2) < lastPage ? (
                <Button className={classes.pageButton} variant="contained" color="primary" onClick={() => window.location.href = `/search/${searchQuery}/${lastPage}`} >&gt;&gt;</Button>
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