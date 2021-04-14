import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchLeagues } from "./../redux/leagueSlice";
import { useSelector, useDispatch } from "react-redux";
import styles from "./../styles/Wrapper.module.css";
import { Error } from "./utils/Error";
import { Loader } from "./utils/Loader";

export const Wrapper = ({ children }) => {
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

	if (leaguesStatus === "loading") return <Loader />;

	if (leaguesStatus === "failed") return <Error text={error} />;

	if (leaguesStatus === "succeeded")
		return (
			<>
				<Link to="/">Live Scores</Link>
				<Link to="leagues">Leagues</Link>
				<hr />
				{children}
			</>
		);

	return <Error />;
};
