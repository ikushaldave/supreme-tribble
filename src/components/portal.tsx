import { ReactElement, useEffect } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }: { children: ReactElement }) => {
	const portalElement = document.createElement("div");

	useEffect(() => {
		portalElement.role = "presentation";
		document.body.append(portalElement);
		return () => {
			document.body.removeChild(portalElement);
		};
	}, [portalElement]);

	return createPortal(children, portalElement);
};

export default Portal;
