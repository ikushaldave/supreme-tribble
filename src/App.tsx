import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Loader from "@components/Loader";
import AuthLayout from "@pages/auth/layout";
import Login from "@pages/auth/login";
import AppLayout from "@pages/app/layout";
import Home from "@pages/app/home";
import NoPageFound from "@pages/noPageFound";

const router = createBrowserRouter(
	[
		{
			element: <AuthLayout />,
			children: [
				{
					path: "/login",
					element: <Login />,
				},
			],
		},
		{
			element: <AppLayout />,
			children: [
				{
					path: "/app",
					element: <Home />,
				},
			],
		},
		{
			path: "*",
			element: <NoPageFound />
		}
	],
);

const App = () => {
	return (
		<>
			<RouterProvider router={router} />
			<Loader />
		</>
	);
};

export default App;
