import type { IInvestorDTO } from '$lib/interfaces/investor.interface';

export const getEmptyInvestorValue = (
	id?: number,
	subInvestor?: number,
	length = 0,
	companyId = 1
): IInvestorDTO => ({
	id: id ?? length,
	companyId,
	sharePercentage: 0,
	name: '',
	code: '',
	type: 'person',
	parentInvestorId: subInvestor ?? null
});

export const calculateLevels = (investors: IInvestorDTO[]): number => {
	let maxLevel = 0;

	const traverse = (parentId: number | null, level: number): void => {
		const children = investors.filter((investor) => investor.parentInvestorId === parentId);
		if (children.length > 0) {
			level += 1;
			maxLevel = Math.max(maxLevel, level);
			children.forEach((child) => traverse(child.id, level));
		}
	};

	traverse(null, 0);
	return maxLevel;
};

export const validateInvestorLevel = (
	investors: IInvestorDTO[],
	currentLevel: number,
	maxInvestorLevels: number
): boolean => {
	if (currentLevel > maxInvestorLevels) return false;

	const allEndWithPerson = investors.every((investor) => {
		const children = investors.filter((i) => i.parentInvestorId === investor.id);
		return children.length === 0 || children.every((child) => child.type === 'person');
	});

	if (currentLevel < maxInvestorLevels && !allEndWithPerson) return false;

	return true;
};

export const validatePercentageAdded = (
	investors: IInvestorDTO[],
	minSearchPercentage: number
): boolean => {
	const traverse = (parentId: number | null): number => {
		const children = investors.filter((investor) => investor.parentInvestorId === parentId);
		let totalPercentage = 0;

		children.forEach((child) => {
			if (child.type === 'company') {
				totalPercentage += child.sharePercentage;
				const subInvestorPercentage = traverse(child.id);
				if (subInvestorPercentage < minSearchPercentage) {
					return false;
				}
			}
		});

		return totalPercentage;
	};

	return traverse(null) >= minSearchPercentage;
};

export const validateSubinvestorInformation = (investors: IInvestorDTO[]): boolean => {
	return investors.every((investor) => {
		return (
			investor.name.trim() !== '' && investor.code.trim() !== '' && investor.sharePercentage > 0
		);
	});
};
