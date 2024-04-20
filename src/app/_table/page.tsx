import { OrderProps, RoomProps } from '@/types';
import formatDate, { formatOrderDate } from '@/utils/format-date';
import { DataTable } from './data-table';
import { columns } from './columns';

async function getData(): Promise<any> {
	const response = await fetch('/api/all-bookings');
	console.log(response);
	const data = await response.json();
	console.log(data);

	return data.map((order: OrderProps) => {
		return {
			_id: order._id,
			rooms: order.rooms.map((room: RoomProps) => room.roomNumber),
			persons: order.persons,
			user: order.user.name,
			checkIn: formatOrderDate(order.checkIn),
			checkOut: formatOrderDate(order.checkOut),
			status: order.status,
			createdAt: formatDate(order.createdAt),
		};
	});
}

export default async function DemoPage() {
	const data = await getData();

	return (
		<div className="container mx-auto py-10">
			<DataTable
				columns={columns}
				data={data}
			/>
			{/* {JSON.stringify(data)} */}
			Hello
		</div>
	);
}
