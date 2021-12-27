export type BaseResponse<T> = T

export interface BasePageResponseData<T> {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPage: number;
  list: T[];
}

export interface BasePageResponse<T> extends BaseResponse<BasePageResponseData<T>> {

}