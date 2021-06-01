import { Button, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import "../../css/Set.css";
import Set from "../Set/Set";
function Board() {
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
        <Paper
            elevation={3}
            variant="outlined"
            square
            ref={ref}
            className="set-container"
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
            <div className="set">
                <div className="add-set">
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
                                className="set-add-input"
                            ></input>
                            <div className="set-add-btn">
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
                            className="add-set-button"
                            onClick={(e) => setAddingSet(true)}
                        >
                            New Set...
                        </Button>
                    )}
                </div>
            </div>
        </Paper>
    );
}

export default Board;
