import { Switch, Route, Redirect } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { Statnding } from "./Standing";

export const LeagueDetailRouter = () => {
	let { path } = useRouteMatch();
	return (
		<>
			<Switch>
				<Route path="/leagues/standing">
					<Statnding />
				</Route>
			</Switch>
			<Redirect from="/leagues" to="/leagues/standing" exact />
		</>
	);
};
