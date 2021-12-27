import { Tag } from "../tag";
import { BaseResponse,BasePageResponse } from "@/types/BaseResponse";

export interface Article {
  id: string;
  title: string;
  author: string;
  description: string;
  content: string;
  cover: string;
  publish: boolean;
  coverType: number;
  recommend: boolean;
  top: boolean;
  contentFormat: string;
  tagList: Tag[]
  categoryId: string;
  categoryList: string;
  readNum: number;
  likeNum: number;
  createTime: number;
  updateTime: number;
}

export interface ArticleListRequest {
  title?: string;
  author?: string;
  top?: boolean;
  recommend?: boolean;
  publish?: boolean;
  pageNum?: number;
  pageSize?: number;
  startTime?: string;
  endTime?: string;
}


export interface ArticleListResponse extends BasePageResponse<Article> {

}