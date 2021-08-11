import { Container, Grid, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyBoardsAction } from "../../actions/boardActions";
import { history } from "../../history";
import BoardCard from "../Board/BoardCard";
import Header from "../common/Header";
import Profile from "../Profile/Profile";

const useStyles = makeStyles((theme) => ({
    marginTop: {
        marginTop: theme.spacing(4),
    },
}));

function ProfilePage() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const fetchMyBoards = useSelector((state) => state.fetchMyBoards);
    const { boards } = fetchMyBoards;

    useEffect(() => {
        dispatch(fetchMyBoardsAction());
    }, [dispatch]);

    const renderedBoards =
        boards &&
        boards.map((board) => (
            <Grid key={board.id} item xs={12} md={6} lg={4} xl={3}>
                <BoardCard
                    board={board}
                    clickFunction={() => history.push(`/board/${board.id}`)}
                />
            </Grid>
        ));

    return (
        <div>
            <Header />
            <Container>
                <Profile />
                <Grid className={classes.marginTop} container spacing={3}>
                    {renderedBoards}
                </Grid>
            </Container>
        </div>
    );
}

export default ProfilePage;
