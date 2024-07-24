<script lang="ts">
	import type { IInvestorDTO } from '$lib/interfaces/investor.interface';
	import type { IPageResponse } from './+page.server';

	import {
		calculateLevels,
		getEmptyInvestorValue,
		validateInvestorLevel,
		validatePercentageAdded,
		validateSubinvestorInformation
	} from '$lib/utils/registerForm.utils';
	import { investors } from '$lib/stores/investors.store';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import Icon from '$lib/components/Icon.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import RegisterClientBanner from '$lib/components/RegisterClientBanner.svelte';
	import RegisterInformation from '$lib/components/RegisterInformation.svelte';

	export let data: IPageResponse;

	const clientId = data.client?.id ?? parseInt($page.params.id);

	let isLoading = data.loading ?? true;
	let companyName = '';
	let companyCode = '';
	let currentLevel = 0;

	onMount(() => {
		investors.update(() => [
			{
				id: 0,
				companyId: clientId,
				sharePercentage: 0,
				name: '',
				code: '',
				type: 'person',
				parentInvestorId: null
			}
		]);
	});

	const addNewInvestor = (): void => {
		investors.update((current) => {
			const updatedInvestors = [
				...current,
				getEmptyInvestorValue(
					undefined,
					undefined,
					$investors[$investors.length - 1]?.id + 1,
					clientId
				)
			];
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
			const newSubInvestor = getEmptyInvestorValue(
				undefined,
				parentInvestor.id,
				$investors[$investors.length - 1]?.id + 1,
				clientId
			);
			const updatedInvestors = [...current, newSubInvestor];
			currentLevel = calculateLevels(updatedInvestors);
			return updatedInvestors;
		});
	};

	const validateForm = (): boolean => {
		if (companyCode.length <= 0 || companyName.length <= 0) {
			return false;
		}

		if (
			!validateInvestorLevel($investors, currentLevel, data.client?.maxInvestorLevels ?? 100) ||
			!validatePercentageAdded($investors, data.client?.minSearchPercentage ?? 0) ||
			!validateSubinvestorInformation($investors)
		) {
			return false;
		}

		return true;
	};

	const onClickSaveCompany = async (): Promise<void> => {
		const isValidForm = validateForm();

		if (!isValidForm) {
			alert('Error en validacion de datos!');
			return;
		}

		isLoading = true;

		const company = {
			name: companyName,
			code: companyCode
		};

		try {
			await fetch(`/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ clientId, company, investors: $investors })
			});

			isLoading = false;

			goto('/');
		} catch (error) {
			throw error;
		}
	};
</script>

{#if isLoading}
	<Loader />
{:else}
	<div class="flex flex-col h-full w-full">
		<div class="card p-4 variant-soft-secondary flex flex-col gap-4">
			<RegisterClientBanner logoUrl={data.client?.logoUrl} name={data.client?.name} />
			<RegisterInformation
				{currentLevel}
				maxInvestorLevels={data?.client?.maxInvestorLevels}
				minSearchPercentage={data?.client?.minSearchPercentage}
			/>
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
