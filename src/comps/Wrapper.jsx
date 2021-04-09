import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Container } from "semantic-ui-react";

export const Wrapper = ({ children }) => {
	const [activeItem, setActiveItem] = useState("home");

	return (
		<Container>
			<Menu pointing secondary>
				<Link to="/">
					<Menu.Item
						name="home"
						active={activeItem === "home"}
						onClick={() => setActiveItem("home")}
					/>
				</Link>
				<Link to="/leagues">
					<Menu.Item
						name="Leagues"
						active={activeItem === "Leagues"}
						onClick={() => setActiveItem("Leagues")}
					/>
				</Link>

				<Menu.Menu position="right">
					<Menu.Item
						name="logout"
						active={activeItem === "logout"}
						onClick={() => setActiveItem("")}
					/>
				</Menu.Menu>
			</Menu>
			{children}
		</Container>
	);
};
