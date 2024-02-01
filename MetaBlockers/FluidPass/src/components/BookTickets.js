import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import BookCustomEvents from "./BookCustomEvents";

const BookTickets = () => {
	return (
		<section className="containerSection">
			<Header />
			<BookCustomEvents />
			<Footer />
		</section>
	);
};

export default BookTickets;
