const firstName = 'Cheah';
const lastName = 'Hao Yi';
const suffix = 'Portfolio: Cheah Hao Yi';

const BaseData = {
	firstName,
	lastName,
	suffix,
	get fullName() {
		return `${firstName} ${lastName}`;
	}
};

export default BaseData;
