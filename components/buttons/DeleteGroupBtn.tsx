import { deleteGroup } from "@/fetch-actions/groupsFetchActions";

type Props = {
	id: number;
	getGroups: () => void,
	children: React.ReactNode;
}

export default function DeleteGroupBtn({ id, getGroups, children }: Props) {

	const handleClick = async () => {
		await deleteGroup(id);
		getGroups();
	}

	return (
		<button type="button" onClick={handleClick} className="row-table__btn">
			{children}
		</button>
	)
}
