import connect from '@/utils/database';
import OrderBook from '@/models/OrderBook';
import { NextResponse } from 'next/server';

export async function GET() {
	await connect();
	try {
		const orders = await OrderBook.find()
			.populate('rooms')
			.populate('user', 'name')
			.sort({ createdAt: -1 });
		return Response.json(orders, { status: 200 });
	} catch (error: any) {
		return Response.json(error, { status: 500 });
	}
}

export async function POST(request: any) {
	const { id, status } = await request.json();
	await connect();
	const order = await OrderBook.findOne({ _id: id });
	order.status = status;
	await order.save();

	try {
		return new NextResponse('Updated Successfully', { status: 200 });
	} catch (error: any) {
		return new NextResponse(error, {
			status: 500,
		});
	}
}
