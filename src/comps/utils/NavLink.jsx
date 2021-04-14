import { Link } from "react-router-dom";

export const NavLink = ({ to, children }) => {
	return (
		<div>
			<Link to={to}>{children}</Link>
		</div>
	);
};
