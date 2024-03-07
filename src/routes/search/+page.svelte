<script lang="ts">
	import { goto } from '$app/navigation';
	import { page, navigating } from '$app/stores';
	import CardList from '$lib/components/CardList.svelte';
	import NotFound from '$lib/components/NotFound.svelte';

	let { data } = $props();
	let result = $derived(data.result ? data.result : []);
	let query = $state($page.url.searchParams.get('q') ?? '');

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key !== 'Enter') return;
		goto(`?q=${query}`);
	}
</script>

<div class="mx-auto max-w-xl px-5 py-10">
	<input
		onkeydown={handleKeyDown}
		type="text"
		class="w-full rounded border-2 border-orange-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2"
		bind:value={query}
	/>

	<div class="grid grid-cols-4 gap-6 pt-10">
		{#await $navigating?.complete}
			<p class="col-span-4 text-center w-full">Loading....</p>
		{:then}
			{#if result.length < 1 && query}
				<NotFound />
			{:else}
				<CardList {result} />
			{/if}
		{/await}
	</div>
</div>
