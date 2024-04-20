'use client';
import { OrderProps, RoomProps } from '@/types';
import { useEffect, useState } from 'react';
import useUser from '@/hooks/use-user';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import formatDate, { formatOrderDate } from '@/utils/format-date';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

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
							<div className="w-full mt-2 overflow-y-auto max-h-[40vh]">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Name</TableHead>
											<TableHead>Room No.</TableHead>
											<TableHead>Check In</TableHead>
											<TableHead>Check Out</TableHead>
											<TableHead>Status</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{true ? (
											<TableCaption
												aria-colspan={5}
												className="w-full flex justify-center items-center ">
												<div className="w-9 h-9 border-t-8 rounded-full border-8 border-t-slate-500 border-gray-300 animate-spin"></div>
											</TableCaption>
										) : (
											orders &&
											orders.map((order: OrderProps) => (
												<TableRow key={order._id}>
													<TableCell className="font-medium">
														{order.user.name}
													</TableCell>
													<TableCell>
														{order.rooms
															.map((room: RoomProps) => room.roomNumber)
															.join(', ')}
													</TableCell>
													<TableCell>
														{formatOrderDate(order.checkIn)}
													</TableCell>
													<TableCell>
														{formatOrderDate(order.checkOut)}
													</TableCell>
													<TableCell>{order.status}</TableCell>
												</TableRow>
											))
										)}
									</TableBody>
								</Table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
