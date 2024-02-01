import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./Header";
import EventPage from "./EventPage";
import Footer from "./Footer";

const Events = () => {
	return (
		<section className="containerSection">
			<Header />
			<EventPage />
			<Footer />
		</section>
	);
};

export default Events;
