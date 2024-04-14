import { getServerSession } from 'next-auth';
import connect from '@/utils/database';
import User from '@/models/User';

const getUser = async () => {
	await connect();
	const session = await getServerSession();

	if (!session || !session.user) {
		return null;
	}

	const user = await User.findOne({ email: session.user?.email });
	return user;
};

export default getUser;
