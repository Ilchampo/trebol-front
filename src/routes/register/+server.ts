import { saveCompanyInvestors } from '$lib/api/investor.api';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const { clientId, company, investors } = await request.json();
	const response = await saveCompanyInvestors(clientId, company, investors);

	return json({ response });
}
