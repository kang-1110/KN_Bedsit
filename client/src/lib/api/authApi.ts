import type { LoginData } from "$lib/types/authType";
import clientAxios from "$lib/client/clientAxios";

export const login = async (data:LoginData) => {
    const response = await clientAxios.post('/api/public/v1/auth/signin', data);
    return response.data;
}