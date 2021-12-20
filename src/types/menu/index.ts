import { BaseResponse } from "@/types/BaseResponse";

export interface Menu {
  menuId: number;
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

export interface MenuNavListResponse extends BaseResponse {
  data: Menu[]
}