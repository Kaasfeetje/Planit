import {
    Button,
    CircularProgress,
    Grid,
    makeStyles,
    Paper,
    TextField,
    Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

import SaveIcon from "@material-ui/icons/Save";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import BoardCard from "./BoardCard";
import { useDispatch, useSelector } from "react-redux";
import { uploadBoardImageAction } from "../../actions/uploadActions";
import { createBoardAction } from "../../actions/boardActions";
import { history } from "../../history";

const useStyles = makeStyles((theme) => ({
    gridItem: {
        display: "flex",
        justifyContent: "center",
    },
    grid: {
        marginTop: theme.spacing(1),
    },
    alignText: {
        textAlign: "center",
        marginTop: theme.spacing(2),
        paddingTop: theme.spacing(1),
    },
    cardGrid: {
        display: "flex",
        justifyContent: "center",
        paddingBottom: theme.spacing(2),
    },
    input: {
        display: "none",
    },
    image: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: theme.spacing(6),
        marginTop: theme.spacing(2),
    },
}));

function BoardCreate() {
    const classes = useStyles();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [goal, setGoal] = useState("");

    const uploadBoardImage = useSelector((state) => state.uploadBoardImage);
    const { loading: uploadLoading, boardImage } = uploadBoardImage;

    const createBoard = useSelector((state) => state.createBoard);
    const { loading: createLoading, success } = createBoard;

    const dispatch = useDispatch();

    const createHandler = (e) => {
        e.preventDefault();
        dispatch(createBoardAction(name, description, goal, boardImage));
    };

    const uploadHandler = (e) => {
        if (!e.target.files[0]);
        dispatch(uploadBoardImageAction(e.target.files[0]));
    };

    useEffect(() => {
        if (success) {
            history.push("/");
        }
    }, [success]);

    return (
        <Paper>
            <Typography variant="h5" className={classes.alignText}>
                Create Board
            </Typography>
            <form onSubmit={createHandler}>
                <Grid container spacing={4} className={classes.grid}>
                    <Grid className={classes.gridItem} item xs={4}>
                        <TextField
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label="Name"
                        />
                    </Grid>
                    <Grid className={classes.gridItem} item xs={4}>
                        <TextField
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            label="Description"
                            multiline
                            fullWidth
                        />
                    </Grid>
                    <Grid className={classes.gridItem} item xs={4}>
                        <TextField
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            label="Goal"
                            multiline
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <div className={classes.image}>
                    {uploadLoading && <CircularProgress />}
                    <Typography variant="body1" color="textSecondary">
                        Image:
                    </Typography>
                    <input
                        onChange={uploadHandler}
                        accept="image/*"
                        className={classes.input}
                        id="board-image-file"
                        type="file"
                    />
                    <label htmlFor="board-image-file">
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<CloudUploadIcon />}
                            component="span"
                        >
                            Upload
                        </Button>
                    </label>
                </div>
                <Grid container className={classes.cardGrid}>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                        <BoardCard
                            board={{
                                name: name ? name : "Example name",
                                description: description
                                    ? description
                                    : "Example description",
                                goal,
                                image: boardImage,
                            }}
                            preview
                            clickFunction={() => {}}
                        />
                    </Grid>
                </Grid>
                <div className={classes.cardGrid}>
                    <Button
                        onClick={createHandler}
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        type="submit"
                        component="span"
                        disabled={uploadLoading || createLoading}
                    >
                        Save
                    </Button>
                </div>
            </form>
        </Paper>
    );
}

export default BoardCreate;
