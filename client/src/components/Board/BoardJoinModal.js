import {
    Backdrop,
    Fade,
    makeStyles,
    Modal,
    Typography,
} from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { joinBoardAction } from "../../actions/boardActions";
import BoardCard from "./BoardCard";

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

function BoardJoinModal({ open, onClose, board }) {
    const classes = useStyles();

    const dispatch = useDispatch();

    const joinHandler = () => {
        dispatch(joinBoardAction(board.id));
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
                    <BoardCard board={board} join clickFunction={joinHandler} />
                </div>
            </Fade>
        </Modal>
    );
}

export default BoardJoinModal;
