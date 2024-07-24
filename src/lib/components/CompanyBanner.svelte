<script lang="ts">
	import type { ICompanyDTO } from '$lib/interfaces/company.interface';

	export let company: ICompanyDTO;
</script>

<div class="flex flex-col w-full gap-2">
	<h3 class="h3 uppercase">{company.name}</h3>
	<span>{company.code}</span>
</div>
