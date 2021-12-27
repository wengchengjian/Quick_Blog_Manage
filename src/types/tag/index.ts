import { BaseResponse, BasePageResponse } from "@/types/BaseResponse";


export interface Tag {
  id: number;
  name: string;
  type: number;
}

export interface QueryTagListRequest {
  name?: string;
  type?: number;
  pageNum?: number;
  pageSize?: number;
}

export interface QueryTagListResponse extends BasePageResponse<Tag> {

}

export interface SaveTagRequest {
  name: string;
  type: number;
}

export interface DeleteTagRequest extends Tag {

}

export interface UpdateTagRequest extends Tag {

}