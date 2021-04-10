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
			<Route exact path="/teams">
				<Teams />
			</Route>
			<Route exact path="/stats">
				<Stats />
			</Route>
			<Route exact path="/standing">
				<Statnding />
			</Route>
			<Route exact path="/">
				<Wrapper>
					<Switch>
						<Route exact path="/">
							<App />
						</Route>
						<Route path="/leagues">
							<Leagues />
						</Route>
					</Switch>
				</Wrapper>
			</Route>
		</Router>
	);
};
