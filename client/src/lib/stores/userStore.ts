
import type { User } from "$lib/types/userType";
import { writable } from "svelte/store";

export const userStore = writable<User | null>(null);