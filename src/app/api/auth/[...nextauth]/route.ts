import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import connect from '@/utils/database';

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			id: 'credentials',
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials: any) {
				await connect();
				try {
					const user = await User.findOne({ email: credentials.email });

					if (user) {
						const isPasswordValid = await bcrypt.compare(
							credentials.password,
							user.password,
						);
						if (isPasswordValid) {
							return user;
						}
					}
				} catch (error: any) {
					throw new Error(error);
				}
			},
		}),
	],
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
