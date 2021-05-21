import styles from "./../../styles/utils/Error.module.css";
export const Error = ({ text = "Something went Wrong, Try Refreshing!" }) => {
	return (
		<div className={styles.error}>
			<div>{text}</div>
		</div>
	);
};
