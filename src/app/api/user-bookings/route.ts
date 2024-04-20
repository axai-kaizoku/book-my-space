import User from '@/models/User';
import OrderBook from '@/models/OrderBook';
import connect from '@/utils/database';
import { getServerSession } from 'next-auth';

export async function GET(request: any) {
	try {
		const session = await getServerSession();
		if (!session) {
			return Response.json({ error: 'Unauthorized' });
		}
		await connect();
		const user = await User.findOne({ email: session.user?.email });
		const orders = await OrderBook.find({ user: user._id })
			.populate('rooms')
			.populate('user', 'name')
			.sort({ createdAt: -1 });

		return Response.json(orders, { status: 200 });
	} catch (error: any) {
		return Response.json(error, { status: 500 });
	}
}
