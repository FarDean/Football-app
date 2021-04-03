import { useEffect, useState } from "react";
import { config } from "./config";

function App() {
	const [teams, setTeams] = useState(null);
	useEffect(() => {
		async function getTeams() {
			const res = await fetch("https://v3.football.api-sports.io/leagues?season=2020", {
				method: "GET",
				headers: {
					"x-rapidapi-host": config.host,
					"x-rapidapi-key": config.key,
				},
			});
			const data = await res.json();
			setTeams(data.response);
		}
		getTeams();
	}, []);

	console.log(teams.find(x => x.league.id === 135));
	return <h1>kos</h1>;
}

export default App;
