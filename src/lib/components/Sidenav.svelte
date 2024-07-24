<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<div
	class="flex flex-col h-full bg-surface-100 dark:bg-surface-700 overflow-y-scroll p-2 shadow-xl w-auto md:w-42 gap-4"
>
	<hr class="w-full" />
	<button
		type="button"
		class="btn variant-ringed-secondary dark:variant-ringed-primary w-full tracking-wider gap-2"
		on:click={() => goto('/')}>💼 <span class="hidden md:inline">Clientes</span></button
	>
	<hr class="w-full" />
</div>
