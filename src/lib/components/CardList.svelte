<script lang="ts">
	import type { Movie } from '$lib/types';

	type Props = { result: Movie[] };

	let { result } = $props<Props>();
</script>

{#each result as item}
	{@const slug = `${item.type === 'tv' ? 'series' : 'movie'}/${item.slug}`}
	<div class="transition hover:opacity-80">
		<a href={slug} class="block">
			<img src={item.image} alt={item.title} class="w-full rounded shadow" />
		</a>
		<a href={slug} class="block">
			<h1 class="pt-3 text-center text-sm">{item.title}</h1>
		</a>
	</div>
{/each}
