import User from '@/models/User';
import Room from '@/models/Room';
import OrderBook from '@/models/OrderBook';
import connect from '@/utils/database';
import { getServerSession } from 'next-auth';
import { RoomProps } from '@/types';

export async function GET(request: any) {
	try {
		const session = await getServerSession();
		if (!session) {
			return Response.json({ error: 'Unauthorized' });
		}
		await connect();
		const user = await User.findOne({ email: session.user?.email });
		// Populate the rooms and user fields
		const orders = await OrderBook.find({ user: user._id })
			.populate('rooms')
			.populate('user', 'name')
			.sort({ createdAt: -1 });

		// Map the orders to include roomNo and name
		const populatedOrders = orders.map((order) => ({
			_id: order._id,
			rooms: order.rooms.map((room: RoomProps) => ({
				_id: room._id,
				roomNo: room.roomNumber,
			})),
			persons: order.persons,
			payment: order.payment,
			user: { _id: order.user._id, name: order.user.name },
			checkIn: order.checkIn,
			checkOut: order.checkOut,
			status: order.status,
		}));

		return Response.json(populatedOrders, { status: 200 });
	} catch (error: any) {
		return Response.json(error, { status: 500 });
	}
}
