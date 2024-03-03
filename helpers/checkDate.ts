export default function checkDate(year: string | undefined, month: string | undefined, day: string | undefined) {
	let y = Number(year);
	let m = Number(month);
	let d = Number(day);
	y = +y, --m, d = +d
	let x = new Date(y, m, d)
	return x.getFullYear() === y && x.getMonth() === m && x.getDate() === d;
};