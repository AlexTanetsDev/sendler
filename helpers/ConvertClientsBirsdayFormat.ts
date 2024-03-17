import { IClientDatabase } from "@/globaltypes/types";

export default function convertClientsBirthdayFormat(userClients: IClientDatabase[] | undefined) {
	function convertMonth(monthOfBirthday: string | undefined) {
		switch (monthOfBirthday) {
			case '01': return 'січня';
			case '02': return 'лютого';
			case '03': return 'березня';
			case '04': return 'квітня';
			case '05': return 'травня';
			case '06': return 'червня';
			case '07': return 'липня';
			case '08': return 'серпня';
			case '09': return 'вересня';
			case '10': return 'жовтня';
			case '11': return 'листопада';
			case '12': return 'грудня';
		}
	};

	function convertDay(dayOfBirthday: string | undefined) {
		if (dayOfBirthday?.slice(0, 1) === '0') {
			return dayOfBirthday.slice(1, 2);
		}
		return dayOfBirthday;
	};

	if (userClients) {
		userClients.forEach((userClient: IClientDatabase) => {
			if (userClient.date_of_birth === null) {
				userClient.ua_date_of_birth = "";
			} else {
				const day = userClient.date_of_birth?.slice(0, 2);
				const month = userClient.date_of_birth?.slice(3, 5);
				const year = userClient.date_of_birth?.slice(6, 10);
				userClient.ua_date_of_birth = `${convertDay(day)} ${convertMonth(month)} ${year}`;
			}
		})
		return userClients;
	};
};
