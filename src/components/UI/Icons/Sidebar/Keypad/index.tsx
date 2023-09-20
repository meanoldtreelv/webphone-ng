import React from 'react';

interface IKeypadIcon {
    tabActive: string;
    tabHovered: string;
}

const KeypadIcon: React.FC<IKeypadIcon> = ({tabActive, tabHovered}) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g id="line / key_pad" clipPath="url(#clip0_2158_3100)">
										<g id="Vector">
											<path
												d="M4.00033 2.66667C4.00033 3.03486 3.70185 3.33333 3.33366 3.33333C2.96547 3.33333 2.66699 3.03486 2.66699 2.66667C2.66699 2.29848 2.96547 2 3.33366 2C3.70185 2 4.00033 2.29848 4.00033 2.66667Z"
												stroke={
													tabActive === "1" || tabHovered === "1"
														? "var(--text-link, #1480e1)"
														: "var(--text-primary, #1f2023)"
												}
												strokeWidth="1.5"
											/>
											<path
												d="M4.00033 6.66667C4.00033 7.03486 3.70185 7.33333 3.33366 7.33333C2.96547 7.33333 2.66699 7.03486 2.66699 6.66667C2.66699 6.29848 2.96547 6 3.33366 6C3.70185 6 4.00033 6.29848 4.00033 6.66667Z"
												stroke={
													tabActive === "1" || tabHovered === "1"
														? "var(--text-link, #1480e1)"
														: "var(--text-primary, #1f2023)"
												}
												strokeWidth="1.5"
											/>
											<path
												d="M4.00033 10.6667C4.00033 11.0349 3.70185 11.3333 3.33366 11.3333C2.96547 11.3333 2.66699 11.0349 2.66699 10.6667C2.66699 10.2985 2.96547 10 3.33366 10C3.70185 10 4.00033 10.2985 4.00033 10.6667Z"
												stroke={
													tabActive === "1" || tabHovered === "1"
														? "var(--text-link, #1480e1)"
														: "var(--text-primary, #1f2023)"
												}
												strokeWidth="1.5"
											/>
											<path
												d="M8.66699 2.66667C8.66699 3.03486 8.36852 3.33333 8.00033 3.33333C7.63214 3.33333 7.33366 3.03486 7.33366 2.66667C7.33366 2.29848 7.63214 2 8.00033 2C8.36852 2 8.66699 2.29848 8.66699 2.66667Z"
												stroke={
													tabActive === "1" || tabHovered === "1"
														? "var(--text-link, #1480e1)"
														: "var(--text-primary, #1f2023)"
												}
												strokeWidth="1.5"
											/>
											<path
												d="M8.66699 6.66667C8.66699 7.03486 8.36852 7.33333 8.00033 7.33333C7.63214 7.33333 7.33366 7.03486 7.33366 6.66667C7.33366 6.29848 7.63214 6 8.00033 6C8.36852 6 8.66699 6.29848 8.66699 6.66667Z"
												stroke={
													tabActive === "1" || tabHovered === "1"
														? "var(--text-link, #1480e1)"
														: "var(--text-primary, #1f2023)"
												}
												strokeWidth="1.5"
											/>
											<path
												d="M8.66699 10.6667C8.66699 11.0349 8.36852 11.3333 8.00033 11.3333C7.63214 11.3333 7.33366 11.0349 7.33366 10.6667C7.33366 10.2985 7.63214 10 8.00033 10C8.36852 10 8.66699 10.2985 8.66699 10.6667Z"
												stroke={
													tabActive === "1" || tabHovered === "1"
														? "var(--text-link, #1480e1)"
														: "var(--text-primary, #1f2023)"
												}
												strokeWidth="1.5"
											/>
											<path
												d="M8.66699 14.6667C8.66699 15.0349 8.36852 15.3333 8.00033 15.3333C7.63214 15.3333 7.33366 15.0349 7.33366 14.6667C7.33366 14.2985 7.63214 14 8.00033 14C8.36852 14 8.66699 14.2985 8.66699 14.6667Z"
												stroke={
													tabActive === "1" || tabHovered === "1"
														? "var(--text-link, #1480e1)"
														: "var(--text-primary, #1f2023)"
												}
												strokeWidth="1.5"
											/>
											<path
												d="M13.3337 2.66667C13.3337 3.03486 13.0352 3.33333 12.667 3.33333C12.2988 3.33333 12.0003 3.03486 12.0003 2.66667C12.0003 2.29848 12.2988 2 12.667 2C13.0352 2 13.3337 2.29848 13.3337 2.66667Z"
												stroke={
													tabActive === "1" || tabHovered === "1"
														? "var(--text-link, #1480e1)"
														: "var(--text-primary, #1f2023)"
												}
												strokeWidth="1.5"
											/>
											<path
												d="M13.3337 6.66667C13.3337 7.03486 13.0352 7.33333 12.667 7.33333C12.2988 7.33333 12.0003 7.03486 12.0003 6.66667C12.0003 6.29848 12.2988 6 12.667 6C13.0352 6 13.3337 6.29848 13.3337 6.66667Z"
												stroke={
													tabActive === "1" || tabHovered === "1"
														? "var(--text-link, #1480e1)"
														: "var(--text-primary, #1f2023)"
												}
												strokeWidth="1.5"
											/>
											<path
												d="M13.3337 10.6667C13.3337 11.0349 13.0352 11.3333 12.667 11.3333C12.2988 11.3333 12.0003 11.0349 12.0003 10.6667C12.0003 10.2985 12.2988 10 12.667 10C13.0352 10 13.3337 10.2985 13.3337 10.6667Z"
												stroke={
													tabActive === "1" || tabHovered === "1"
														? "var(--text-link, #1480e1)"
														: "var(--text-primary, #1f2023)"
												}
												strokeWidth="1.5"
											/>
										</g>
									</g>
									<defs>
										<clipPath id="clip0_2158_3100">
											<rect width="16" height="16" fill="white" />
										</clipPath>
									</defs>
								</svg>
)

export default KeypadIcon;