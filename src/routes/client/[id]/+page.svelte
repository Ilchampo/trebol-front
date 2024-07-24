<script lang="ts">
	import type { IPageResponse } from './+page.server';
	import { goto } from '$app/navigation';

	export let data: IPageResponse;
</script>

<div class="flex flex-col w-full h-full">
	{#if data}
		<div class="flex flex-col gap-4 card variant-soft-secondary p-4 shadow-xl">
			<div class="flex gap-2 items-center">
				<img
					src={data.client?.logoUrl}
					alt={data.client?.name}
					class="h-16 w-16 rounded-tl-xl rounded-br-xl"
				/>
				<h2 class="h2">{data.client?.name}</h2>
			</div>
			<hr />
			<div class="card flex flex-col p-4 variant-soft-secondary gap-4">
				<h3 class="h3">Configuracion de {data.client?.name}</h3>
				<div class="table-container table-compact">
					<table class="table">
						<thead>
							<tr>
								<th>Minimo numero de niveles</th>
								<th>Minimo porcentaje de busqueda</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{data.client?.maxInvestorLevels} Niveles</td>
								<td>{data.client?.minSearchPercentage} %</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div class="flex gap-2 w-full items-center justify-end">
				<button
					class="btn btn-filled variant-filled-secondary"
					on:click={() => goto(`/register/${data.client?.id ?? 0}`)}>Registrar Empresa</button
				>
				<button
					class="btn btn-filled variant-filled-primary"
					on:click={() => goto(`/client/${data.client?.id ?? 0}/company`)}
					>Ver todas las Empresas</button
				>
			</div>
		</div>
	{/if}
</div>
