import connect from '@/utils/database';
import User from '@/models/User';

export async function GET() {
	await connect();
	try {
		const users = await User.find({ isAdmin: false });
		return Response.json(users, { status: 200 });
	} catch (error: any) {
		return Response.json(error, { status: 500 });
	}
}
