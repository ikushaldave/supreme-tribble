import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const animatedTexts = ["business with data", "ROI from AI/ML", "enterprise data fabric"];

const Layout = () => {
	const [currentAnimated, setCurrentAnimated] = useState<number>(0);

	useEffect(() => {
		const timerId = setInterval(() => {
			setCurrentAnimated((prev) => {
				if (prev === animatedTexts.length - 1) {
					return 0;
				}
				return prev + 1;
			});
		}, 2000);

		return () => clearInterval(timerId);
	}, []);

	return (
		<div className="h-screen flex items-center">
			<div className="w-1/2 h-full flex flex-col p-10 bg-slate-300 text-white">
				<a href="https://www.sigmoid.com/" target="_blank">
					<img src="/logo.png" alt="sigmoid" className="h-14" />
				</a>
				<div className="mt-auto mb-10">
					<h5 className=" text-red-700 font-bold text-2xl">
						Reimagine your <span>{animatedTexts[currentAnimated]}</span>
					</h5>
					<p className="text-gray-600">Combining data engineering and AI to deliver higher ROI</p>
				</div>
			</div>
			<div className="w-1/2 p-10 flex justify-center">
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
