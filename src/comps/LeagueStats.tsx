import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./../redux/hooks";
import { fetchLeagueStats } from "./../redux/leagueStatsSlice";

interface Props {
	leagueId: string | number;
}
export const LeagueStats: React.FC<Props> = ({ leagueId }): JSX.Element => {
	const dispatch = useAppDispatch();

	const leagueStats = useAppSelector(state => state.leagueStats.leagueStats);
	const leagueStatsStatus = useAppSelector(state => state.leagueStats.status);
	const error = useAppSelector(state => state.leagueStats.error);

	useEffect(() => {
		if (leagueStatsStatus === "idle") {
			dispatch(fetchLeagueStats(leagueId));
		}
	}, [dispatch, leagueStatsStatus, leagueId]);

	console.log(leagueStats);

	return <h1>League Stats</h1>;
};
