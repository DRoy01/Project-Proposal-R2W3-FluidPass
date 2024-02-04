import { useState } from "react";
import DeleteFlow from "../../DeleteFlow";
import BookCustomContainer from "./BookCustomContainer";
import CardHeadline from "./CardHeadline";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import homeButton from "../img/homeButton.png";
import cancelButton from "../img/cancelButton.png";
import dollarButton from "../img/dollarButton.png";



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
				<h2 className="cardHeadlinHeadingRed">Checkout Our Live Events</h2>
				<p className="cardHeadlinDescription">
					What are you waiting for? Discover Lifechanging Events...
				</p>
			</section>
			{isCanceled ? null : <section className="youtubeVideoContainer">
				<iframe width="980" height="430" src="https://www.youtube.com/embed/4KLNw7OUTSk?si=FilB5NnTMf-mqu5a" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
			</section>}
			{isCanceled? <button className="custom-btn btn-16 marginForEventPageButton buttonContainer">
				{/* <Link to="/events" className="homeButton"> */}
			<img className="joinEvent" src={homeButton}
				alt="Home" />
				<span>Return to Home</span>
				{/* </Link> */}
				</button>
				:
				<section className="buttonContainer">
				
				<button className="custom-btn btn-16 marginForEventPageButton buttonContainer" type="button">
				<img className="joinEvent" src={dollarButton} alt="Cancel" /> 
				<span> <a href="https://console.superfluid.finance/mumbai/supertokens/0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f?tab=streams" target="_blank">
					Live Money Stream
					</a>
					</span> 
				<img className="joinEvent" src={dollarButton} alt="Cancel" /> 
				</button>
				
				<button className="custom-btn btn-16 marginForEventPageButton buttonContainer" type="button" onClick={leaveEvent}>
				<img className="joinEvent" src={cancelButton} alt="Cancel" /> 
				<span>Cancel Streaming</span> 
				<img className="joinEvent" src={cancelButton} alt="Cancel" /> 
				</button>
				</section>
				}
			
			<BookCustomContainer />
		</section>
	);
};

export default BookCustomEvents;
