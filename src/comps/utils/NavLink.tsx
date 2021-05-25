import { Link } from "react-router-dom";

interface Props {
	to: string;
	children: React.ReactNode;
}

export const NavLink: React.FC<Props> = ({ to, children }): JSX.Element => {
	return (
		<div>
			<Link to={to}>{children}</Link>
		</div>
	);
};
