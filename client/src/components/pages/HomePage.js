import { CircularProgress, Container, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoardCard from "../Board/BoardCard";
import Header from "../common/Header";
import { fetchMyBoardsAction } from "../../actions/boardActions";
function HomePage() {
    const dispatch = useDispatch();

    const fetchMyBoards = useSelector((state) => state.fetchMyBoards);
    const { loading, boards } = fetchMyBoards;

    useEffect(() => {
        dispatch(fetchMyBoardsAction());
    }, [dispatch]);

    const renderedBoards =
        boards &&
        boards.map((board) => (
            <Grid key={board.id} item xs={12} md={6} lg={4} xl={3}>
                <BoardCard board={board} />
            </Grid>
        ));

    return (
        <div>
            <Header />
            <Container>
                {loading && <CircularProgress />}
                <Grid container spacing={3}>
                    {renderedBoards}
                </Grid>
            </Container>
        </div>
    );
}

export default HomePage;
