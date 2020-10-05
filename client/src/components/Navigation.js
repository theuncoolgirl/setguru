import React from 'react';
import { connect } from 'react-redux';
import { thunks } from '../store/auth';
import { actions } from '../store/search';
import { AppBar, Button, IconButton, InputBase, Link, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import useStyles from '../styles.js';

function Navigation(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const searchQuery = encodeURIComponent(props.searchQuery);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {/* <MenuItem onClick={handleMenuClose}>Placeholder 1</MenuItem>
            <MenuItem onClick={handleMenuClose}>Placeholder 2</MenuItem> */}
        </Menu>
    );


    return (
        <div className={classes.grow}>
            <AppBar className={classes.appbar} position="static">
                <Toolbar>
                    <Typography className={classes.logo} variant="h6" noWrap>
                        <Link underline="none" href="/" color="inherit">Setlist Guru</Link>
                    </Typography>

                    <div className={classes.grow} />
                    {window.location.pathname !== '/' ? (
                        <div className={classes.navsearch}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
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
                            <Button className={classes.buttonLite} variant="contained" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleProfileMenuOpen}>Menu</Button>
                        </div>
                        <div>
                            <Button className={classes.buttonLite} variant="contained" color="primary" onClick={props.logout} >Logout</Button>
                        </div>
                        <div>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit">
                                <Link underline="none" href={`/user/${localStorage.getItem("USERID")}`} color="inherit">
                                    <AccountCircleIcon />
                                </Link>
                            </IconButton>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
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