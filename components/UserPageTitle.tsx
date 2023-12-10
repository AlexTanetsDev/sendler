import React from "react";

const TitlePage = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<div className='mb-14 text-4xl font-semibold leading-normal'>
			{children}
		</div>
	)
};

export default TitlePage;