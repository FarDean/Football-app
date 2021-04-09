import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchLeagues } from "./../redux/leagueSlice";
import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { Image, Item } from "semantic-ui-react";

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
			{/* {leagues.map(league => (
				<Link to={`/teams?league=${league.league.id}`}>
					<div style={{ display: "flex" }}>
						<img src={league.league.logo} alt="" />
					</div>
				</Link>
			))} */}
			<Item.Group>
				{leagues.map(league => (
					<Item key={league.league.id}>
						<Item.Image size="tiny" src={league.league.logo} />

						<Item.Content>
							<Item.Header>
								<Link to={`/teams?league=${league.league.id}`}>
									{league.league.name}
								</Link>
							</Item.Header>
							<Item.Meta>
								<Image size="mini" src={league.country.flag} />
							</Item.Meta>
							<Item.Description>
								<div>Start: {league.seasons[0].start}</div>{" "}
								<span>End: {league.seasons[0].end}</span>
							</Item.Description>
						</Item.Content>
					</Item>
				))}
			</Item.Group>
		</Container>
	);
};
