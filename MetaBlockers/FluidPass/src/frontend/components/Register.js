import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./Header";
import SingleCompanyCard from "./SingleCompanyCard";
import Footer from "./Footer";

const Events = () => {
	return (
		<section className="containerSection">
			<Header />
			<SingleCompanyCard />
			<Footer />
		</section>
	);
};

export default Events;
