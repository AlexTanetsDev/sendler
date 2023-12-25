import axios from "axios";

type Props = {
	groupId: number;
	updateListControl: any;
	children: string;
}

export default function DeleteGroupBtn({ groupId, updateListControl, children }: Props) {

	const handleClick = async () => {
		try {
			await axios.delete(`api/sending-groups/${groupId}`);
			updateListControl();
		} catch (error: any) {
			console.log(error.message)
		}
	}
	return (
		<button onClick={handleClick} className="row-table__btn mr-[15px]">
			{children}
		</button>
	)
}
