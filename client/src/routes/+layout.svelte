<script lang="ts">
	import Header from '../lib/components/Header.svelte';
	import '../app.css';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { toastStore } from '$lib/stores/toastStore';
	import { Toast } from 'flowbite-svelte';
	import { ExclamationCircleSolid } from 'flowbite-svelte-icons';
	import { userStore } from '$lib/stores/userStore';
	import { get } from 'svelte/store';
	import type { User } from '$lib/types/userType';
	
	const queryClient = new QueryClient();

	export let data: { user: User };

	$: if (get(userStore) === null && data.user) {
		userStore.set(data.user);
	}
	
</script>

<QueryClientProvider client={queryClient}>
	{#if $toastStore.message}
		{#key $toastStore.id}
			<div class="fixed top-3 right-1/2 translate-x-1/2">
				<Toast color={$toastStore.color}>
					{#snippet icon()}
						<ExclamationCircleSolid class="h-5 w-5" />
						<span class="sr-only">Warning icon</span>
					{/snippet}
					{$toastStore.message}
				</Toast>
			</div>
		{/key}
	{/if}
	<div class="app">
		<Header />
	
		<slot />
	</div>
</QueryClientProvider>




