const formatDate = (createdAt: Date) => {
	const date = new Date(createdAt);

	const hours = date.getHours();
	const minutes = date.getMinutes();

	const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

	const options = {
		day: 'numeric',
		month: 'short',
	};

	const formattedDate = date.toLocaleString('en-US', options);

	return `${formattedTime} ${formattedDate}`;
};

export default formatDate;
