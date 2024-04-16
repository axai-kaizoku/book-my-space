import OrderBook from '@/models/OrderBook';
import Room from '@/models/Room';
import connect from '@/utils/database';
import { NextResponse } from 'next/server';

const bookRooms = async (numPersons: number, availableRooms: any[]) => {
	try {
		// Calculate the number of rooms needed based on the number of persons
		const numRoomsNeeded = Math.ceil(numPersons / 2);

		// Filter available rooms based on isBooked status
		const available = availableRooms.filter((room) => !room.isBooked);

		// Take the first `numRoomsNeeded` available rooms
		const selectedRooms = available.slice(0, numRoomsNeeded);

		// Update isBooked status for selected rooms in the database
		for (const room of selectedRooms) {
			await Room.findByIdAndUpdate(room._id, { isBooked: true });
		}

		// Return an array of objects containing only the _id property
		return selectedRooms.map((room) => ({ _id: room._id }));
	} catch (error) {
		console.error('Error booking rooms:', error);
		throw error;
	}
};

export async function POST(request: any) {
	const { persons, user, checkIn, checkOut } = await request.json();

	const rooms = await Room.find({});

	const bookingRooms = await bookRooms(persons, rooms);

	const newOrderBook = new OrderBook({
		rooms: bookingRooms,
		persons,
		user,
		checkIn,
		checkOut,
	});
	try {
		await newOrderBook.save();
		return Response.json({ newOrderBook }, { status: 201 });
	} catch (error: any) {
		return new NextResponse(error, {
			status: 500,
		});
	}
}

export async function GET(request: any) {
	await connect();
	try {
		const orderBook = await OrderBook.find({});
		return Response.json(orderBook, { status: 200 });
	} catch (error: any) {
		return new NextResponse(error, {
			status: 500,
		});
	}
}
