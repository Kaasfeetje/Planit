import {
    Backdrop,
    Fade,
    makeStyles,
    Modal,
    Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { joinBoardAction } from "../../actions/boardActions";
import BoardCard from "./BoardCard";
import { history } from "../../history";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    modalPaper: {
        backgroundColor: "#fff",
        border: "2px solid #000",
        padding: "2rem",
        width: "50vw",
    },
    centerText: {
        textAlign: "center",
    },
}));

function BoardJoinModal({ open, onClose }) {
    const classes = useStyles();

    const dispatch = useDispatch();

    const joinBoardInfo = useSelector((state) => state.joinBoardInfo);
    const { boardInfo } = joinBoardInfo;

    const joinBoard = useSelector((state) => state.joinBoard);
    const { success } = joinBoard;

    useEffect(() => {
        if (success) history.push("/");
    }, [success]);

    const joinHandler = () => {
        dispatch(joinBoardAction(boardInfo.id));
    };

    return (
        <Modal
            className={classes.modal}
            open={open}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
        >
            <Fade in={open}>
                <div className={classes.modalPaper}>
                    <Typography className={classes.centerText} variant="h4">
                        Join Room
                    </Typography>
                    <BoardCard
                        board={boardInfo}
                        join
                        clickFunction={joinHandler}
                    />
                </div>
            </Fade>
        </Modal>
    );
}

export default BoardJoinModal;
