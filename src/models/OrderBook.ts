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
		payment: {},
		buyer: {
			type: ObjectId,
			ref: 'User',
			required: true,
		},
		status: {
			type: String,
			default: 'Processing',
			enum: [
				'Processing',
				'Confirmed',
				'Cancelled',
				'Checked In',
				'Checked Out',
			],
		},
	},
	{ timestamps: true },
);

export default mongoose.models.OrderBook ||
	mongoose.model('OrderBook', orderBookSchema);
