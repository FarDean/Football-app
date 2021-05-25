import styles from "./../../styles/utils/Error.module.css";

interface Props {
	text?: string | null | undefined;
}

export const Error: React.FC<Props> = ({ text = "Something went Wrong, Try Refreshing!" }) => {
	return (
		<div className={styles.error}>
			<div>{text}</div>
		</div>
	);
};
