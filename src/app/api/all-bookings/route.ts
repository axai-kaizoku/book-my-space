import connect from '@/utils/database';
import OrderBook from '@/models/OrderBook';

export async function GET() {
	await connect();
	try {
		const orders = await OrderBook.find()
			.populate('rooms')
			.populate('user', 'name');
		return Response.json(orders, { status: 200 });
	} catch (error: any) {
		return Response.json(error, { status: 500 });
	}
}
