import { useSelector } from "react-redux";
import Portal from "./portal";
import { RootState } from "@/store";

const Loader = () => {
	const loading = useSelector(({ common }: RootState) => common.fullScreenLoader);

	if (!loading) return false;

	return (
		<Portal>
			<div className="fixed z-50 top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-slate-200 opacity-50">
				<div className="loader" />
			</div>
		</Portal>
	);
};

export default Loader;
