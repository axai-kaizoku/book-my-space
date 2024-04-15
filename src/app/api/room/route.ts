import Room from '@/models/Room';
import connect from '@/utils/database';
import { NextResponse } from 'next/server';

export async function POST(request: any) {
	const { roomNumber, roomType, maxOccupancy, pricePerNight } =
		await request.json();
	await connect();
	const existingRoom = await Room.findOne({ roomNumber });
	if (existingRoom) {
		return new NextResponse('This room is already added.', { status: 400 });
	}
	const newRoom = new Room({
		roomNumber,
		roomType: roomType ? roomType : 'Single',
		maxOccupancy,
		pricePerNight,
	});
	try {
		await newRoom.save();
		return new NextResponse('Room added', { status: 201 });
	} catch (error: any) {
		return new NextResponse(error, {
			status: 500,
		});
	}
}
