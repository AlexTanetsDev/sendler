import Link from "next/link";

import { useSession } from "next-auth/react";

type Props = {
	id: number;
	children: React.ReactNode;
}

export default function UpdateGroupBtn({ id, children }: Props) {
	const { data: session } = useSession();
	const userId = session?.user.user_id;

	return (
		<Link href={`/user/${userId}/groups/${id}/edit`} className="row-table__btn">
			{children}
		</Link>
	)
}