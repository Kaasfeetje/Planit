import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    makeStyles,
    Typography,
} from "@material-ui/core";
import React from "react";
import { history } from "../../history";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

function BoardCard({
    board = {
        id: "1",
        name: "Board name",
        description: "Description...",
        image: "https://via.placeholder.com/255x140",
    },
}) {
    const classes = useStyles();

    return (
        <Card>
            <CardActionArea onClick={() => history.push(`/board/${board.id}`)}>
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
            <CardActions>
                <Button size="small" color="primary">
                    Invite
                </Button>
                <Button
                    size="small"
                    color="primary"
                    onClick={() => history.push(`/board/${board.id}`)}
                >
                    Open
                </Button>
            </CardActions>
        </Card>
    );
}

export default BoardCard;
