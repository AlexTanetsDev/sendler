export const isKyr = (str: string) => {
	return /[а-яё]/i.test(str);
};