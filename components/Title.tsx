import React, { ReactNode } from "react";

interface ITitleProps {
	type: "h1" | "h2" | "h3";
	children: ReactNode;
}

// function Title({ type, children }: ITitleProps) {
// 	return type === "h1" ? (
// 		<h1 className="title">{children}</h1>
// 	) : (
// 		<h2 className="title">{children}</h2>
// 	);
// }

function Title({ type, children }: ITitleProps) {

	switch (type) {
		case "h1":
			return <h1 className="title_h1">{children}</h1>;
			break;

		case "h2":
			return <h2 className="title_h2">{children}</h2>;
			break;

		case "h3":
			return <h3 className="title_h3">{children}</h3>;
			break;
	}
}

export default Title;
