import BookCustomContainer from "./BookCustomContainer";
import CardHeadline from "./CardHeadline";

const BookCustomEvents = () => {
	return (
		<section className="cardPage">
			<section className="cardHeadline">
				<h2 className="cardHeadlinHeading">Checkout Our Live Events</h2>
				<p className="cardHeadlinDescription">
					What are you waiting for? Discover Lifechanging Events...
				</p>
			</section>
			<section className="youtubeVideoContainer">
				<iframe
					width="853"
					height="480"
					src="https://www.youtube.com/embed/pQ56Jg8GL7A"
					title="Create your own Token on Polygon Chain: full walkthrough"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen></iframe>
			</section>
			<BookCustomContainer />
		</section>
	);
};

export default BookCustomEvents;
