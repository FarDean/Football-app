import { useEffect, useState } from "react";
import { config } from "./config";
import { Link } from "react-router-dom";
import { Menu, Segment, Container } from "semantic-ui-react";

import { LiveScores } from "./comps/LiveScores";
function App() {
	// const [teams, setTeams] = useState({});
	// useEffect(() => {
	// 	async function getTeams() {
	// 		const res = await fetch(
	// 			"https://v3.football.api-sports.io/fixtures?live=39-135-140-78",
	// 			{
	// 				method: "GET",
	// 				headers: {
	// 					"x-rapidapi-host": config.host,
	// 					"x-rapidapi-key": config.key,
	// 				},
	// 			}
	// 		);
	// 		const data = await res.json();
	// 		setTeams(data.response);
	// 	}
	// 	getTeams();
	// }, []);
	// console.log(teams);

	const [activeItem, setActiveItem] = useState("home");

	return (
		<Container>
			<Menu pointing secondary>
				<Link to="/">
					<Menu.Item
						name="home"
						active={activeItem === "home"}
						onClick={() => setActiveItem("home")}
					/>
				</Link>
				<Menu.Item
					name="Leagues"
					active={activeItem === "Leagues"}
					onClick={() => setActiveItem("Leagues")}
				/>

				<Menu.Menu position="right">
					<Menu.Item
						name="logout"
						active={activeItem === "logout"}
						onClick={() => setActiveItem("")}
					/>
				</Menu.Menu>
			</Menu>
			<LiveScores />
		</Container>
	);
}

export default App;
