import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import getUser from '@/lib/get-user';

export default async function DashboardLayout({
	children,
	users,
	posts,
	user,
}: {
	children: React.ReactNode;
	users: React.ReactNode;
	posts: React.ReactNode;
	user: React.ReactNode;
}) {
	const session = await getServerSession();
	if (!session) {
		redirect('/');
	}

	const userRole = await getUser();
	const isAdmin = userRole.isAdmin;
	return session && isAdmin ? (
		<div className="w-full h-[80vh]">
			{children}
			<div className="w-full h-5/6 flex flex-row justify-center items-center">
				<div className=" w-11/12 h-full flex flex-col lg:flex-row justify-between p-6">
					<div className=" bg-slate-50 h-fit shadow-lg w-full p-3 rounded lg:w-3/5">
						{posts}
					</div>
					<div className=" bg-slate-50 h-fit shadow-lg w-full lg:w-1/3 p-3 rounded">
						{users}
					</div>
				</div>
			</div>
		</div>
	) : session && !isAdmin ? (
		<div>{user}</div>
	) : null;
}
