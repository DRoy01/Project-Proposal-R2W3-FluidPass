import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./frontend/components/App";
import RegisterEvent from "./frontend/pages/RegisterEvent";
import Events from "./frontend/components/Events";
import BookTickets from "./frontend/components/BookTickets";
import Register from "./frontend/components/Register";

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
