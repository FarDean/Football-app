import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import { Leagues } from "./comps/Leagues";
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
				</Switch>
			</Wrapper>
		</Router>
	);
};
