<script lang="ts">
	import type { IInvestorDTO } from '$lib/interfaces/investor.interface';
	import type { IPageResponse } from './+page.server';

	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import Icon from '$lib/components/Icon.svelte';
	import Loader from '$lib/components/Loader.svelte';

	export let data: IPageResponse;

	let isLoading = data.loading ?? true;

	let companyName = '';
	let companyCode = '';
	let currentLevel = 0;

	const investors = writable<IInvestorDTO[]>([
		{
			id: 0,
			companyId: data.client?.id ?? parseInt($page.params.id),
			sharePercentage: 0,
			name: '',
			code: '',
			type: 'person',
			parentInvestorId: null
		}
	]);

	const getEmptyInvestorValue = (id?: number, subInvestor?: number): IInvestorDTO => ({
		id: id ?? $investors[$investors.length - 1]?.id + 1 ?? 0,
		companyId: data.client?.id ?? parseInt($page.params.id),
		sharePercentage: 0,
		name: '',
		code: '',
		type: 'person',
		parentInvestorId: subInvestor ?? null
	});

	const addNewInvestor = (): void => {
		investors.update((current) => {
			const updatedInvestors = [...current, getEmptyInvestorValue()];
			currentLevel = calculateLevels(updatedInvestors);
			return updatedInvestors;
		});
	};

	const removeNewInvestor = (index: number): void => {
		investors.update((current) => {
			const investorToRemove = current[index];

			const removeInvestorAndChildren = (
				investorId: number,
				investorList: IInvestorDTO[]
			): IInvestorDTO[] => {
				const childInvestors = investorList.filter(
					(investor) => investor.parentInvestorId === investorId
				);

				childInvestors.forEach((childInvestor) => {
					investorList = removeInvestorAndChildren(childInvestor.id, investorList);
				});

				return investorList.filter((investor) => investor.id !== investorId);
			};

			const updatedInvestors = removeInvestorAndChildren(investorToRemove.id, current);
			currentLevel = calculateLevels(updatedInvestors);
			return updatedInvestors;
		});
	};

	const addNewSubInvestor = (index: number): void => {
		investors.update((current) => {
			const parentInvestor = current[index];
			const newSubInvestor = getEmptyInvestorValue(undefined, parentInvestor.id);
			const updatedInvestors = [...current, newSubInvestor];
			currentLevel = calculateLevels(updatedInvestors);
			return updatedInvestors;
		});
	};

	const calculateLevels = (investors: IInvestorDTO[]): number => {
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

	const clientId = data.client?.id ?? parseInt($page.params.id);

	const saveInvestors = async () => {
		const company = {
			name: companyName,
			code: companyCode
		};

		try {
			const response = await fetch(`/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ clientId, company, investors: $investors })
			});

			goto('/');
		} catch (error) {
			throw error;
		}
	};

	const onClickSaveCompany = async (): Promise<any> => {
		await saveInvestors();
	};
</script>

{#if isLoading}
	<Loader />
{:else}
	<div class="flex flex-col h-full w-full">
		<div class="card p-4 variant-soft-secondary flex flex-col gap-4">
			<div class="flex gap-2">
				<img
					src={data.client?.logoUrl}
					alt={data.client?.name}
					class="w-10 h-10 rounded-tl-xl rounded-br-xl"
				/>
				<h2 class="h2">Registrar Empresa en {data.client?.name}</h2>
			</div>
			<div class="card">
				<div class="table-container table-compact">
					<table class="table">
						<thead>
							<tr>
								<th>Nivel minimo declarable</th>
								<th>Nivel actual declarado</th>
								<th>Porcentaje minimo de accionista</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{data.client?.maxInvestorLevels} Niveles</td>
								<td
									>{currentLevel === 0 ? 1 : currentLevel}
									{currentLevel === 1 || currentLevel + 1 === 1 ? 'Nivel' : 'Niveles'}</td
								>
								<td>{data.client?.minSearchPercentage} %</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="card flex p-4 gap-4">
				<div class="flex gap-2 w-full">
					<input
						class="input"
						title="Nombre"
						type="text"
						placeholder="Nombre"
						bind:value={companyName}
					/>
					<input
						class="input"
						title="Codigo"
						type="text"
						placeholder="Codigo"
						bind:value={companyCode}
					/>
				</div>
				<button
					type="button"
					class="btn-icon variant-filled-secondary"
					on:click={() => addNewInvestor()}><Icon name="add" /></button
				>
			</div>

			<div class="card flex flex-col p-4 gap-4">
				{#each $investors as investor, index}
					<div class="flex flex-col md:flex-row gap-2">
						<div
							class="flex w-full max-w-full md:max-w-32 bg-secondary-700 rounded-xl items-center justify-center overflow-hidden text-ellipsis"
						>
							<span class="text-xs">
								{#if investor.parentInvestorId !== null && typeof investor.parentInvestorId !== 'undefined'}
									{$investors[investor.parentInvestorId].code}
								{:else}
									{companyCode}
								{/if}
							</span>
						</div>
						<div class="flex flex-col md:flex-row gap-2 w-full">
							<input
								class="input"
								title="Nombre"
								type="text"
								placeholder="Nombre"
								bind:value={$investors[index].name}
							/>
							<input
								class="input"
								title="Codigo"
								type="text"
								placeholder="Codigo"
								bind:value={$investors[index].code}
							/>
							<input
								class="input"
								title="Porcentaje"
								type="number"
								placeholder="Porcentaje"
								max="100"
								min="0"
								bind:value={$investors[index].sharePercentage}
							/>
							<select class="select" bind:value={$investors[index].type}>
								<option value="person">Persona</option>
								<option value="company">Compania</option>
							</select>
							<input class="input" type="file" />
						</div>
						<div class="flex gap-2">
							<button
								type="button"
								class="btn-icon variant-filled-secondary"
								disabled={investor.type !== 'company'}
								on:click={() => addNewSubInvestor(index)}
							>
								<Icon name="add" />
							</button>
							<button
								type="button"
								class="btn-icon variant-filled-tertiary"
								on:click={() => removeNewInvestor(index)}
								disabled={$investors.length === 1}><Icon name="delete" /></button
							>
						</div>
					</div>
				{/each}
			</div>
			<div class="flex w-full justify-end items-center">
				<button class="btn variant-filled-primary w-64" on:click={() => onClickSaveCompany()}
					>Registrar</button
				>
			</div>
		</div>
	</div>
{/if}
