import { eventInfo } from "../utils/demoData";
import BookCustomCard from "./BookCustomCard";

const BookCustomContainer = () => {
	return (
		<section className="cardContainer">
			{eventInfo.map((element, index) => (
				<BookCustomCard
					key={index + "eventInfo"}
					propsEventData={element}
				/>
			))}
		</section>
	);
};

export default BookCustomContainer;
