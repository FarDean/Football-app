import styles from "./styles/App.module.css";
import ballImg from "./assets/ball.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

function App() {
	const [state, setState] = useState<any>(null);
	useEffect(() => {
		async function getState() {
			let res = await fetch("https://v3.football.api-sports.io/leagues?country=world", {
				method: "GET",
				headers: {
					"x-rapidapi-host": process.env.REACT_APP_HOST!,
					"x-rapidapi-key": process.env.REACT_APP_KEY!,
				},
			});

			setState(await res.json());
		}
		getState();
	}, []);

	console.log(
		state?.response.sort((a: any, b: any) => {
			return a.league.id - b.league.id;
		})
	);

	return (
		<div>
			<div className={styles.hero}>
				<div className={styles.title}>
					<div>
						<div className={styles.ballImg}>
							<img loading="lazy" src={ballImg} alt="Ball" />
						</div>
						<h1>Football App made By</h1>
					</div>
					<h2>FarDean</h2>
					<h3>
						Football LiveScores, Standings, Fixtures,Team {"&"} Player Statistics,...
					</h3>
				</div>
			</div>
			{/* <div className={styles.scroll}>
				<FontAwesomeIcon icon={faAngleDoubleDown} />
			</div> */}
		</div>
	);
}

export default App;
