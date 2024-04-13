import mongoose from 'mongoose';

const connect = async () => {
	if (mongoose.connections[0].readyState) return;

	try {
		await mongoose.connect(`${process.env.NEXT_PUBLIC_MONGODB_URI}`);
		console.log('Mongo connection successfully established');
	} catch (error) {
		throw new Error('Error connecting to Mongo DB');
	}
};

export default connect;
