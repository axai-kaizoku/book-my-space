import { useEffect, useState } from 'react';

const useUser = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await fetch('/api/user');
				const data = await res.json();
				setUser(data);
			} catch (error) {
				console.error('Error fetching user:', error);
			}
		};

		fetchUser();
	}, []);

	return user;
};

export default useUser;
