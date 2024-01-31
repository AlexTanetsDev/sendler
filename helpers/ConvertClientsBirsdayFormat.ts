import { IClientDatabase } from "@/globaltypes/types";

export default function convertClientsBirthdayFormat(userClients: IClientDatabase[] | undefined) {
	if (userClients) {
		userClients.forEach((userClient: IClientDatabase) => {

			function convertMonth(monthOfBirthday: string | undefined) {
				switch (monthOfBirthday) {
					case '01': return 'січня';
					case '02': return 'лютого';
					case '03': return 'березеня';
					case '04': return 'квітеня';
					case '05': return 'травеня';
					case '06': return 'червня';
					case '07': return 'липеня';
					case '08': return 'серпеня';
					case '09': return 'вересня';
					case '10': return 'жовтеня';
					case '11': return 'листопада';
					case '12': return 'груденя';
				}
			}

			function convertDay(dayOfBirthday: string | undefined) {
				if (dayOfBirthday?.slice(0, 1) === '0') {
					return dayOfBirthday.slice(1, 2);
				}
				return dayOfBirthday;
			}

			const day = userClient.date_of_birth?.slice(0, 2);
			const month = userClient.date_of_birth?.slice(3, 5);
			const year = userClient.date_of_birth?.slice(6, 10);

			userClient.ua_date_of_birth = `${convertDay(day)} ${convertMonth(month)} ${year}`;
		})
		return userClients;
	};
};
