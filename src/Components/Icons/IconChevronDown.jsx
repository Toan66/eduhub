// icon:chevron-down | Bootstrap https://icons.getbootstrap.com/ | Bootstrap
import * as React from "react";

function IconChevronDown(props) {
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            height="20px"
            width="20px"
            {...props}
        >
            <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z"
            />
        </svg>
    );
}

export default IconChevronDown;
