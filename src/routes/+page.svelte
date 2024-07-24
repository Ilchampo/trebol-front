<script lang="ts">
	import type { IPageResponse } from './+page.server';
	import ClientCard from '$lib/components/ClientCard.svelte';
	import Loader from '$lib/components/Loader.svelte';

	export let data: IPageResponse;

	let isLoading = data.loading ?? true;
</script>

{#if isLoading}
	<Loader />
{:else}
	<div class="flex flex-col h-full w-full gap-4">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			{#each data.clients as client}
				<ClientCard {client} />
			{/each}
		</div>
	</div>
{/if}
