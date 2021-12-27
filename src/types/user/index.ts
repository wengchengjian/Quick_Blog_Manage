import { Role } from "@/types/role"
import { BaseResponse, BasePageResponse } from "@/types/BaseResponse";

export interface Authority {
  authority: string;
}
export interface Permission {
  id: number;
  name: string;
  parentId: number;
  menuId: number;
}
export interface UserLoginRequest {
  username: string;
  password: string;
}

export type UserLoginResponse = BaseResponse<string>

export interface UserInfoRequest {

}
export interface UserInfoResponse extends BaseResponse<User> {
}

export interface UserListPageRequest {
  pageNum?: number;
  pageSize?: number;
  userName?: number;
}



export type UserListPageResponse = BasePageResponse<User>

export interface UserUpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export type UserUpdatePasswordResponse = BaseResponse<null>

export type User = {
  id: number;
  username: string;
  application: string;
  email: string;
  createUserId: number;
  createTime: Date;
  locked: number;
  enabled: number;
  accountExpired: number;
  deleted: number;
  passwordExpired: number;
  roleList: Role[];
}