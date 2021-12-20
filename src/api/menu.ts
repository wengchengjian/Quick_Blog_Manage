import request from "@/utils/request"

export const getCurrentMenu = async () => {
  const res = await request.get("/api/admin/sys/menu/nav")
  return res.data;
};