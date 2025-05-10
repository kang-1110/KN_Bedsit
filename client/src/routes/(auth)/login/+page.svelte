<script lang="ts">
	import { Section, Register } from 'flowbite-svelte-blocks';
	import { Button, Checkbox, Label, Input, Spinner } from 'flowbite-svelte';
	import { APP_ROUTES } from '$lib/constants/routes';
	import { enhance } from '$app/forms';
	import { useLogin } from '$lib/hooks/useAuth';

    const loginMutation = useLogin();

    const handleSubmit = (event: Event) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const username = formData.get('username');
        const password = formData.get('password');
        $loginMutation.mutate({
            username: username as string,
            password: password as string
        });
    }

</script>

<Section name="login">
	<Register>
		{#snippet top()}
			<img class="mr-2 h-8 w-8" src="/src/lib/images/svelte-logo.svg" alt="logo" />
			Nhà Trọ
		{/snippet}
		<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
			<form 
                class="flex flex-col space-y-6" 
                on:submit={handleSubmit}
            >
				<h3 class="p-0 text-xl font-medium text-gray-900 dark:text-white">Login</h3>
				<Label class="space-y-2">
					<span>Username</span>
					<Input type="text" name="username" placeholder="Username" required />
				</Label>
				<Label class="space-y-2">
					<span>Password</span>
					<Input type="password" name="password" placeholder="•••••" required />
				</Label>
				<Button type="submit" class="w-full" disabled={$loginMutation.isPending}>
                    {#if $loginMutation.isPending}
                        <Spinner />
                    {:else}
                        Login
                    {/if}
                </Button>
				<!-- <div class="flex items-start">
					<Checkbox>Remember me</Checkbox>
					<a href={APP_ROUTES.FORGOT_PASSWORD} class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Forgot password?</a>
				</div> -->
				<p class="text-sm font-light text-gray-500 dark:text-gray-400">
					Don’t have an account yet? <a href={APP_ROUTES.SIGNUP} class="text-primary-600 dark:text-primary-500 font-medium hover:underline">Sign up</a>
				</p>
			</form>
		</div>
	</Register>
</Section>