<script lang="ts">
	import { APP_ROUTES } from '$lib/constants/routes';
	import { Navbar, NavBrand, NavHamburger, NavUl, NavLi, Button } from 'flowbite-svelte';
	import { userStore } from '$lib/stores/userStore';
	import type { User } from '$lib/types/userType';
	import { deleteCookie } from '$lib/utils/cookie';
	import { STORAGES } from '$lib/constants/storage';
	import { goto } from '$app/navigation';

	$: console.log('userStore changed:', $userStore);

	const handleLogout = () => {
		deleteCookie(STORAGES.USER_INFO);
		deleteCookie(STORAGES.ACCESS_TOKEN);
		userStore.set(null);
		goto(APP_ROUTES.LOGIN);
	}
</script>

<header>
	<Navbar>
		<NavBrand href="/">
			<img src="/src/lib/images/svelte-logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
			<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"> Nhà Trọ </span>
		</NavBrand>
		<div class="flex items-center gap-3 lg:order-2">
			{#if $userStore}
				<p>Hello {$userStore.username}</p>
				<Button color="red" onclick={handleLogout}>Log out</Button>
			{:else}
				<Button href={APP_ROUTES.LOGIN} color="dark">Log in</Button>
			{/if}
			<NavHamburger />
		</div>
		<NavUl>
			<NavLi href="/">Home</NavLi>
			<NavLi href="/">Company</NavLi>
			<NavLi href="/">Marketplace</NavLi>
			<NavLi href="/">Features</NavLi>
			<NavLi href="/">Team</NavLi>
			<NavLi href="/">Contact</NavLi>
		</NavUl>
	</Navbar>
</header>