import { UserLoginResponse, UserInfoResponse, UserListPageResponse, UserUpdatePasswordResponse } from "@/types/user"
import { MenuNavListResponse } from "@/types/menu";
export interface CommResponse {
  "/api/login": UserLoginResponse,
  "/api/admin/sys/user/info": UserInfoResponse,
  "/api/admin/sys/user/list": UserListPageResponse,
  "/api/admin/sys/user/password": UserUpdatePasswordResponse,
  "/api/admin/sys/menu/nav": MenuNavListResponse,
  "/api/logout": null,
}