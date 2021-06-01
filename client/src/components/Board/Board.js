import { Button, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import Set from "../Set/Set";
import BoardModal from "./BoardModal";

const useStyles = makeStyles((theme) => ({
    set: {
        minWidth: "20%",
        margin: "0.5rem",
        overflow: "hidden",
        overflowY: "scroll",
        backgroundColor: "#fff",
        color: "rgba(0,0,0,0.87)",
        border: "1px solid gray",
        borderRadius: "0.25rem",
    },
    setContainer: {
        width: "100%",
        height: "calc(100vh - 100px)",
        display: "flex",
        overflowX: "scroll",
        borderRadius: "0.5rem",
    },
    addSet: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        margin: "0.5rem 0",
    },
    setAddBtn: {
        display: "flex",
        justifyContent: "center",
    },
    setAddInput: {
        width: "100%",
        fontSize: "larger",
        padding: "0.25rem 0",
        textAlign: "center",
    },
    addSetButton: {
        overflow: "hidden",
    },
}));

function Board({ board }) {
    const classes = useStyles();

    const [sets, setSets] = useState([
        { id: 0, name: "set0", index: 0 },
        { id: 1, name: "set1", index: 1 },
        { id: 2, name: "set2", index: 2 },
        { id: 3, name: "set3", index: 3 },
        { id: 4, name: "set4", index: 4 },
        { id: 5, name: "set5", index: 5 },
        { id: 6, name: "set6", index: 6 },
        { id: 7, name: "set7", index: 7 },
        { id: 8, name: "set8", index: 8 },
    ]);
    const [dragging, setDragging] = useState(undefined);
    const [addingSet, setAddingSet] = useState(false);
    const [newSet, setNewSet] = useState("");

    const [boardModalOpen, setBoardModalOpen] = useState(false);

    const ref = useRef();

    useEffect(() => {
        const onScroll = (e) => {
            const d = Math.abs(e.wheelDelta) / 2;
            if (document.body.doScroll)
                document.body.doScroll(e.wheelDelta > 0 ? "left" : "right");
            else if ((e.wheelDelta || e.detail) > 0)
                ref.current.scrollLeft -= d;
            else ref.current.scrollLeft += d;
            return false;
        };

        document.body.addEventListener("wheel", onScroll);
        return () => document.body.removeEventListener("wheel", onScroll);
    }, [ref]);

    const dropHandler = (set) => {
        if (!dragging) return;
        const dragIndex = dragging.index;
        const targetIndex = set.index;

        const newSets = sets
            .map((s) => {
                if (s.id === set.id) {
                    s.index = dragIndex;
                } else if (s.id === dragging.id) {
                    s.index = targetIndex;
                }
                return s;
            })
            .sort((a, b) => a.index - b.index);

        setSets(newSets.sort((s) => s.index));
    };

    const onAddSet = (e) => {
        e.preventDefault();
        //TODO: add task database

        if (newSet !== "") {
            setSets([
                ...sets,
                {
                    name: newSet,
                    index: sets.length + 1,
                    id: sets.length + 1,
                },
            ]);
        }
        setAddingSet(false);
        setNewSet("");
    };

    return (
        <>
            <BoardModal
                open={boardModalOpen}
                onClose={() => setBoardModalOpen(false)}
            />
            <Typography
                variant="h6"
                color="textPrimary"
                component="p"
                className="clickable"
                onClick={(e) => setBoardModalOpen(true)}
            >
                {board.name}
            </Typography>
            <Paper
                elevation={3}
                variant="outlined"
                square
                ref={ref}
                className={classes.setContainer}
            >
                {sets.map((set) => (
                    <Set
                        key={set.id}
                        set={set}
                        onDragStart={() => setDragging(set)}
                        onDragEnd={() => setDragging(undefined)}
                        onDrop={() => dropHandler(set)}
                    />
                ))}
                <div className={classes.set}>
                    <div className={classes.addSet}>
                        {addingSet ? (
                            <form
                                onSubmit={onAddSet}
                                onBlur={(e) => {
                                    if (
                                        e.relatedTarget &&
                                        e.relatedTarget.type === "submit"
                                    )
                                        return;
                                    setNewSet("");
                                    setAddingSet(false);
                                }}
                            >
                                <input
                                    value={newSet}
                                    onChange={(e) => setNewSet(e.target.value)}
                                    className={classes.setAddInput}
                                ></input>
                                <div className={classes.setAddBtn}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Add set
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                className={classes.addSetButton}
                                onClick={(e) => setAddingSet(true)}
                            >
                                New Set...
                            </Button>
                        )}
                    </div>
                </div>
            </Paper>
        </>
    );
}

export default Board;
