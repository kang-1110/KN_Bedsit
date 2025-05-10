import { APP_ROUTES } from '$lib/constants/routes';
import { STORAGES } from '$lib/constants/storage';
import { decryptServerCookie } from '$lib/server/crypto';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
// import { getCookie } from '$lib/utils/cookie';

// Disable server side rendering để lấy data từ cookie
// export const csr = true;
// export const prerender = false;
// export const ssr = false;

// export const load: LayoutLoad = async () => {
//   const user = getCookie(STORAGES.USER_INFO)

//   return { user }
// }

export const load: LayoutServerLoad = async ({ cookies, url }) => {
  const encrypted = cookies.get(STORAGES.USER_INFO);
  const token = cookies.get(STORAGES.ACCESS_TOKEN);
  const path  = url.pathname;

  const publicRoutes = [APP_ROUTES.LOGIN, APP_ROUTES.SIGNUP];

  if(token && publicRoutes.includes(path as APP_ROUTES)) {
    throw redirect(303, APP_ROUTES.HOME);
  }

  let user = null;

  if (encrypted) {
    user = decryptServerCookie(encrypted);
  }

  return {
    user
  };
};
