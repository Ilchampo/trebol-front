<script lang="ts">
	import type { IFileDTO } from '$lib/interfaces/file.interface';
	import type { ICompanyRealOwnersDTO } from '$lib/interfaces/investor.interface';

	export let realOwners: ICompanyRealOwnersDTO[];

	const handleDownload = (file: IFileDTO, user: string): void => {
		const { fileData, fileType } = file;
		const fileName =
			user.toLowerCase().replace(/\s+/g, '-') + (fileType === 'PDF' ? '.pdf' : '.png');

		const byteCharacters = atob(fileData.data.toString());
		const byteNumbers = new Array(byteCharacters.length);
		for (let i = 0; i < byteCharacters.length; i++) {
			byteNumbers[i] = byteCharacters.charCodeAt(i);
		}
		const byteArray = new Uint8Array(byteNumbers);

		const blob = new Blob([byteArray], {
			type: fileType === 'PDF' ? 'application/pdf' : 'image/png'
		});

		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = fileName;
		link.click();

		URL.revokeObjectURL(link.href);
	};
</script>

<div class="table-container table-compact">
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Nombre</th>
				<th>Codigo</th>
				<th>Porcentaje</th>
				<th>Archivo</th>
			</tr>
		</thead>

		<tbody>
			{#each realOwners as owner}
				<tr>
					<td>{owner.name}</td>
					<td>{owner.code}</td>
					<td>{owner.percentage} %</td>
					<td>
						<button
							class="btn variant-filled-primary text-xs"
							on:click={() => handleDownload(owner.file, owner.code)}
						>
							Descargar
						</button>
					</td>
				</tr>
			{/each}
		</tbody>

		<tfoot>
			<tr>
				<th colspan="3">Total Propietarios Reales</th>
				<td>{realOwners.length}</td>
			</tr>
		</tfoot>
	</table>
</div>
