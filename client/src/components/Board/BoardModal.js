import {
    Backdrop,
    Fade,
    makeStyles,
    Modal,
    Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import UserCard from "../common/UserCard";

const useStyles = makeStyles((theme) => ({
    description: {
        marginTop: "1rem",
        marginBottom: "0.5rem",
    },
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
}));

function BoardModal({ open, onClose }) {
    const classes = useStyles();
    const [boardDetails] = useState({
        name: "Project 1",
        description: "This is project 1 its a project about testing this app.",
        goal: "The goal of this project is to finish it.",
        owner: {
            username: "Kaasfeetje",
            email: "kaasfeetje@example.com",
            profilePicture: "https://via.placeholder.com/255x255",
        },
        access: [
            {
                id: 0,
                username: "Kaasfeetje",
                email: "kaasfeetje@example.com",
                profilePicture: "https://via.placeholder.com/255x255",
            },
            {
                id: 1,
                username: "John",
                email: "John@example.com",
                profilePicture: "https://via.placeholder.com/255x255",
            },
            {
                id: 2,
                username: "Jane",
                email: "Jane@example.com",
                profilePicture: "https://via.placeholder.com/255x255",
            },
        ],
    });

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
                    <Typography variant="h5" color="textPrimary">
                        {boardDetails.name}
                    </Typography>
                    <div className={classes.description}>
                        <Typography variant="body2" color="textSecondary">
                            Description:
                        </Typography>
                        <Typography variant="body1" color="textPrimary">
                            {boardDetails.description}
                        </Typography>
                    </div>
                    <div className={classes.description}>
                        <Typography variant="body2" color="textSecondary">
                            Goal:
                        </Typography>
                        <Typography variant="body1" color="textPrimary">
                            {boardDetails.goal}
                        </Typography>
                    </div>
                    <div className={classes.description}>
                        <Typography variant="body2" color="textSecondary">
                            Owner:
                        </Typography>
                        <UserCard user={boardDetails.owner} />
                    </div>
                    <div className={classes.description}>
                        <Typography variant="body2" color="textSecondary">
                            Access:
                        </Typography>
                        {boardDetails.access.map((user) => (
                            <UserCard key={user.id} user={user} />
                        ))}
                    </div>
                </div>
            </Fade>
        </Modal>
    );
}

export default BoardModal;
