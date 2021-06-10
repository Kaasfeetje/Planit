import { Container } from "@material-ui/core";
import React from "react";
import BoardCreate from "../Board/BoardCreate";
import Header from "../common/Header";

function CreatePage() {
    return (
        <div>
            <Header />
            <Container>
                <BoardCreate />
            </Container>
        </div>
    );
}

export default CreatePage;
