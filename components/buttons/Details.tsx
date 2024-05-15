import Link from 'next/link';

type Props = {
  id: number;
  children: React.ReactNode;
};

export default function DetailBtn({ id, children }: Props) {
  return (
    <Link href={`admin/${id}/detail`} className="row-table__btn px-2">
      {children}
    </Link>
  );
}
