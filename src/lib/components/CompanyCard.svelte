<script lang="ts">
	import type { ICompanyDTO } from '$lib/interfaces/company.interface';
	import { goto } from '$app/navigation';

	export let company: ICompanyDTO;
</script>

<div class="card flex items-center variant-soft-secondary p-4 justify-between">
	<span> <b>{company.code}</b> | {company.name}</span>
	<button
		type="button"
		class="btn variant-filled-primary"
		on:click={() => goto(`/owners/${company.id}`)}>Ver Propietarios Reales</button
	>
</div>
