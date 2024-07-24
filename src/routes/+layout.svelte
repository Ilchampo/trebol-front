<script lang="ts">
	import '../app.postcss';

	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { AppShell, storePopup } from '@skeletonlabs/skeleton';

	import Header from '$lib/components/Header.svelte';
	import Sidenav from '$lib/components/Sidenav.svelte';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<div class="flex flex-col h-screen w-screen">
	<AppShell>
		<svelte:fragment slot="header"><Header /></svelte:fragment>
		<svelte:fragment slot="sidebarLeft"><Sidenav /></svelte:fragment>
		<div class="flex flex-col justify-center items-center w-full h-full p-4">
			<slot />
		</div>
	</AppShell>
</div>
