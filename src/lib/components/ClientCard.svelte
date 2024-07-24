<script lang="ts">
	import type { IClientDTO } from '$lib/interfaces/client.interface';
	import { goto } from '$app/navigation';

	export let client: IClientDTO;

	const handleClick = (): void => {
		goto(`client/${client.id}`);
	};
</script>

<div class="card flex card-hover variant-soft-secondary p-4 justify-between items-center">
	<div class="flex items-center gap-2">
		<img src={client.logoUrl} alt={client.name} class="w-16 h-16 rounded-tl-xl rounded-br-xl" />
		<span class="font-semibold text-xl">{client.name}</span>
	</div>
	<button type="button" class="btn variant-filled-primary" on:click={handleClick}> Ver mas </button>
</div>
