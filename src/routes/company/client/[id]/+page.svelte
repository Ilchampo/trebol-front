<script lang="ts">
	import type { IPageResponse } from './+page.server';
	import CompanyCard from '$lib/components/CompanyCard.svelte';

	export let data: IPageResponse;
</script>

<div class="flex flex-col w-full h-full">
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		{#each data.companies as company}
			<CompanyCard {company} />
		{/each}
	</div>
</div>
