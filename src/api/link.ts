import request from "@/utils/request";
import { QueryLinkListPageRequest, SaveLinkRequest, UpdateLinkRequest, DeleteLinkRequest } from "@/types/link";


export const queryLinkListPage = async (params: QueryLinkListPageRequest) => await request.get("/api//admin/operation/link/list", params);
export const saveLinkByLink = async (params: SaveLinkRequest) => await request.post("/api//admin/operation/link/save", params);
export const updateLinkById = async (params: UpdateLinkRequest) => await request.put("/api//admin/operation/link/update", params);
export const deleteLinkById = async (params: DeleteLinkRequest) => await request.delete("/api//admin/operation/link/delete", params);
