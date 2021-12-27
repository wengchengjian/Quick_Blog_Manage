import request from "@/utils/request";

export const deleteImgByName = async (fileName: string) => {
  request.delete(`/api/admin/operation/upload/imgDelete/${fileName}` as any);
}