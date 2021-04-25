import { useSelector, useDispatch } from "react-redux";
import { fetchStanding } from "./../redux/standingSlice";
import { useEffect } from "react";
import { Loader } from "./utils/Loader";
import { Error } from "./utils/Error";

export const Statnding = ({ leagueId }) => {
	const dispatch = useDispatch();
	// selectors
	const standing = useSelector(state => state.standing.standing);
	const standingStatus = useSelector(state => state.standing.status);
	const error = useSelector(state => state.standing.error);

	useEffect(() => {
		dispatch(fetchStanding(leagueId));
	}, [dispatch, leagueId]);

	console.log(standing);
	if (standingStatus === "loading") return <Loader />;
	if (standingStatus === "succeeded")
		return (
			<>
				{standing[0].league.standings[0].map(team => (
					<div>
						{team.rank} {team.team.name}
					</div>
				))}
			</>
		);

	return <Error text={error} />;
};
