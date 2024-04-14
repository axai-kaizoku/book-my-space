const validateMobile = (mobile: any) => {
	let mobileRegex = /^[6-9]\d{9}$/;
	return mobileRegex.test(mobile);
};

export default validateMobile;
