import { Link } from "react-router-dom";
const BookCustomCard = (props) => {
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
				to="/booktickets"
				className="homeButton">
				<button className="custom-btn btn-16">(Sold out)</button>
			</Link>
		</section>
	);
};

export default BookCustomCard;
