import Link from "next/link";

import { useSession } from "next-auth/react";

type Props = {
	id: number;
	children: React.ReactNode;
}

export default function ManageContactBtn({ id, children }: Props) {

	return (
		<Link href={`admin/${id}/edit`} className="row-table__btn mr-2 px-2">
			{children}
		</Link>
	)
}