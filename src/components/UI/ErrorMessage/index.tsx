import React from "react";
import { IErrorMessage } from "constants/interfaces";
import styles from './ErrorMessage.module.scss';

const ErrorMessage: React.FC<IErrorMessage> = ({ msg }) => <span className={`caption_2 ${styles.errorMessage}`}>{msg}</span>;

export default ErrorMessage;
