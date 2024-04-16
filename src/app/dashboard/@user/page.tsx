'use client';
import { RoomProps } from '@/types';
import { useEffect, useState } from 'react';
import useUser from '@/hooks/use-user';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import formatDate, { formatOrderDate } from '@/utils/format-date';

export default function UserDashboard() {
	const { data: session, status: sessionStatus } = useSession();
	const user = useUser();
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (sessionStatus === 'unauthenticated') {
			router.replace('/auth');
		}
	}, [sessionStatus, router]);

	const getPosts = async () => {
		setLoading(true);
		const res = await fetch('/api/user-bookings');
		const data = await res.json();
		console.log(data);
		setOrders(data);
		setLoading(false);
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div className="w-full h-[90vh]">
			<div className="p-7 flex flex-row justify-between">
				<h1 className="text-3xl font-semibold ">User Dashboard</h1>
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
			<div className="w-full h-5/6 flex flex-row justify-center items-center">
				<div className=" w-11/12 h-full flex flex-row justify-between p-6">
					<div className=" bg-slate-50  shadow-lg w-11/12 p-3 rounded">
						<div>
							<h1 className="text-xl font-bold">Bookings</h1>
							<div className="border rounded border-gray-600"></div>
							<ul className="flex flex-col m-4 overflow-y-auto">
								<li className="flex p-3 my-2 text-sm  justify-between border border-b-2 border-b-black rounded-lg items-center">
									<p>Name</p>
									<p className="-m-20">Room No.</p>
									<p>Check In</p>
									<p>Check Out</p>
									<p>Status</p>
								</li>
								{loading ? (
									<div className="flex flex-row justify-center items-center w-full ">
										<div className="w-9 h-9 border-t-8 rounded-full border-8 border-t-slate-500 border-gray-300 animate-spin"></div>
									</div>
								) : orders.length > 0 ? (
									orders.map((order) => (
										<li
											key={order._id}
											className="flex p-3 my-2 text-sm justify-between border rounded-lg items-center">
											<p>{order.user.name}</p>
											<p>
												{order.rooms
													.map((room: RoomProps) => room.roomNo)
													.join(', ')}
											</p>
											<p>{formatOrderDate(order.checkIn)}</p>
											<p>{formatOrderDate(order.checkOut)}</p>
											<p>{order.status}</p>
										</li>
									))
								) : (
									<li className="text-center text-xl">No bookings yet!</li>
								)}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
