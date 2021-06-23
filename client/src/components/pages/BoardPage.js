import { CircularProgress, Container } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Board from "../Board/Board";
import Header from "../common/Header";
import {
    fetchFullBoardAction,
    getBoardUsersAction,
} from "../../actions/boardActions";
import { FETCH_FULL_BOARD_RESET } from "../../actions/types";
import BoardJoinModal from "../Board/BoardJoinModal";
import { history } from "../../history";

function BoardPage({ match }) {
    const dispatch = useDispatch();

    const fetchFullBoard = useSelector((state) => state.fetchFullBoard);
    const { loading, board } = fetchFullBoard;

    useEffect(() => {
        dispatch(fetchFullBoardAction(match.params.boardId));
        dispatch(getBoardUsersAction(match.params.boardId));

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
                {match.path.includes("/join") && (
                    <BoardJoinModal
                        board={board}
                        open={true}
                        onClose={() => history.push("/")}
                    />
                )}
            </Container>
        </div>
    );
}

export default BoardPage;
