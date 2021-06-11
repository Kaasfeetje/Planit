import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    makeStyles,
    Menu,
    TextField,
    Typography,
} from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    inviteMenu: {
        padding: theme.spacing(1),
    },
    inviteCopy: {
        display: "flex",
        alignItems: "center",
    },
}));

function BoardCard({
    board = {
        id: "1",
        name: "Board name",
        description: "Description...",
        image: "https://via.placeholder.com/255x140",
    },
    preview,
    join,
    clickFunction,
}) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(undefined);

    const copyInviteLink = (e) => {
        const link = document.getElementById("invite-copy");
        link.select();

        document.execCommand("copy");
    };

    return (
        <Card>
            <CardActionArea
                onClick={() => !preview && !join && clickFunction()}
            >
                <CardMedia
                    image={board.image}
                    className={classes.media}
                    title={board.name}
                />
                <CardContent>
                    <Typography gutterBottom varriant="h5" component="h2">
                        {board.name}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {board.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {join ? (
                <CardActions>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => clickFunction()}
                    >
                        Join
                    </Button>
                </CardActions>
            ) : (
                <>
                    <CardActions>
                        <Button
                            size="small"
                            color="primary"
                            onClick={(e) => setAnchorEl(e.target)}
                        >
                            Invite
                        </Button>
                        <Button
                            size="small"
                            color="primary"
                            onClick={() => !preview && clickFunction()}
                        >
                            Open
                        </Button>
                    </CardActions>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={(e) => setAnchorEl(undefined)}
                    >
                        <div className={classes.inviteMenu}>
                            <Typography variant="body1" color="textSecondary">
                                Invite link
                            </Typography>
                            <div className={classes.inviteCopy}>
                                <TextField
                                    id="invite-copy"
                                    defaultValue={`http://localhost:3000/${board.id}/join`}
                                    size="small"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <IconButton onClick={copyInviteLink}>
                                    <FileCopyIcon />
                                </IconButton>
                            </div>
                        </div>
                    </Menu>
                </>
            )}
        </Card>
    );
}

export default BoardCard;
