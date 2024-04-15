'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RoomProps } from '@/types';

export default function Bookings() {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(true);
	const [rooms, setRooms] = useState<RoomProps[]>([]);
	const [bookingUi, setBookingUi] = useState<string>('recentBookings');
	const [error, setError] = useState<string>('');
	const [roomNumber, setRoomNubmer] = useState<string>('');
	const [maxOccupancy, setmaxOccupancy] = useState<number | undefined>(2);
	const [roomType, setRoomType] = useState<string | undefined>('Single');
	const [pricePerNight, setPricePerNight] = useState<number>(1500);

	const fetchRooms = async (bookingUi: string) => {
		try {
			if (bookingUi === 'availableRooms') {
				setLoading(true);
				const response = await fetch('/api/room');
				const data = await response.json();
				setRooms(data);
				setLoading(false);
			} else {
				return;
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchRooms(bookingUi);
	}, [bookingUi]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			const response = await fetch('/api/room', {
				method: 'POST',
				body: JSON.stringify({
					roomNumber,
					maxOccupancy,
					roomType,
					pricePerNight,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error('Http error! Status');
			}

			if (response.status === 400) {
				setError('Room already exists');
			}

			setRoomNubmer('');
			setmaxOccupancy(0);
			setRoomType('');
			setPricePerNight(0);
		} catch (error) {
			console.log(error);
		}
		// console.log(roomNumber, maxOccupancy, roomType, pricePerNight);
	};

	return (
		<div>
			<h1 className="text-xl font-bold">Bookings</h1>
			<div className="border rounded border-gray-600"></div>
			<div className="flex flex-col">
				{/* Buttons */}
				<div className="flex gap-2 w-full border p-4  md:gap-6 rounded-lg mt-4">
					<button
						onClick={() => setBookingUi('recentBookings')}
						className={`p-2  rounded-lg w-fit ${
							bookingUi === 'recentBookings'
								? 'bg-slate-800 text-slate-100'
								: 'bg-slate-100 text-slate-800'
						}`}>
						Recent bookings
					</button>
					<button
						onClick={() => setBookingUi('availableRooms')}
						className={`p-2  rounded-lg w-fit ${
							bookingUi === 'availableRooms'
								? 'bg-slate-800 text-slate-100'
								: 'bg-slate-100 text-slate-800'
						}`}>
						Available Rooms
					</button>
					<button
						onClick={() => setBookingUi('addNewRoom')}
						className={`p-2  rounded-lg w-fit ${
							bookingUi === 'addNewRoom'
								? 'bg-slate-800 text-slate-100'
								: 'bg-slate-100 text-slate-800'
						}`}>
						Add new Room
					</button>
				</div>
				{/* Recent Bookings */}
				{bookingUi === 'recentBookings' && (
					<ul className="w-full mt-2 overflow-y-auto max-h-[40vh]">
						<li className="flex p-3 my-2 text-sm  justify-between border border-b-2 border-b-black rounded-lg items-center">
							<p>Name</p>
							<p className="-m-16">Room No.</p>
							<p>Check In</p>
							<p>Check Out</p>
							<p>Status</p>
							<p>Price Paid</p>
						</li>
						<li className="flex p-3 my-2 text-sm justify-between border rounded-lg items-center">
							<p>john</p>
							<p>101</p>
							<p>15-04-2024 at 15:00</p>
							<p>16-04-2024 at 15:00</p>
							<select name="status">
								<option value="Processing">Processing</option>
								<option value="Confirmed">Confirmed</option>
								<option value="Cancelled">Cancelled</option>
								<option value="CheckedIn">Checked In</option>
								<option value="CheckedOut">Checked Out</option>
							</select>
							<p>₹1600</p>
						</li>
					</ul>
				)}
				{/* Available Rooms */}
				{bookingUi === 'availableRooms' && (
					<ul className="w-full flex flex-wrap gap-5 mt-2 p-8 overflow-y-auto max-h-[40vh]">
						{rooms.map((room: RoomProps) => (
							<li
								key={room._id}
								className={`w-52 flex flex-col justify-center h-40 border ${
									room.isBooked ? 'bg-red-400' : 'bg-green-400'
								} text-white rounded-lg`}>
								<p className="text-2xl font-semibold p-4">{room.roomNumber}</p>
								<div className="text-sm p-4">
									<p className="text-base font-semibold">Room Details</p>
									<p>
										<span className="font-semibold">Room Type: </span>
										{room.roomType}
									</p>
									<p>
										<span className="font-semibold">Max Occupancy: </span>
										{room.maxOccupancy}
									</p>
									<p>
										<span className="font-semibold">Price Per Night: </span>
										{room.pricePerNight}
									</p>
								</div>
							</li>
						))}
					</ul>
				)}
				{/* Add New Room */}
				{bookingUi === 'addNewRoom' && (
					<div className="w-full mt-2 overflow-y-auto flex justify-center max-h-[40vh] p-8">
						<div className="w-full md:mt-0 sm:max-w-md xl:p-0 ">
							<form
								className="space-y-2 md:space-y-3"
								onSubmit={handleSubmit}>
								<div className="flex items-center justify-between gap-4">
									<label
										htmlFor="loginEmailOrNumber"
										className=" whitespace-nowrap text-base font-medium text-gray-900 ">
										Hotel ID:
									</label>
									<input
										type="text"
										name="loginEmailOrNumber"
										id="loginEmailOrNumber"
										className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-56 p-2.5"
										disabled
										value="AXAILDG-1122-2023"
									/>
								</div>
								<div className="flex items-center justify-between gap-4">
									<label
										htmlFor="loginEmailOrNumber"
										className=" whitespace-nowrap text-base font-medium text-gray-900 ">
										Room Number:
									</label>
									<input
										type="text"
										name="loginEmailOrNumber"
										id="loginEmailOrNumber"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-56 p-2.5"
										placeholder="101"
										required
										value={roomNumber}
										onChange={(e) => setRoomNubmer(e.target.value)}
									/>
								</div>
								<div className="flex items-center justify-between gap-4">
									<label
										htmlFor="loginEmailOrNumber"
										className=" whitespace-nowrap text-base font-medium text-gray-900 ">
										Max Occupancy:
									</label>
									<select
										name="loginEmailOrNumber"
										id="loginEmailOrNumber"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-56 p-2.5"
										value={maxOccupancy}
										onChange={(e) => setmaxOccupancy(parseInt(e.target.value))}>
										<option
											value={2}
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-56 p-2.5">
											2
										</option>
										<option
											value={3}
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-56 p-2.5">
											3
										</option>
										<option
											value={4}
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-56 p-2.5">
											4
										</option>
									</select>
								</div>
								<div className="flex items-center justify-between gap-4">
									<label
										htmlFor="loginEmailOrNumber"
										className=" whitespace-nowrap text-base font-medium text-gray-900 ">
										Room Type:
									</label>
									<select
										name="loginEmailOrNumber"
										id="loginEmailOrNumber"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-56 p-2.5"
										value={roomType}
										onChange={(e) => setRoomType(e.target.value)}>
										<option
											value="Single"
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-56 p-2.5">
											Single
										</option>
										<option
											value="Double"
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-56 p-2.5">
											Double
										</option>
									</select>
								</div>
								<div className="flex items-center justify-between gap-4">
									<label
										htmlFor="loginEmailOrNumber"
										className=" whitespace-nowrap text-base font-medium text-gray-900 ">
										Price Per Night:
									</label>
									<input
										type="number"
										name="loginEmailOrNumber"
										id="loginEmailOrNumber"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-56 p-2.5"
										placeholder="1500"
										required
										value={pricePerNight}
										onChange={(e) => setPricePerNight(parseInt(e.target.value))}
									/>
								</div>

								<div>
									<span className="text-red-500">{error}</span>
								</div>
								<button
									type="submit"
									disabled={false}
									className="w-full border-black border  text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center">
									Add New Room
								</button>
							</form>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
