import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import { League } from "./comps/League";
import { Wrapper } from "./comps/Wrapper";

export const MainRouter = () => {
	return (
		<Router>
			<Wrapper />
			<Switch>
				<Route exact path="/">
					<App />
				</Route>
				<Route path="/leagues/:leagueName">
					<League />
				</Route>
			</Switch>
		</Router>
	);
};
