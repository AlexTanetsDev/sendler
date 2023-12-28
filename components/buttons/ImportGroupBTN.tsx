import Link from "next/link";

type Props = {
	id: number;
	children: React.ReactNode;
}

export default function ImportGroupBtn({ id, children }: Props) {

	return (
		<Link href={`/user/contacts-manage/update-group/${id}`} className="row-table__btn mr-[15px]">
			{children}
		</Link>
	)
}