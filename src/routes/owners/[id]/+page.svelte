<script lang="ts">
	import type { ICompanyRealOwnersDTO } from '$lib/interfaces/investor.interface';
	import type { ICompanyDTO } from '$lib/interfaces/company.interface';

	import RealOwnerTable from '$lib/components/RealOwnerTable.svelte';
	import CompanyBanner from '$lib/components/CompanyBanner.svelte';

	export let data: {
		company: ICompanyDTO;
		realOwners: ICompanyRealOwnersDTO[];
	};
</script>

<div class="flex flex-col w-full h-full">
	{#if data}
		<div class="flex flex-col gap-4 card variant-soft-secondary p-4 shadow-xl">
			<CompanyBanner company={data.company} />
			<RealOwnerTable realOwners={data.realOwners} />
		</div>
	{/if}
</div>
