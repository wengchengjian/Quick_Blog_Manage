import { UserLoginResponse, UserInfoResponse, UserListPageResponse, UserUpdatePasswordResponse } from "@/types/user"
import { MenuNavListResponse } from "@/types/menu";
import { ArticleListResponse } from "@/types/article";
import { QueryTagListResponse } from "@/types/tag";
import { BaseResponse } from "@/types/BaseResponse";
import { QueryCategoryListByNameResponse, QueryCategoryListResponse, UpdateCategoryByIdResponse, SaveCategoryByParentResponse, DeleteCategoryResponse } from "@/types/category"
import { QueryLinkListPageResponse, SaveLinkResponse, UpdateLinkResponse, DeleteLinkResponse } from "@/types/link";


export interface CommResponse {
  "/api/login": UserLoginResponse,
  "/api/admin/sys/user/info": UserInfoResponse,
  "/api/admin/sys/user/list": UserListPageResponse,
  "/api/admin/sys/user/password": UserUpdatePasswordResponse,
  "/api/admin/sys/menu/nav": MenuNavListResponse,
  "/api/logout": BaseResponse<null>,
  "/api/admin/article/list": ArticleListResponse,
  "/api/admin/operation/tag/list": QueryTagListResponse,
  "/api/admin/operation/tag/save": BaseResponse<null>,
  "/api/admin/operation/tag/delete": BaseResponse<null>,
  "/api/admin/operation/tag/update": BaseResponse<null>,
  "/api/admin/operation/category/listByName": QueryCategoryListByNameResponse,
  "/api/admin/operation/category/list": QueryCategoryListResponse,
  "/api/admin/operation/category/delete": DeleteCategoryResponse
  "/api/admin/operation/category/update": UpdateCategoryByIdResponse,
  "/api/admin/operation/category/save": SaveCategoryByParentResponse,
  "/api//admin/operation/link/list": QueryLinkListPageResponse
  "/api//admin/operation/link/save": SaveLinkResponse
  "/api//admin/operation/link/update": UpdateLinkResponse
  "/api//admin/operation/link/delete": DeleteLinkResponse


}