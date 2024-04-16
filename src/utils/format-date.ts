const formatDate = (createdAt: Date) => {
	const date = new Date(createdAt);

	const hours = date.getHours();
	const minutes = date.getMinutes();

	const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

	const options: any = {
		day: 'numeric',
		month: 'short',
	};

	const formattedDate = date.toLocaleString('en-US', options);

	return `${formattedTime} ${formattedDate}`;
};

export const formatOrderDate = (date: Date) => {
	const checkInDate = new Date(date);

	const hours = checkInDate.getHours();
	const minutes = checkInDate.getMinutes();

	const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

	const options: any = {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	};

	const formattedDate = checkInDate.toLocaleString('en-US', options);

	return `${formattedTime} ${formattedDate}`;
};

export default formatDate;
