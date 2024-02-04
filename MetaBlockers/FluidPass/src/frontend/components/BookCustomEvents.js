import { useState } from "react";
import DeleteFlow from "../../DeleteFlow";
import BookCustomContainer from "./BookCustomContainer";
import CardHeadline from "./CardHeadline";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookCustomEvents = () => {
	const [isCanceled, setIsCanceled] = useState(false);

	const leaveEvent = async () => {
		const isStarted = await DeleteFlow();
		// const isStarted = true;
		if (isStarted) {
			setIsCanceled(true);
		  toast.success("You left the event, redirecting to homepage");
		} else {
			toast.error("Failed to leave the event")
			setIsCanceled(false);
		}
	  };

	return (
		<section className="cardPage">
			<ToastContainer />
			<section className="cardHeadline">
				<h2 className="cardHeadlinHeading">Checkout Our Live Events</h2>
				<p className="cardHeadlinDescription">
					What are you waiting for? Discover Lifechanging Events...
				</p>
			</section>
			{isCanceled ? null : <section className="youtubeVideoContainer">
				<iframe
					width="1024"
					height="480"
					src="https://www.youtube.com/embed/pQ56Jg8GL7A"
					title="Create your own Token on Polygon Chain: full walkthrough"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen></iframe>
			</section>}
			{isCanceled? <button>Return to Home</button> :<button type="button" onClick={leaveEvent}>Cancel Streaming</button> }
			
			<BookCustomContainer />
		</section>
	);
};

export default BookCustomEvents;
