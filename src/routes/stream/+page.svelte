<script lang="ts">
	import { page } from '$app/stores';
	import { redirect } from '@sveltejs/kit';

	let url = $state($page.url.searchParams.get('url'));

	if (!url) {
		throw redirect(303, '/');
	}

	const src = $state(atob(url));
</script>

<div class="min-h-screen bg-[url(/loader.gif)] bg-[length:50px_50px] bg-center bg-no-repeat">
	<iframe
		class="min-h-dvh w-full"
		frameborder="0"
		allowfullscreen={true}
		sandbox="allow-scripts allow-same-origin"
		title="stream"
		{src}
	/>
</div>
