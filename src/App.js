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

	return <LiveScores />;
}

export default App;
