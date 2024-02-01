import { Link } from "react-router-dom";

const Home = () => {
	return (
		<section className="homePage">
			<h1 className="companyName">Fluid Pass</h1>
			<Link
				to="/events"
				className="homeButton">
				<button className="custom-btn btn-16 homeButton">
					Explore Compensations
				</button>
			</Link>
		</section>
	);
};

export default Home;
