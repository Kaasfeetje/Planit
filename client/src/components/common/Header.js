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
import AccountCircle from "@material-ui/icons/AccountCircle";

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
                    <MenuItem onClick={() => setMenuAnchorEl(null)}>
                        All Boards
                    </MenuItem>
                    <MenuItem onClick={() => setMenuAnchorEl(null)}>
                        Create Board
                    </MenuItem>
                    <hr />
                    <MenuItem onClick={() => setMenuAnchorEl(null)}>
                        Profile
                    </MenuItem>
                    <MenuItem onClick={() => setMenuAnchorEl(null)}>
                        My account
                    </MenuItem>
                    <MenuItem onClick={() => setMenuAnchorEl(null)}>
                        Logout
                    </MenuItem>
                </Menu>
                <Typography variant="h6" className={classes.title}>
                    Planit
                </Typography>
                <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
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
                    <MenuItem>Profile</MenuItem>
                    <MenuItem>All Boards</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
