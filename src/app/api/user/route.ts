import User from '@/models/User';
import connect from '@/utils/database';
import { getServerSession } from 'next-auth';

export async function GET(request: any) {
	try {
		const session = await getServerSession();
		if (!session) {
			return Response.json({ error: 'Unauthorized' });
		}
		await connect();
		const user = await User.findOne({ email: session.user?.email });
		return Response.json(user, { status: 200 });
	} catch (error: any) {
		return Response.json(error, { status: 500 });
	}
}

export async function POST(request: any) {
	try {
		await connect();
		const { loginEmailOrNumber } = await request.json();

		const findUserByEmail = await User.find({ email: loginEmailOrNumber });
		const findUserByMobile = await User.find({ mobile: loginEmailOrNumber });

		if (findUserByEmail.length > 0) {
			return new Response(JSON.stringify(findUserByEmail[0]), { status: 200 });
		} else if (findUserByMobile.length > 0) {
			return new Response(JSON.stringify(findUserByMobile[0]), { status: 200 });
		} else {
			return new Response(JSON.stringify({}), { status: 404 });
		}
	} catch (error: any) {
		console.error(error);
		return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
			status: 500,
		});
	}
}
