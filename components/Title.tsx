import React, { ReactNode } from "react";

interface ITitleProps {
	type: "hero" | "h1" | "h2" | "title_block" | "accent-main_text";
	color: "light" | "dark";
	children: ReactNode;
}

export default function Title({ type, color, children }: ITitleProps) {
	const typeAndColor = type + '-' + color;
	switch (typeAndColor) {

		case "hero-light":
			return <h1 className="title_hero text-whiteText">{children}</h1>;

		case "h1-light":
			return <h1 className="title_h1 text-whiteText">{children}</h1>;

		case "h2-light":
			return <h2 className="title_h2 text-whiteText">{children}</h2>;

		case "title_block-light":
			return <h3 className="title_block text-whiteText">{children}</h3>;

		case "accent-main_text-light":
			return <p className="accent-main_text text-whiteText">{children}</p>;

		case "hero-dark":
			return <h1 className="title_hero text-mainTextColor">{children}</h1>

		case "h1-dark":
			return <h1 className="title_h1 text-mainTextColor">{children}</h1>;

		case "h2-dark":
			return <h2 className="title_h2 text-mainTextColor">{children}</h2>;

		case "title_block-dark":
			return <h3 className="title_block text-mainTextColor">{children}</h3>;

		case "accent-main_text-dark":
			return <p className="accent-main_text text-mainTextColor">{children}</p>;

	}
};


