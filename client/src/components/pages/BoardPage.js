import { Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Board from "../Board/Board";
import Header from "../common/Header";

function BoardPage({ match }) {
    const [board, setBoard] = useState({});

    useEffect(() => {
        setBoard({
            id: match.params.boardId,
            name: `Project ${match.params.boardId}`,
            description: "Project description",
            image: "https://via.placeholder.com/255x140",
        });
    }, [match]);

    if (!board) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <Container>
                <Board board={board} />
            </Container>
        </div>
    );
}

export default BoardPage;
