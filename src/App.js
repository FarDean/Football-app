import { useEffect, useState } from "react";
import { config } from "./config";
import { Link } from "react-router-dom";

function App() {
	const [teams, setTeams] = useState([]);
	useEffect(() => {
		async function getTeams() {
			const res = await fetch(
				"https://v3.football.api-sports.io/teams/statistics?league=39&team=33&season=2020",
				{
					method: "GET",
					headers: {
						"x-rapidapi-host": config.host,
						"x-rapidapi-key": config.key,
					},
				}
			);
			const data = await res.json();
			setTeams(data.response);
		}
		getTeams();
	}, []);

	console.log(teams);
	return (
		<>
			<Link to="/leagues">leagues</Link>
		</>
	);
}

export default App;
