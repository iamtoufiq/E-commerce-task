import Cookies from "js-cookie";

export const setCookie = (key: string, value: string, days: number = 1) => {
  Cookies.set(key, value, { expires: days });
};

export const getCookie = (key: string): string | undefined => {
  return Cookies.get(key);
};

export const deleteCookie = (key: string) => {
  Cookies.remove(key);
};
