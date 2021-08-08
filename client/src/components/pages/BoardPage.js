import { CircularProgress, Container } from "@material-ui/core";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Board from "../Board/Board";
import Header from "../common/Header";
import {
    fetchFullBoardAction,
    fetchJoinBoardAction,
    getBoardUsersAction,
} from "../../actions/boardActions";
import { FETCH_FULL_BOARD_RESET } from "../../actions/types";
import BoardJoinModal from "../Board/BoardJoinModal";
import { history } from "../../history";
import { getSetResponsibilitiesAction } from "../../actions/setActions";
import { setCanEditAction } from "../../actions/otherActions";
import BoardErrors from "../Board/BoardErrors";
import { fetchBoardCommentsAction } from "../../actions/commentActions";

function BoardPage({ match }) {
    const dispatch = useDispatch();

    const fetchFullBoard = useSelector((state) => state.fetchFullBoard);
    const { loading, board } = fetchFullBoard;

    const getBoardUsers = useSelector((state) => state.getBoardUsers);
    const { boardAccesses } = getBoardUsers;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!boardAccesses || !userInfo)
            return dispatch(setCanEditAction(false));
        const newCanEdit =
            boardAccesses.filter(
                (access) =>
                    access.userRef.id === userInfo.id &&
                    (access.access === "edit" ||
                        access.access === "owner" ||
                        access.userRef.isAdmin)
            ).length !== 0;

        dispatch(setCanEditAction(newCanEdit));
    }, [userInfo, boardAccesses, dispatch]);

    useEffect(() => {
        if (match.path.includes("/join")) {
            dispatch(fetchJoinBoardAction(match.params.boardId));
        } else {
            dispatch(fetchFullBoardAction(match.params.boardId));
            dispatch(getBoardUsersAction(match.params.boardId));
            dispatch(getSetResponsibilitiesAction(match.params.boardId));
            dispatch(fetchBoardCommentsAction(match.params.boardId));
        }

        return () => {
            dispatch({ type: FETCH_FULL_BOARD_RESET });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.params, match.path]);
    return (
        <div>
            <BoardErrors />
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
