import React, { useEffect, useState } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

function ErrorMessage({ errorMessage, autoHideDuration }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (errorMessage) setOpen(true);
        else setOpen(false);
    }, [errorMessage]);

    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={() => setOpen(false)}
        >
            <Alert severity="error" onClose={() => setOpen(false)}>
                {open && errorMessage}
            </Alert>
        </Snackbar>
    );
}

export default ErrorMessage;
