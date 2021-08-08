import React, { useEffect, useState } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

function SuccessMessage({ successMessage, autoHideDuration }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (successMessage) setOpen(true);
        else setOpen(false);
    }, [successMessage]);

    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={() => setOpen(false)}
        >
            <Alert severity="success" onClose={() => setOpen(false)}>
                {open && successMessage}
            </Alert>
        </Snackbar>
    );
}

export default SuccessMessage;
