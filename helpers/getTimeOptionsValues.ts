export const getTimeOptionsValues = (min: number, max: number) => {
	const optionsArray = [];
	for (let i = min; i <= max; i += 1) {
		optionsArray.push(i.toString().padStart(2, '0'));
	}
	return optionsArray;
};