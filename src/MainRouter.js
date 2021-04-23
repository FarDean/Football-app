import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import { League } from "./comps/League";
import { LeagueDetailWrapper } from "./comps/LeagueDetailWrapper";
import { Leagues } from "./comps/Leagues";
import { Wrapper } from "./comps/Wrapper";

export const MainRouter = () => {
	return (
		<Router>
			<Wrapper />
			<Switch>
				<Route path="/">
					<App />
				</Route>
				<Route path="/leagues">
					<League />
				</Route>
			</Switch>
		</Router>
	);
};
