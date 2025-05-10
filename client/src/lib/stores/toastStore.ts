
import { writable } from "svelte/store";

type ToastData = {
    id: string;
    message: string;
    color: "red" | "green" | undefined;
}

export const toastStore = writable<ToastData>({
    id: "",
    message: "",
    color: undefined
});