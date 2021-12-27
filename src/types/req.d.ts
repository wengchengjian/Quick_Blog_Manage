import { UserLoginRequest, UserInfoRequest, UserListPageRequest, UserUpdatePasswordRequest } from "@/types/user"
import { MenuNavListRequest } from "@/types/menu";
import { ArticleListRequest } from "@/types/article";
import { QueryTagListRequest, SaveTagRequest, DeleteTagRequest, UpdateTagRequest } from "@/types/tag";
import { QueryCategoryListByNameRequest, QueryCategoryListRequest, DeleteCategoryRequest, SaveCategoryByParentRequest, UpdateCategoryByIdRequest } from "@/types/category"
import { QueryLinkListPageRequest, SaveLinkRequest, UpdateLinkRequest, DeleteLinkRequest } from "@/types/link";

export interface CommRequest {
  "/api/login": UserLoginRequest,
  "/api/admin/sys/user/info": UserInfoRequest,
  "/api/admin/sys/user/list": UserListPageRequest,
  "/api/admin/sys/user/password": UserUpdatePasswordRequest,
  "/api/admin/sys/menu/nav": MenuNavListRequest,
  "/api/logout": null,
  "/api/admin/article/list": ArticleListRequest,
  "/api/admin/operation/tag/list": QueryTagListRequest,
  "/api/admin/operation/tag/save": SaveTagRequest,
  "/api/admin/operation/tag/delete": DeleteTagRequest,
  "/api/admin/operation/tag/update": UpdateTagRequest,
  "/api/admin/operation/category/listByName": QueryCategoryListByNameRequest,
  "/api/admin/operation/category/list": QueryCategoryListRequest,
  "/api/admin/operation/category/delete": DeleteCategoryRequest
  "/api/admin/operation/category/update": UpdateCategoryByIdRequest,
  "/api/admin/operation/category/save": SaveCategoryByParentRequest,
  "/api//admin/operation/link/list": QueryLinkListPageRequest
  "/api//admin/operation/link/save": SaveLinkRequest
  "/api//admin/operation/link/update": UpdateLinkRequest
  "/api//admin/operation/link/delete": DeleteLinkRequest
} 