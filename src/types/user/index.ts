import { Role } from "@/types/role"
import { BaseResponse } from "@/types/BaseResponse";

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

export interface UserLoginResponse extends BaseResponse {
  data: string;
}

export interface UserInfoRequest {

}
export interface UserInfoResponse extends BaseResponse {
  data: User;
}

export interface UserListPageRequest {
  pageNum?: number;
  pageSize?: number;
  userName?: number;
}

export interface UserListPageResponse extends BaseResponse {
  data: {
    totalCount: number;
    pageSize: number;
    totalPage: number;
    currentPage: number;
    list: User[];
  }
}

export interface UserUpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface UserUpdatePasswordResponse extends BaseResponse {
  data: null;
}

export type User = {
  userId: number;
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