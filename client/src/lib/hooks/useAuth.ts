import { createMutation } from "@tanstack/svelte-query";
import { login } from "$lib/api/authApi";
import type { AxiosError } from "axios";
import { toastStore } from "$lib/stores/toastStore";
import { userStore } from "$lib/stores/userStore";
import { setCookie } from "$lib/utils/cookie";
import { STORAGES } from "$lib/constants/storage";
import { goto } from "$app/navigation";
import { APP_ROUTES } from "$lib/constants/routes";
import type { ResponseType } from "$lib/types/responseType";
import type { User } from "$lib/types/userType";

export const useLogin = () => {
    return createMutation({
        mutationFn: login,
        onSuccess: (data: ResponseType<{ user: User, access_token: string }>) => {
            console.log(data);
            setCookie(STORAGES.USER_INFO, data.results.object.user)
            setCookie(STORAGES.ACCESS_TOKEN, data.results.object.access_token, { secure: true });
            userStore.set(data.results.object.user);
            goto(APP_ROUTES.HOME);
        },
        onError: (error: AxiosError<{ errorId: string }>) => {
            console.log(error.response?.data?.errorId);
            toastStore.set({
                id: Date.now().toString(),
                message: "Login failed",
                color: "red"
            });
        }
    })
}