import { Switch, Route } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { Statnding } from "./Standing";

export const LeagueDetailRouter = () => {
	let { path } = useRouteMatch();
	return (
		<Switch>
			<Route exact path={`${path}/standing`}>
				<Statnding />
			</Route>
		</Switch>
	);
};
