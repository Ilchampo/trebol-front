import type { IInvestorDTO } from '$lib/interfaces/investor.interface';

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

export const validateForm = (
	investors: IInvestorDTO[],
	currentLevel: number,
	maxLevels: number | undefined
): boolean => {
	if (currentLevel < (maxLevels ?? 100)) {
		const allEndWithPerson = investors.every((investor) => {
			const children = investors.filter((i) => i.parentInvestorId === investor.id);
			return children.length === 0 || children.every((child) => child.type === 'person');
		});
		if (!allEndWithPerson) {
			return false;
		}
	}
	const allFieldsPopulated = investors.every((investor) => {
		return (
			investor.name.trim() !== '' && investor.code.trim() !== '' && investor.sharePercentage > 0
		);
	});
	if (!allFieldsPopulated) {
		return false;
	}
	return true;
};
