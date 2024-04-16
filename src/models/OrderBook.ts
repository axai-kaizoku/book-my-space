import mongoose from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const orderBookSchema = new Schema(
	{
		rooms: [
			{
				type: ObjectId,
				ref: 'Room',
				required: true,
			},
		],
		persons: {
			type: Number,
			default: 1,
			required: true,
		},
		payment: {},
		user: {
			type: ObjectId,
			ref: 'User',
			required: true,
		},
		checkIn: {
			type: Date,
			required: true,
		},
		checkOut: {
			type: Date,
			required: true,
		},
		status: {
			type: String,
			default: 'Processing',
			enum: ['Processing', 'Confirmed', 'Cancelled', 'CheckedIn', 'CheckedOut'],
		},
	},
	{ timestamps: true },
);

export default mongoose.models.OrderBook ||
	mongoose.model('OrderBook', orderBookSchema);
