import { Container } from "@material-ui/core";
import React from "react";
import Header from "../common/Header";
import Profile from "../Profile/Profile";

function ProfilePage() {
    return (
        <div>
            <Header />
            <Container>
                <Profile />
            </Container>
        </div>
    );
}

export default ProfilePage;
