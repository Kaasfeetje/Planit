import { Container, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Board from "../Board/Board";
import Header from "../Header";

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
                <Typography variant="h6" color="textPrimary" component="p">
                    {board.name}
                </Typography>
                <Board />
            </Container>
        </div>
    );
}

export default BoardPage;
