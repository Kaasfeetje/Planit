import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    makeStyles,
    Menu,
    MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function Header() {
    const classes = useStyles();

    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                    onClick={(e) => setMenuAnchorEl(e.currentTarget)}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={menuAnchorEl}
                    keepMounted
                    open={Boolean(menuAnchorEl)}
                    onClose={() => setMenuAnchorEl(null)}
                >
                    <Link to="/">
                        <MenuItem onClick={() => setMenuAnchorEl(null)}>
                            All Boards
                        </MenuItem>
                    </Link>
                    <Link to="/create">
                        <MenuItem onClick={() => setMenuAnchorEl(null)}>
                            Create Board
                        </MenuItem>
                    </Link>
                    <hr />
                    <Link to="/profile">
                        <MenuItem onClick={() => setMenuAnchorEl(null)}>
                            Profile
                        </MenuItem>
                    </Link>
                    <Link to="/logout">
                        <MenuItem onClick={() => setMenuAnchorEl(null)}>
                            Logout
                        </MenuItem>
                    </Link>
                </Menu>
                <Typography variant="h6" className={classes.title}>
                    <Link to="/">Planit</Link>
                </Typography>
                <Link to="/create" color="inherit">
                    <PostAddIcon fontSize="large" />
                </Link>
                <IconButton
                    color="inherit"
                    onClick={(e) => setProfileAnchorEl(e.currentTarget)}
                >
                    <AccountCircle fontSize="large" />
                </IconButton>
                <Menu
                    open={Boolean(profileAnchorEl)}
                    onClose={() => setProfileAnchorEl(null)}
                    anchorEl={profileAnchorEl}
                    keepMounted
                >
                    <Link to="/profile">
                        <MenuItem onClick={() => setMenuAnchorEl(null)}>
                            Profile
                        </MenuItem>
                    </Link>
                    <Link to="/">
                        <MenuItem onClick={() => setMenuAnchorEl(null)}>
                            All Boards
                        </MenuItem>
                    </Link>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
