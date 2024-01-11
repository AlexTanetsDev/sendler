import axios from "axios";

type Props = {
	id: number;
	getGroups: () => void,
	children: React.ReactNode;
}

export default function DeleteGroupBtn({ id, getGroups, children }: Props) {

	const handleClick = async () => {
		try {
			await axios.delete(`api/sending-groups/${id}`);
			getGroups();
		} catch (error: any) {
			console.log(error.message)
		}
	}
	return (
		<button type="button" onClick={handleClick} className="row-table__btn">
			{children}
		</button>
	)
}
