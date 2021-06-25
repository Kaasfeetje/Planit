import { useEffect, useRef } from "react";
export function useOutsideAlerter(ref, onClose) {
    useEffect(() => {
        // Bind the event listener
        function handleClickOutside(event) {
            if (ref.current && !ref.current.firstChild.contains(event.target))
                return onClose(event);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, onClose]);
}

export default function OutsideAlerter(props) {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, props.onClose);

    return <div ref={wrapperRef}>{props.children}</div>;
}

//@credits: https://stackoverflow.com/a/42234988
