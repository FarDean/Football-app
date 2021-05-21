import styles from "./../../styles/utils/Loader.module.css";

export const Loader = () => {
	return (
		<div className={styles.container}>
			<div className={styles.box}>
				<div className={styles.shadow}></div>
				<div className={styles.gravity}>
					<div className={styles.ball}></div>
				</div>
			</div>
		</div>
	);
};
