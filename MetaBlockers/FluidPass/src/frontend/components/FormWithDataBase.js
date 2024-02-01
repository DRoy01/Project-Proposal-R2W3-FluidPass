export default function FormWithDataBase() {
	function Submit(e) {
		e.preventDefault();
		const formEle = document.querySelector("form");
		const formDatab = new FormData(formEle);
		fetch(
			"https://script.google.com/macros/s/AKfycbwTajVy00E45EVwQH5SEOXAJUZFPZ-axFgJ0hqrMyu87GBYXs1a7_0XNAxlpocXAZrGzA/exec",
			{
				method: "POST",
				body: formDatab,
			}
		)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data);
			})
			.catch((error) => {
				console.log(error);
			});
	}
	return (
		<section className="formWithDataBase">
			<h2 className="formHeadline">
				Showcase your events in FluidPass Network
			</h2>
			<h1 className="formHeadline">Fill the details and submit the form.</h1>
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
						placeholder="Need to register event"
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
		</section>
	);
}
