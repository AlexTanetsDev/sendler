import React, { ReactNode } from "react";

interface ITitleProps {
	type: "h1" | "h2" | "h3" | "title-main_text";
	color: "light" | "dark";
	children: ReactNode;
}

export default function Title({ type, color, children }: ITitleProps) {
	const typeAndColor = type + '-' + color;
	switch (typeAndColor) {
		case "h1-light":
			return <h1 className="title_h1 text-whiteText">{children}</h1>;

		case "h2-light":
			return <h2 className="title_h2 text-whiteText">{children}</h2>;

		case "h3-light":
			return <h3 className="title_h3 text-whiteText">{children}</h3>;

		case "title-main_text-light":
			return <h2 className="title-main_text text-whiteText">{children}</h2>;

		case "h1-dark":
			return <h1 className="title_h1 text-mainTextColor">{children}</h1>;

		case "h2-dark":
			return <h2 className="title_h2 text-mainTextColor">{children}</h2>;

		case "h3-dark":
			return <h3 className="title_h3 text-mainTextColor">{children}</h3>;

		case "title-main_text-dark":
			return <h2 className="title-main_text text-mainTextColor">{children}</h2>;

	}
};


