import User from '@/models/User';
import connect from '@/utils/database';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export const POST = async (request: any) => {
	const { name, mobile, email, password } = await request.json();
	await connect();
	const existingUserEmail = await User.findOne({ email });
	const existingUserMobile = await User.findOne({ mobile });

	if (existingUserEmail) {
		return new NextResponse('Email is already in use', { status: 400 });
	}

	if (existingUserMobile) {
		return new NextResponse('Mobile is already in use', { status: 400 });
	}

	const hashPassword = await bcrypt.hash(password, 5);
	const newUser = new User({
		name,
		mobile,
		email,
		password: hashPassword,
	});

	try {
		await newUser.save();
		return new NextResponse('Signup success', { status: 201 });
	} catch (error: any) {
		return new NextResponse(error, {
			status: 500,
		});
	}
};
