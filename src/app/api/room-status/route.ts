import Room from '@/models/Room';
import connect from '@/utils/database';
import { NextResponse } from 'next/server';

export async function POST(request: any) {
	const { id } = await request.json();
	await connect();
	const room = await Room.findOne({ _id: id });
	room.isBooked = !room.isBooked;
	await room.save();
	try {
		return new NextResponse('Changed status Successfully', { status: 200 });
	} catch (error: any) {
		return new NextResponse(error, {
			status: 500,
		});
	}
}
