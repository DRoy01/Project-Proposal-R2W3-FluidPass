import { Link } from "react-router-dom";

const NavBar = () => {
	return (
		<nav className="navBar">
			<ul className="navBarList">
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/events">Events</Link>
				</li>
				<li>
					<Link to="/registerevent">Submit Event</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
