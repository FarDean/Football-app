import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import { Fixture } from "./comps/Fixture";
import { Footer } from "./comps/Footer";
import { League } from "./comps/League";
import { LiveScores } from "./comps/LiveScores";
import { TeamDetail } from "./comps/TeamDetail";
import { Error } from "./comps/utils/Error";
import { Loader } from "./comps/utils/Loader";
import { ScrollToTop } from "./comps/utils/ScrollToTop";
import { Wrapper } from "./comps/Wrapper";
import { useAppSelector } from "./redux/hooks";
export const MainRouter = () => {
	const leaguesStatus = useAppSelector(state => state.league.status);
	const leagues = useAppSelector(state => state.league.leagues);
	console.log(leagues.some(elem => elem === null));
	console.log(leagues);

	if (leaguesStatus === "loading" || leagues.some(elem => elem === null)) return <Loader />;
	if (leaguesStatus === "failed" || leagues[0] === undefined) return <Error />;

	return (
		<Router>
			<ScrollToTop />
			<Wrapper />
			<Switch>
				<Route exact path="/">
					<App />
				</Route>
				<Route path="/livescores">
					<LiveScores />
				</Route>
				<Route path="/leagues/:leagueName">
					<League />
				</Route>
				<Route path="/fixture/:fixtureId">
					<Fixture />
				</Route>
				<Route path="/:leagueName/teams/:teamId">
					<TeamDetail />
				</Route>
			</Switch>
			<Footer />
		</Router>
	);
};
