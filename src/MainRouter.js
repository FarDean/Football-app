import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import { Leagues } from "./comps/Leagues";
import { Teams } from "./comps/Teams";

export const MainRouter = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<App />
				</Route>
				<Route exact path="/leagues">
					<Leagues />
				</Route>
				<Route exact path="/teams">
					<Teams />
				</Route>
			</Switch>
		</Router>
	);
};
