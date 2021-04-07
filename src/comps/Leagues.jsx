import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchLeagues } from "./../redux/leagueSlice";
import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";
export const Leagues = () => {
	const dispatch = useDispatch();

	const leagues = useSelector(state => state.league.leagues);
	const leaguesStatus = useSelector(state => state.league.status);
	const error = useSelector(state => state.league.error);

	useEffect(() => {
		if (leaguesStatus === "idle") {
			dispatch(fetchLeagues());
		}
	}, [dispatch, leaguesStatus]);

	console.log(leagues);
	if (leaguesStatus === "loading") return <h1>...loading</h1>;
	return (
		<Container>
			{error && <h1>{error}</h1>}
			{leagues.map(league => (
				<Link to={`/teams?league=${league.league.id}`}>
					<div style={{ display: "flex" }}>
						<img src={league.league.logo} alt="" />
					</div>
				</Link>
			))}
		</Container>
	);
};
