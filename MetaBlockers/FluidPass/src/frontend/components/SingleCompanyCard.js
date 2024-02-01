import { Link } from "react-router-dom";
import { eventInfo } from "../utils/demoData";

const SingleCompanyCard = () => {
	const {
		imageUrl,
		companyName,
		country,
		date,
		description,
		location,
		name,
		price,
	} = eventInfo[0].eventInfo;

	return (
		<section className="singleCompanyCardContainer">
			<Link to="/booktickets">
				<section className="card singleCompanyCard">
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
						<button className="custom-btn btn-16">Book Your Passes</button>
					</Link>
				</section>
			</Link>
			<section className="card singleCompanyCard">
				<div>
					<section className="cardFeaturedSection">
						<p>{date} </p>
						<p>{price} </p>
						<p>{country} </p>
					</section>
					<h2>Register For the Event {name}</h2>
					<div>
						<form
							className="form"
							onSubmit={(e) => Submit(e)}>
							<input
								placeholder="Your Name"
								name="Name"
								type="text"
							/>
							<input
								placeholder="Your Email"
								name="Email"
								type="text"
							/>
							<input
								placeholder="+91 XXXXXXXXXX"
								name="Phone"
								type="text"
							/>
							<input
								placeholder="Need Help"
								name="Subject"
								type="text"
							/>
							<input
								placeholder="Your Message"
								name="Message"
								type="text"
							/>
							<input
								name="Name"
								type="submit"
							/>
						</form>
					</div>
				</div>
			</section>
		</section>
	);
};

export default SingleCompanyCard;
