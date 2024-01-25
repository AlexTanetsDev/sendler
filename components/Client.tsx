import EditClient from './EditClient';
import { IClientDatabase } from '@/globaltypes/types';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface Props {
	convertClient: IClientDatabase;
	groupId?: number | undefined;
	updateClients: () => void;
	getUpdate: () => void;
	register: UseFormRegister<FieldValues>
	onSelect: (e: any) => void;
}

const Client = ({
	convertClient,
	groupId,
	updateClients,
	getUpdate,
	register,
	onSelect }: Props) => {
	return (
		<li className="flex  px-[26px] items-center h-[48px] text-base font-montserrat font-normal border-b border-rowUnderLine">
			<input
				id={String(convertClient.client_id)}
				{...register(`${convertClient.client_id}`)}
				placeholder="bluebill1049@hotmail.com"
				type="checkbox"
				onChange={onSelect}
			/>
			<label htmlFor={String(convertClient.client_id)} className=""></label>
			<div className="flex items-center gap-x-6 ml-[15px]">
				<div className="w-[128px] text-left overflow-hidden">
					{convertClient.tel}
				</div>
				<div className="flex gap-x-2 flex-nowrap w-[354px] text-left overflow-hidden">
					<div>{convertClient.last_name}</div>
					<div>{convertClient.first_name}</div>
					<div>{convertClient.middle_name}</div>
				</div>
				<div className="w-[178px] text-left overflow-hidden">
					{convertClient.ua_date_of_birth}
				</div>
				<div className="w-[158px] text-left overflow-hidden">
					{convertClient.parameter_1}
				</div>
				<div className="w-[150px] text-left overflow-hidden">
					{convertClient.parameter_2}
				</div>
				<EditClient
					groupId={groupId}
					client={convertClient}
					updateClients={updateClients}
					getUpdate={getUpdate}
				/>
			</div>
		</li>
	)
}

export default Client;

