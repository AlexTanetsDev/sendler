import Link from "next/link";

type Props = {
	id: number | undefined;
	children: React.ReactNode;
}

export default function ReviewClientsBtn({ id, children }: Props) {

	return (
		<Link href={`/user/${id}/clients`} className="action__btn">
			{children}
		</Link>
	)
}