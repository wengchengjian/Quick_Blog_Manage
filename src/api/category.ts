import request from "@/utils/request"
import {
  QueryCategoryListByNameRequest, QueryCategoryListRequest,
  DeleteCategoryRequest, SaveCategoryByParentRequest,
  UpdateCategoryByIdRequest,
  Category
} from "@/types/category"

export const queryCategoryListByName = async (params: QueryCategoryListByNameRequest) => await request.get("/api/admin/operation/category/listByName", params);

export const queryCategoryList = async (params: QueryCategoryListRequest) => await request.get("/api/admin/operation/category/list", params);


export const queryCategoryById = async (id: number) => await request.get(`/api/admin/operation/category/info/${id}` as any)  as Category;


export const deleteBatchById = async (params: DeleteCategoryRequest) =>await request.delete("/api/admin/operation/category/delete", params);


export const updateCategoryById = async (params: UpdateCategoryByIdRequest) => await request.put("/api/admin/operation/category/update", params);

export const saveCategoyByParent = async (params: SaveCategoryByParentRequest) => await request.post("/api/admin/operation/category/save", params);

