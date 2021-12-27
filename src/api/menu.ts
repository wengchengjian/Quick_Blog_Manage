import request from "@/utils/request"

export const getCurrentMenu = async () =>  await request.get("/api/admin/sys/menu/nav")
