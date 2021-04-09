import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import { Leagues } from "./comps/Leagues";
import { Statnding } from "./comps/Standing";
import { Stats } from "./comps/Stats";
import { Teams } from "./comps/Teams";
import { Wrapper } from "./comps/Wrapper";

export const MainRouter = () => {
	return (
		<Router>
			<Wrapper>
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
					<Route exact path="/stats">
						<Stats />
					</Route>
					<Route exact path="/standing">
						<Statnding />
					</Route>
				</Switch>
			</Wrapper>
		</Router>
	);
};
