import { eventInfo } from "../utils/demoData";
import Card from "./Card";

const CardContainer = () => {
	return (
		<section className="cardContainer">
			{eventInfo.map((element, index) => (
				<Card
					key={index + "eventInfo"}
					propsEventData={element}
				/>
			))}
		</section>
	);
};

export default CardContainer;
