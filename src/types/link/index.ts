
import { BasePageResponse, BaseResponse } from "@/types/BaseResponse";
import { BasePageRequest } from "../BaseRequest";

export type Link = {
  id: number;
  title: string;
  url: string;
  avatar: string;
}

export interface QueryLinkListPageRequest extends BasePageRequest {
  title?: string;
}

export interface QueryLinkListPageResponse extends BasePageResponse<Link> {

}

export interface SaveLinkRequest {
  title: string;
  url: string;
  avatar: string;
}
export type SaveLinkResponse = BaseResponse<null>

export interface UpdateLinkRequest {
  id: number;
  title?: string;
  url?: string;
  avatar?: string;
}

export type UpdateLinkResponse = BaseResponse<null>

export type DeleteLinkRequest = number[];

export type DeleteLinkResponse = BaseResponse<null> 