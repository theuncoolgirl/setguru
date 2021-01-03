import React from 'react';
import { connect } from 'react-redux';
import { thunks } from '../store/auth';
import { actions } from '../store/search';
import { AppBar, Button, InputBase, Link, Toolbar, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from '../styles.js';

function Navigation(props) {
    const classes = useStyles();
    const searchQuery = encodeURIComponent(props.searchQuery);

    return (
        <div className={classes.grow}>
            <AppBar className={classes.appbar} position="static">
                <Toolbar>
                    <Typography className={classes.logo} variant="h6" noWrap>
                        <Link underline="none" href="/" color="inherit">Setlist Guru</Link>
                    </Typography>
                    <div className={classes.grow} />
                    {props.token ? (
                    <div>
                    {window.location.pathname !== '/' ? (
                        <div className={classes.navsearch}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search Coins"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={props.updateSearchValue}
                            />
                        </div>
                    ) : null}
                    <div className={classes.sectionDesktop}>
                        {window.location.pathname !== '/' ? (
                            <div>
                                <Button className={classes.buttonLite} variant="contained" color="primary" onClick={() => window.location.href = `/search/${searchQuery}/1`} >Search</Button>
                            </div>
                        ) : null}
                        <div>
                                <Button className={classes.buttonLite} variant="contained" color="primary" onClick={props.logout} >Logout</Button>
                               
                        </div>
                        <div>
                            <Link underline="none" href={`/user/${localStorage.getItem("USERID")}`} color="inherit">
                                <Button className={classes.buttonLite} variant="contained" color="primary" >Account</Button>
                            </Link>
                        </div>
                        
                    </div>
                        </div>
                    ) : null} 
                </Toolbar>
            </AppBar>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        setlists: state.setlists,
        token: state.auth.token,
        searchQuery: state.search.searchQuery,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(thunks.logout()),
        updateSearchValue: e => dispatch(actions.updateSearchValue(e.target.value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);