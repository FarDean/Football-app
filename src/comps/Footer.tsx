import styles from "./../styles/Footer.module.css";

export const Footer: React.FC = (): JSX.Element => {
	return (
		<footer className={styles.footer} translate="no">
			Copyright @2021 | Designed by{" "}
			<span>
				<a href="https://github.com/FarDean" rel="noreferrer" target="_blank">
					FarDean
				</a>
			</span>
		</footer>
	);
};
