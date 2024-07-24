<script lang="ts">
	export let currentLevel: number;
	export let maxInvestorLevels: number | null | undefined;
	export let minSearchPercentage: number | null | undefined;
</script>

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
					<td>{maxInvestorLevels} Niveles</td>
					<td
						>{currentLevel === 0 ? 1 : currentLevel}
						{currentLevel === 1 || currentLevel + 1 === 1 ? 'Nivel' : 'Niveles'}</td
					>
					<td>{minSearchPercentage} %</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
