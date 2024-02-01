import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./src/components/App";
import RegisterEvent from "./src/pages/RegisterEvent";
import Events from "./src/components/Events";
import BookTickets from "./src/components/BookTickets";
import Register from "./src/components/Register";
const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "registerevent",
		element: <RegisterEvent />,
	},
	{
		path: "events",
		element: <Events />,
	},
	{
		path: "booktickets",
		element: <BookTickets />,
	},
	{
		path: "register",
		element: <Register />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
