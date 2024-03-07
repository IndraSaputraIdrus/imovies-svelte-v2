<script lang="ts">
	const { data } = $props();
	const result = $derived(data.result);
</script>

<div class="mx-auto max-w-xl px-5 py-10">
	<h1 class="text-3xl font-semibold">{result.title}</h1>
	<div class="mt-5 space-y-5">
		<ul class="space-y-3">
			{#each result?.episodeList as item}
				<li>
					<a class="cursor-pointer text-indigo-600 hover:text-indigo-200" href="episode/{item.link}"
						>Season - {item.season} - Episode - {item.episode}</a
					>
				</li>
			{/each}
		</ul>
	</div>
</div>
