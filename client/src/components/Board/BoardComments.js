import { Typography, makeStyles, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RefreshIcon from "@material-ui/icons/Refresh";
import {
    createBoardCommentAction,
    fetchBoardCommentsAction,
} from "../../actions/commentActions";

const useStyles = makeStyles((theme) => ({
    comment: {
        border: "2px solid rgba(0,0,0,0.87)",
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(4),
        marginBottom: theme.spacing(1),
    },
    commentForm: {
        display: "flex",
    },
    commentInput: {
        flex: "1",
        padding: theme.spacing(1),
        fontSize: "larger",
    },
    commentButton: {
        padding: theme.spacing(1),
        fontSize: "larger",
    },
}));

function BoardComments({ boardId }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { comments } = useSelector((state) => state.fetchBoardComments);

    const [commentText, setCommentText] = useState("");

    const onComment = (e) => {
        e.preventDefault();
        dispatch(createBoardCommentAction(boardId, commentText));
        dispatch(fetchBoardCommentsAction(boardId));
    };

    const refreshComments = () => {
        dispatch(fetchBoardCommentsAction(boardId));
    };

    return (
        <div>
            <h1>Comments</h1>
            <div>
                {comments?.map((comment) => (
                    <div className={classes.comment} key={comment.id}>
                        <Typography>{comment.comment}</Typography>
                        <Typography color="textSecondary">
                            {comment.ownerRef.username}
                        </Typography>
                    </div>
                ))}
                <form onSubmit={onComment} className={classes.commentForm}>
                    <IconButton onClick={(e) => refreshComments()}>
                        <RefreshIcon />
                    </IconButton>
                    <input
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className={classes.commentInput}
                    />
                    <button type="submit" className={classes.commentButton}>
                        Comment
                    </button>
                </form>
            </div>
        </div>
    );
}

export default BoardComments;
