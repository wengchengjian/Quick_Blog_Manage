import { ArticleListRequest } from "@/types/article";
import request from "@/utils/request";

export const queryArticleList = async (params: ArticleListRequest) => await request.get("/api/admin/article/list", params);

