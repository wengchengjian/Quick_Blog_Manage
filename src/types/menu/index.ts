import { BaseResponse } from "@/types/BaseResponse";

export interface Menu {
  id: number;
  parentId: number;
  name: string;
  url: string;
  type: number;
  icon: string;
}

export interface MenuItem extends Menu {
  children: MenuItem[];
}

export interface MenuNavListRequest {

}

export type MenuNavListResponseData = Menu[];

export interface MenuNavListResponse extends BaseResponse<MenuNavListResponseData> {
}