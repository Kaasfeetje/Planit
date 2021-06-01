import { Container, Grid } from "@material-ui/core";
import React from "react";
import BoardCard from "../Board/BoardCard";
import Header from "../Header";

function HomePage() {
    return (
        <div>
            <Header />
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                        <BoardCard
                            board={{
                                id: "1",
                                name: "Project 1",
                                description:
                                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.",
                                image: "https://via.placeholder.com/255x140",
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                        <BoardCard
                            board={{
                                id: "2",
                                name: "Project 2",
                                description:
                                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.",
                                image: "https://via.placeholder.com/255x140",
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                        <BoardCard
                            board={{
                                id: "3",
                                name: "Project 3",
                                description:
                                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.",
                                image: "https://via.placeholder.com/255x140",
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                        <BoardCard
                            board={{
                                id: "4",
                                name: "Project 4",
                                description:
                                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.",
                                image: "https://via.placeholder.com/255x140",
                            }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default HomePage;
