import React from 'react';
import { Typography } from '@material-ui/core';
import useStyles from '../styles.js';


function NotFound(props) {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.hero}>
                <Typography className={classes.searchTitle} variant="h6" noWrap>404 Not Found</Typography>
                <Typography className={classes.searchTitle} variant="h6" noWrap>Uh-oh! Nothing was found to match your request. Please try again. </Typography>
            </div>
        </div >
    );
};

export default NotFound;