<script lang="ts">
	export let logoUrl: string | undefined | null;
	export let name: string | undefined | null;
</script>

<div class="flex gap-2">
	<img src={logoUrl} alt={name} class="w-10 h-10 rounded-tl-xl rounded-br-xl" />
	<h2 class="h2">Registrar Empresa en {name}</h2>
</div>
