import { BasePageResponse, BaseResponse } from "@/types/BaseResponse";
import { BasePageRequest } from "../BaseRequest";


export type Category = {
  id: number;
  name: string;
  parentId: number;
  createTime: Date;
  updateTime: Date;
}



export type DeleteCategoryRequest = number[];

export type DeleteCategoryResponse = BaseResponse<null>


export interface QueryCategoryListRequest extends BasePageRequest {
  name: string;
  parentId: number;
}

export interface QueryCategoryListByNameRequest {
  name: string;
}

export interface QueryCategoryListByNameResponse extends BaseResponse<Category[]> {

}

export interface QueryCategoryListResponse extends BasePageResponse<Category> {

}

export interface SaveCategoryByParentRequest {
  name: string;
  parentId: number;
}
export type SaveCategoryByParentResponse = BaseResponse<null>

export interface UpdateCategoryByIdRequest {
  id: number;
  name: string;
  parentId: number;
};
export type UpdateCategoryByIdResponse = BaseResponse<null> 