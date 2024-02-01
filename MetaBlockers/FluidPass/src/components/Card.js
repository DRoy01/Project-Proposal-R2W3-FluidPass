import { Link } from "react-router-dom";
const Card = (props) => {
	const {
		imageUrl,
		companyName,
		country,
		date,
		description,
		location,
		name,
		price,
	} = props.propsEventData.eventInfo;

	return (
		<Link to="/register">
			<section className="card">
				<img
					className="cardImg"
					src={imageUrl}
					alt="Image Event Page"
				/>
				<h3>
					{name} by {companyName}
				</h3>
				<section className="cardFeaturedSection">
					<p>{date} </p>
					<p>{price} </p>
					<p>{country} </p>
				</section>
				<p>{description}</p>
				<p>{location}</p>
				<Link
					to="/register"
					className="homeButton">
					<button className="custom-btn btn-16">Book Your Passes</button>
				</Link>
			</section>
		</Link>
	);
};

export default Card;
