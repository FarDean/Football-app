import "./App.css";
import { useState, useEffect } from "react";
import { config } from "./config";

function App() {
	const [shit, setShit] = useState(null);

	useEffect(() => {
		async function getShit() {
			const res = await fetch("https://v3.football.api-sports.io/status", {
				headers: {
					"x-rapidapi-host": config.host,
					"x-rapidapi-key": config.key,
				},
			});
			const data = await res.json();
			setShit(data);
		}
		getShit();
	}, []);

	console.log(shit);

	return <div>hi</div>;
}

export default App;
