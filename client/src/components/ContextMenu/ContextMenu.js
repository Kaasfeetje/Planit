import { makeStyles } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const useStyles = makeStyles((theme) => ({
    contextMenu: {
        display: "none",
        position: "absolute",
        zIndex: 10,
        width: "240px",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: "0.5rem",
        boxShadow: theme.shadows[5],
    },
    show: {
        display: "block",
    },
}));

function ContextMenu({
    children,
    clickableClassname,
    customFunction,
    setOpened,
    opened,
}) {
    const classes = useStyles();
    const ref = useRef();

    const clickInsideElement = (e) => {
        let el = e.srcElement || e.target;
        if (el.classList.contains(clickableClassname)) {
            return el;
        } else {
            while ((el = el.parentNode)) {
                if (el.classList && el.classList.contains(clickableClassname)) {
                    return el;
                }
            }
        }
        return false;
    };

    const moveMenu = (e) => {
        let posX, posY;
        if (e.pageX || e.pageY) {
            posX = e.pageX;
            posY = e.pageY;
        } else if (e.clientX || e.clientY) {
            posX =
                e.clientX +
                document.body.scrollLeft +
                document.documentElement.scrollLeft;
            posY =
                e.clientY +
                document.body.scrollTop +
                document.documentElement.scrollTop;
        }

        const menuWidth = ref.current.offsetWidth + 4;
        const menuHeight = ref.current.offsetHeight + 4;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        if (windowWidth - posX < menuWidth) {
            ref.current.style.left = windowWidth - menuWidth + "px";
        } else {
            ref.current.style.left = posX + "px";
        }

        if (windowHeight - posY < menuHeight) {
            ref.current.style.top = windowHeight - menuHeight + "px";
        } else {
            ref.current.style.top = posY + "px";
        }
    };

    useEffect(() => {
        document.addEventListener("contextmenu", (e) => {
            const clickedOnCustomMenu = clickInsideElement(e);
            if (clickedOnCustomMenu) {
                e.preventDefault();
                if (customFunction) customFunction(clickedOnCustomMenu);
                setOpened(true);
                moveMenu(e);
            } else {
                setOpened(false);
            }
        });

        document.addEventListener("click", (e) => {
            setOpened(false);
        });

        document.addEventListener("wheel", () => {
            if (!opened) setOpened(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return ReactDOM.createPortal(
        <div
            onClick={(e) => e.stopPropagation()}
            ref={ref}
            className={`${classes.contextMenu} ${opened ? classes.show : ""}`}
        >
            {children}
        </div>,
        document.querySelector("#context-menu")
    );
}

export default ContextMenu;
