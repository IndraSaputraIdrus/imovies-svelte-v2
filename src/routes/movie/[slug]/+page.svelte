<script lang="ts">
	import { page } from '$app/stores';
	import { titleFromSlug } from '$lib/parse';
	const { data } = $props();
	const result = $derived(data.result);
</script>

<div class="mx-auto max-w-xl px-5 py-10">
	<h1 class="text-3xl font-semibold">{titleFromSlug($page.params.slug)}</h1>
	<div class="mt-5 space-y-5">
		<ul class="space-y-3">
			{#each result as item}
				<li>
					<a class="cursor-pointer text-indigo-600 hover:text-indigo-200" href={item.stream}
						>{item.text}</a
					>
				</li>
			{/each}
		</ul>
	</div>
</div>
