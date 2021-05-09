import styles from "./../../styles/Utils.module.css";
export const Error = ({ text = "Something went Wrong, Try Refreshing!" }) => {
	return (
		<div className={styles.error}>
			<div>{text}</div>
		</div>
	);
};
