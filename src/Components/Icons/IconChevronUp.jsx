// icon:chevron-up | Bootstrap https://icons.getbootstrap.com/ | Bootstrap
import * as React from "react";

function IconChevronUp(props) {
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
                d="M7.646 4.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L8 5.707l-5.646 5.647a.5.5 0 01-.708-.708l6-6z"
            />
        </svg>
    );
}

export default IconChevronUp;
