import { Link } from "react-router-dom";

export const Wrapper = ({ children }) => {
	return (
		<>
			<Link to="/">Live Scores</Link>
			<Link to="leagues">Leagues</Link>
			<hr />
			{children}
		</>
	);
};
