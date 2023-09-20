import React from 'react';

interface IUserGroupIcon {
    tabActive: string;
    tabHovered: string;
}

const UserGroupIcon: React.FC<IUserGroupIcon> = ({tabActive, tabHovered}) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="line / users_group">
            <path
                id="Vector"
                d="M10.6663 14V12.6667C10.6663 11.9594 10.3854 11.2811 9.88529 10.781C9.3852 10.281 8.70692 10 7.99967 10H3.99967C3.29243 10 2.61415 10.281 2.11406 10.781C1.61396 11.2811 1.33301 11.9594 1.33301 12.6667V14M14.6663 14V12.6667C14.6659 12.0758 14.4692 11.5018 14.1073 11.0349C13.7453 10.5679 13.2384 10.2344 12.6663 10.0867M10.6663 2.08667C11.24 2.23353 11.7484 2.56713 12.1114 3.03487C12.4745 3.50261 12.6716 4.07789 12.6716 4.67C12.6716 5.26211 12.4745 5.83739 12.1114 6.30513C11.7484 6.77287 11.24 7.10647 10.6663 7.25333M8.66634 4.66667C8.66634 6.13943 7.47243 7.33333 5.99967 7.33333C4.52692 7.33333 3.33301 6.13943 3.33301 4.66667C3.33301 3.19391 4.52692 2 5.99967 2C7.47243 2 8.66634 3.19391 8.66634 4.66667Z"
                stroke={
                    tabActive === "3" || tabHovered === "3"
                        ? "var(--text-link, #1480e1)"
                        : "var(--text-primary, #1f2023)"
                }
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </g>
    </svg>
)

export default UserGroupIcon;