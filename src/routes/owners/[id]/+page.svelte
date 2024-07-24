<script lang="ts">
	import type { ICompanyRealOwnersDTO } from '$lib/interfaces/investor.interface';
	import RealOwnerTable from '$lib/components/RealOwnerTable.svelte';
	import type { ICompanyDTO } from '$lib/interfaces/company.interface';
	import CompanyBanner from '$lib/components/CompanyBanner.svelte';

	export let data: {
		company: ICompanyDTO;
		realOwners: ICompanyRealOwnersDTO[];
	};
</script>

<div class="flex flex-col w-full h-full justify-center items-center">
	{#if data}
		<div class="flex flex-col gap-4 card variant-ringed-primary p-4 shadow-xl">
			<CompanyBanner company={data.company} />
			<RealOwnerTable realOwners={data.realOwners} />
		</div>
	{/if}
</div>
