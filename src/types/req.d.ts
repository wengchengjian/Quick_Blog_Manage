import { UserLoginRequest, UserInfoRequest, UserListPageRequest, UserUpdatePasswordRequest } from "@/types/user"
import { MenuNavListRequest } from "@/types/menu";
export interface CommRequest {
  "/api/login": UserLoginRequest,
  "/api/admin/sys/user/info": UserInfoRequest,
  "/api/admin/sys/user/list": UserListPageRequest,
  "/api/admin/sys/user/password": UserUpdatePasswordRequest,
  "/api/admin/sys/menu/nav": MenuNavListRequest,
  "/api/logout":null,
} 