import type { IRealOwner } from '$lib/interfaces/investor.interface';

export const realOwnersMock: IRealOwner[] = [
	{
		investor: {
			id: 1,
			companyId: 1,
			sharePercentage: 20.5,
			name: 'Pablo Beltran',
			code: '1710000123',
			type: 'person'
		},
		file: {
			id: 1,
			investorId: 1,
			fileType: 'PDF',
			fileData: 'this-is-a-test-string-that-should-be-a-buffer'
		}
	},
	{
		investor: {
			id: 2,
			companyId: 1,
			sharePercentage: 15,
			name: 'Luis Flores',
			code: '1710760123',
			type: 'person'
		},
		file: {
			id: 2,
			investorId: 2,
			fileType: 'PDF',
			fileData: 'this-is-a-test-string-that-should-be-a-buffer'
		}
	},
	{
		investor: {
			id: 3,
			companyId: 1,
			sharePercentage: 35.5,
			name: 'Jon Doe',
			code: '1710422123',
			type: 'person'
		},
		file: {
			id: 3,
			investorId: 3,
			fileType: 'PNG',
			fileData: 'this-is-a-test-string-that-should-be-a-buffer'
		}
	}
];
