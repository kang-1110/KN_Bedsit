<script lang="ts">
	import { Section, Register } from 'flowbite-svelte-blocks';
	import { Button, Checkbox, Label, Input, Radio } from 'flowbite-svelte';
	import { APP_ROUTES } from '$lib/constants/routes';

    // state để bind với nhóm radio
  let selectedRole: 'role1' | 'role2' | 'role3' = 'role1';
</script>

<Section name="register">
	<Register href="/">
		{#snippet top()}
			<img class="mr-2 h-8 w-8" src="/src/lib/images/svelte-logo.svg" alt="logo" />
			Nhà Trọ
		{/snippet}
		<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
			<form class="flex flex-col space-y-6" action="/">
				<h3 class="p-0 text-xl font-medium text-gray-900 dark:text-white">Create account</h3>
				<Label class="space-y-2">
					<span>Username</span>
					<Input type="text" name="username" placeholder="Username" required />
				</Label>
				<Label class="space-y-2">
					<span>Phone</span>
					<Input type="number" name="phone" placeholder="Phone" required />
				</Label>
				<Label class="space-y-2">
					<span>Your password</span>
					<Input type="password" name="password" placeholder="•••••" required />
				</Label>
				<!-- <Label class="space-y-2">
					<span>Confirm password</span>
					<Input type="password" name="confirm-password" placeholder="•••••" required />
				</Label> -->
				<!-- Nhóm radio buttons thay cho checkbox -->
                <div class="space-y-2">
                    <Label>Chọn vai trò</Label>
                    <div class="flex flex-row space-x-2">
                      <Label class="inline-flex items-center cursor-pointer w-fit border-2 border-gray-300 rounded-md p-2">
                        <Radio name="role" value="role1" bind:group={selectedRole} required />
                        <span class="ml-2">Role 1</span>
                      </Label>
                      <Label class="inline-flex items-center cursor-pointer w-fit border-2 border-gray-300 rounded-md p-2">
                        <Radio name="role" value="role2" bind:group={selectedRole} required />
                        <span class="ml-2">Role 2</span>
                      </Label>
                      <Label class="inline-flex items-center cursor-pointer w-fit border-2 border-gray-300 rounded-md p-2">
                        <Radio name="role" value="role3" bind:group={selectedRole} required />
                        <span class="ml-2">Role 3</span>
                      </Label>
                    </div>
                </div>
				<Button type="submit" class="w-full1">Create an account</Button>
				<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
					Already have an account? <a href={APP_ROUTES.LOGIN} class="text-primary-600 dark:text-primary-500 font-medium hover:underline">Login here</a>
				</div>
			</form>
		</div>
	</Register>
</Section>