import request from "@/utils/request";
import { QueryTagListRequest, SaveTagRequest, DeleteTagRequest, UpdateTagRequest } from "@/types/tag";
export const queryTagList = async (params: QueryTagListRequest) => await request.get("/api/admin/operation/tag/list", params);

export const saveTagByLink = async (params: SaveTagRequest) =>  await request.post("/api/admin/operation/tag/save", params)

export const deleteTagByLink = async (params: number[]) =>  await request.delete("/api/admin/operation/tag/delete", params)

export const updateTagById = async (params: UpdateTagRequest) => await request.put("/api/admin/operation/tag/update", params)
