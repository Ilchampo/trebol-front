<script lang="ts">
    import type {IPageResponse} from './+page.server';
    export let data: IPageResponse;
</script>

{#each data.companies as company}
    {company.name}
{/each}