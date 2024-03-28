import { ISession } from '@/globaltypes/types';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

export const metadata: Metadata = {
  title: 'BSender',
  description: 'BSender sms sending application',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session: ISession | null = await getServerSession(options);
  return <div className="sms-page-box">{children}</div>;
}
