<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
</script>

<AppBar shadow="shadow-xl" background="bg-secondary-500 dark:bg-surface-800">
	<svelte:fragment slot="lead">
		<span
			class="bg-gradient-to-br from-red-100 to-yellow-200 bg-clip-text text-transparent box-decoration-clone font-bold uppercase"
			>🍀 Trebol</span
		>
	</svelte:fragment>
	<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
</AppBar>
