import { fetchStats } from "./../redux/statsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useQuery } from "./../hooks/useQuery";

export const Stats = () => {
	const leagueId = useQuery().get("league");
	const teamId = useQuery().get("team").toString();

	const dispatch = useDispatch();

	const stats = useSelector(state => state.stat.stats);
	const error = useSelector(state => state.stat.error);
	const statsStatus = useSelector(state => state.stat.status);

	useEffect(() => {
		if (statsStatus === "idle") {
			dispatch(fetchStats({ leagueId, teamId }));
		}
	}, [statsStatus, dispatch, leagueId, teamId]);

	console.log(stats);
	if (statsStatus === "loading") return <h1>...loading</h1>;
	if (statsStatus === "succeeded")
		return (
			<>
				{error && <h1>{error}</h1>}
				<h1>stats</h1>
				<ul>
					<li>
						biggest Defeat: <span>{stats.biggest.loses.away}</span>
					</li>
					<li>
						cards : <span>{stats.cards.red["76-90"].total}</span>
					</li>
				</ul>
			</>
		);
	return null;
};
