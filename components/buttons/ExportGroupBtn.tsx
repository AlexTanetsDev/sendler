import axios from 'axios';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx/xlsx.mjs';
import { getGroupById } from '@/fetch-actions/groupsFetchActions';
import { IClientExport, IGroupDatabase } from '@/globaltypes/types';

type Props = {
	id: number;
	children: React.ReactNode;
	group: IGroupDatabase
}

export default function ExportGroupBtn({ id, group, children }: Props) {
	const [isDisabled, setIsDisabled] = useState(false);

	const handleClick = async () => {
		try {
			const res: axios.AxiosResponse<{
				res: {
					groupName: string;
					clients: IClientExport[];
				}
			}> | undefined = await getGroupById(id);

			const clients = res?.data.res.clients;
			const groupName = res?.data.res.groupName;

			clients?.forEach(client => {
				delete client.id;
			});

			clients?.forEach(client => {
				delete client.total_count;
				delete client.client_id;
			});

			const formatedClients: Object[] = [];

			clients?.forEach(client => {
				formatedClients.push({
					["Ім'я"]: client.first_name,
					['Побатькові']: client.middle_name,
					['Прізвище']: client.last_name,
					['Телефон']: client.tel,
					['Дата народження']: client.date_of_birth,
					['Параметр 1']: client.parameter_1,
					['Параметр 2']: client.parameter_2,
				});
			});
			if (clients) {
				const keysObject = Object.keys(clients[0]);
				const ws = XLSX.utils.json_to_sheet(formatedClients, { headers: keysObject });

				if (!ws['!cols']) ws['!cols'] = [];
				const range = XLSX.utils.decode_range(ws['!ref']);
				const width = 20;
				for (let i = range.s.c; i <= range.e.c; i++) {
					ws['!cols'][i] = { wch: width };
				}

				const workbook = XLSX.utils.book_new();
				XLSX.utils.book_append_sheet(workbook, ws, 'Sheet 1');
				XLSX.writeFile(workbook, `${groupName}.xlsx`);
			};

		} catch (error: any) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		if (Number(group.number_members) === 0) {
			setIsDisabled(true);
		}
	}, [group.number_members]);

	return (
		<button
			type="button"
			onClick={handleClick}
			disabled={isDisabled}
			className={Number(group.number_members) ? 'row-table__btn' : 'row-table-disable__btn'}
		>
			{children}
		</button>
	);
}
