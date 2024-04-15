'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useUser from '@/hooks/use-user';
import formatDate from '@/utils/format-date';

export default function Dashboard() {
	const user = useUser();
	const router = useRouter();
	const { data: session, status: sessionStatus } = useSession();

	useEffect(() => {
		if (sessionStatus === 'unauthenticated') {
			router.replace('/auth');
		}
	}, [sessionStatus, router]);
	return (
		<>
			<div className="p-7 flex flex-row justify-between">
				<h1 className="text-3xl font-semibold ">Admin Dashboard</h1>
				{user && (
					<div>
						<p>{user.name}</p>
						<p className="text-xs font-extralight">
							Last logged: {formatDate(user.updatedAt)}
						</p>
					</div>
				)}
			</div>
			<div className="flex items-center justify-center">
				<div className="w-full mx-5 border "></div>
			</div>
		</>
	);
}
