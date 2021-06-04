import { CircularProgress, Container } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Board from "../Board/Board";
import Header from "../common/Header";
import { fetchFullBoardAction } from "../../actions/boardActions";
import { FETCH_FULL_BOARD_RESET } from "../../actions/types";

function BoardPage({ match }) {
    const dispatch = useDispatch();

    const fetchFullBoard = useSelector((state) => state.fetchFullBoard);
    const { loading, board } = fetchFullBoard;

    useEffect(() => {
        dispatch(fetchFullBoardAction(match.params.boardId));

        return () => {
            dispatch({ type: FETCH_FULL_BOARD_RESET });
        };
    }, [dispatch, match.params]);

    return (
        <div>
            <Header />
            <Container>
                {loading && <CircularProgress />}
                {board && <Board board={board} match={match} />}
            </Container>
        </div>
    );
}

export default BoardPage;
