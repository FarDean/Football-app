import { useHistory } from "react-router-dom";
import styles from "./../../styles/utils/Back.module.css";

export const Back: React.FC = (): JSX.Element => {
	let history = useHistory();

	return (
		<div className={styles.back}>
			<div onClick={() => history.goBack()} className={styles.mark}>
				<i className="fas fa-arrow-left"></i>
			</div>
		</div>
	);
};
