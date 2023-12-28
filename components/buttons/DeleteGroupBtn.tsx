import axios from "axios";

type Props = {
	id: number;
	updateListControl: any;
	children: React.ReactNode;
}

export default function DeleteGroupBtn({ id, updateListControl, children }: Props) {

	const handleClick = async () => {
		try {
			await axios.delete(`api/sending-groups/${id}`);
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
