import { CircularProgress, Container, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoardCard from "../Board/BoardCard";
import Header from "../common/Header";
import { fetchMyBoardsAction } from "../../actions/boardActions";
import { history } from "../../history";
import ErrorMessage from "../common/ErrorMessage";
import SuccessMessage from "../common/SuccessMessage";

function HomePage() {
    const dispatch = useDispatch();

    const fetchMyBoards = useSelector((state) => state.fetchMyBoards);
    const { loading, boards, error } = fetchMyBoards;

    const { success: createBoardSuccess } = useSelector(
        (state) => state.createBoard
    );
    const { success: deleteBoardSuccess } = useSelector(
        (state) => state.deleteBoard
    );

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
            <ErrorMessage errorMessage={error} autoHideDuration={3000} />
            <SuccessMessage
                successMessage={
                    createBoardSuccess
                        ? "Successfully created a new board."
                        : false
                }
                autoHideDuration={3000}
            />
            <SuccessMessage
                successMessage={
                    deleteBoardSuccess ? "Successfully deleted a board." : false
                }
                autoHideDuration={3000}
            />
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
