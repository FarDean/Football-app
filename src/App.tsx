import styles from "./styles/App.module.css";
import ballImg from "./assets/ball.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";

function App() {
	return (
		<div>
			<div className={styles.hero}>
				<div className={styles.title}>
					<div>
						<img src={ballImg} alt="Ball" />
						<h1>Football App made By</h1>
					</div>
					<h2>FarDean</h2>
					<h3>
						Football LiveScores, Standings, Fixtures,Team {"&"} Player Statistics,...
					</h3>
				</div>
			</div>
			<div className={styles.scroll}>
				<FontAwesomeIcon icon={faAngleDoubleDown} />
			</div>
		</div>
	);
}

export default App;
