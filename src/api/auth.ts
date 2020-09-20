// 注登销
import request from "@/helpers/request";

export function login(data: { username: string; password: string }) {
  return request({ url: "/auth/login", data });
}
export function logout() {
  return request({ url: "/auth/logout", method: "get" });
}
export function getUserinfo() {
  return request({ url: "/auth/userinfo", method: "get" });
}
