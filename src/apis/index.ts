import { serverApi } from "./core/server";
import { userApi } from "./core/user";

export const Api = {
    user: userApi,
    server: serverApi
}