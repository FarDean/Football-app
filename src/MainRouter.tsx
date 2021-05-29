import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import { Fixture } from "./comps/Fixture";
import { League } from "./comps/League";
import { LiveScores } from "./comps/LiveScores";
import { Loader } from "./comps/utils/Loader";
import { ScrollToTop } from "./comps/utils/ScrollToTop";
import { Wrapper } from "./comps/Wrapper";
import { useAppSelector } from "./redux/hooks";
export const MainRouter = () => {
	const leaguesStatus = useAppSelector(state => state.league.status);

	if (leaguesStatus === "loading") return <Loader />;

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
			</Switch>
		</Router>
	);
};
