import { useState } from 'react';

const useError = () => {
	const [error, setError] = useState('');

	const setErrorMsg = (msg: string) => {
		setError(msg);
	};

	const clearError = () => {
		setError('');
	};

	return {
		error,
		setErrorMsg,
		clearError,
	};
};

export default useError;
