import mongoose from 'mongoose';

const { Schema } = mongoose;

const roomSchema = new Schema(
	{
		hotelId: {
			type: String,
			required: true,
			default: 'AXAILDG-1122-2023',
		},
		roomNumber: {
			type: Number,
			unique: true,
			required: true,
		},
		roomType: {
			type: String,
			required: true,
		},
		maxOccupancy: {
			type: Number,
			required: true,
		},
		pricePerNight: {
			type: Number,
			required: true,
			default: 1200,
		},
		isBooked: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
);

export default mongoose.models.Room || mongoose.model('Room', roomSchema);
